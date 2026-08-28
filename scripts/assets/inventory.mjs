import { mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { imageSize } from 'image-size'
import {
  assetIdForPublicFile,
  collectDeclaredAssetRoles,
  collectPublicFiles,
  collectReferences,
  contentTypes,
  isPrivateSourceAssetId,
  roleFor,
  sha256,
} from './validate.mjs'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const defaultRoot = path.resolve(scriptDir, '../..')
const rasterExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.webp'])
const bootCriticalAssetIds = new Set([
  '/static/images/logo-dark.svg',
  '/static/images/logo-light.svg',
  '/static/images/logo-yellow.svg',
  '/static/images/social-banner.png',
])

function metadataForFile(rootDir, filePath, declaredRoles) {
  const logicalId = assetIdForPublicFile(rootDir, filePath)
  const extension = path.extname(filePath).toLowerCase()
  const metadata = {
    logicalId,
    file: path.relative(rootDir, filePath).split(path.sep).join('/'),
    sha256: sha256(filePath),
    bytes: statSync(filePath).size,
    contentType: contentTypes[extension] ?? 'application/octet-stream',
    role: roleFor(logicalId, declaredRoles),
  }

  if (rasterExtensions.has(extension)) {
    const dimensions = imageSize(filePath)
    if (dimensions.width && dimensions.height) {
      metadata.width = dimensions.width
      metadata.height = dimensions.height
    }
  }

  return metadata
}

function publicSourceAllowanceIds(rootDir) {
  try {
    const entries = JSON.parse(
      readFileSync(path.join(rootDir, 'data/asset-public-source-allowlist.json'), 'utf8')
    )
    return new Set(
      Array.isArray(entries) ? entries.map((entry) => entry?.assetId).filter(Boolean) : []
    )
  } catch {
    return new Set()
  }
}

function initialDisposition(asset, referencedIds, allowedPublicSourceIds) {
  if (
    isPrivateSourceAssetId(asset.logicalId) &&
    allowedPublicSourceIds.has(asset.logicalId) &&
    referencedIds.has(asset.logicalId)
  ) {
    return {
      disposition: 'keep-local',
      reason: 'Legacy public source remains local until its content reference is replaced.',
    }
  }

  if (isPrivateSourceAssetId(asset.logicalId)) {
    return {
      disposition: 'private-blob',
      reason: 'Reusable source artwork belongs in the private source store.',
    }
  }

  if (bootCriticalAssetIds.has(asset.logicalId)) {
    return {
      disposition: 'keep-local',
      reason: 'Boot-critical shell or metadata branding remains in the deployment bundle.',
    }
  }

  if (referencedIds.has(asset.logicalId)) {
    return {
      disposition: 'public-blob',
      reason: 'Published content references this delivery asset.',
    }
  }

  return {
    disposition: 'defer',
    reason: 'No current content reference was found; ownership requires review.',
  }
}

export function buildAssetInventory({ rootDir = defaultRoot, now = new Date() } = {}) {
  const referencedIds = new Set(collectReferences(rootDir))
  const allowedPublicSourceIds = publicSourceAllowanceIds(rootDir)
  const declaredRoles = collectDeclaredAssetRoles(rootDir)
  const assets = collectPublicFiles(rootDir)
    .map((filePath) => metadataForFile(rootDir, filePath, declaredRoles))
    .map((asset) => ({
      ...asset,
      ...initialDisposition(asset, referencedIds, allowedPublicSourceIds),
    }))
    .sort((left, right) => left.logicalId.localeCompare(right.logicalId))

  const byHash = new Map()
  for (const asset of assets) {
    const group = byHash.get(asset.sha256) ?? []
    group.push(asset)
    byHash.set(asset.sha256, group)
  }

  for (const group of byHash.values()) {
    if (group.length < 2) continue
    const canonical = group.find((asset) => asset.disposition === 'public-blob')
    if (!canonical) continue

    for (const duplicate of group) {
      if (duplicate === canonical || duplicate.disposition !== 'defer') continue
      duplicate.disposition = 'delete-duplicate'
      duplicate.reason = `Byte-identical to referenced canonical asset ${canonical.logicalId}.`
    }
  }

  const counts = Object.fromEntries(
    [
      'keep-local',
      'public-blob',
      'private-blob',
      'delete-duplicate',
      'delete-obsolete',
      'defer',
    ].map((disposition) => [
      disposition,
      assets.filter((asset) => asset.disposition === disposition).length,
    ])
  )

  return {
    generatedAt: now.toISOString(),
    assetCount: assets.length,
    totalBytes: assets.reduce((total, asset) => total + asset.bytes, 0),
    counts,
    assets,
  }
}

export function atomicWriteJson(filePath, value) {
  mkdirSync(path.dirname(filePath), { recursive: true })
  const temporaryPath = `${filePath}.${process.pid}.tmp`
  writeFileSync(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, { flag: 'wx' })
  renameSync(temporaryPath, filePath)
}

function parseOutputPath(argv, rootDir) {
  const outputIndex = argv.indexOf('--output')
  if (outputIndex === -1) return path.join(rootDir, 'artifacts/asset-migration-report.json')
  if (!argv[outputIndex + 1]) throw new Error('--output requires a path.')
  return path.resolve(rootDir, argv[outputIndex + 1])
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const report = buildAssetInventory()
    const outputPath = parseOutputPath(process.argv.slice(2), defaultRoot)
    atomicWriteJson(outputPath, report)
    console.table(
      Object.entries(report.counts).map(([disposition, count]) => ({ disposition, count }))
    )
    console.log(`Inventory written to ${path.relative(defaultRoot, outputPath)}.`)
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
}
