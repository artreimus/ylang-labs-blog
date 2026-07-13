import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { imageSize } from 'image-size'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const defaultRoot = path.resolve(scriptDir, '../..')

export const budgetByRole = {
  avatar: 100 * 1024,
  logo: 100 * 1024,
  card: 300 * 1024,
  poster: 300 * 1024,
  header: 600 * 1024,
  diagram: 800 * 1024,
  video: 3 * 1024 * 1024,
}

export const contentTypes = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
}

const rasterExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.webp'])
const referencePattern = /\/static\/images\/[^'"`,\s)<>{}\]]+/gi
const assetIdPrefix = '/static/images/'

function readJson(rootDir, relativePath) {
  return JSON.parse(readFileSync(path.join(rootDir, relativePath), 'utf8'))
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(entryPath) : [entryPath]
  })
}

export function collectReferences(rootDir) {
  const dataDir = path.join(rootDir, 'data')
  const sourceFiles = walk(dataDir).filter((file) => /\.(?:js|mdx|ts)$/.test(file))
  const references = new Set()

  for (const file of sourceFiles) {
    const source = readFileSync(file, 'utf8')
    for (const match of source.matchAll(referencePattern)) references.add(match[0])
  }

  return [...references].sort()
}

export function isNormalizedAssetId(value) {
  if (typeof value !== 'string' || !value.startsWith(assetIdPrefix)) return false
  if (value.includes('\\') || value.includes('%') || value.includes('?') || value.includes('#')) {
    return false
  }

  const relativePath = value.slice(assetIdPrefix.length)
  if (!relativePath || relativePath.startsWith('/') || relativePath.endsWith('/')) return false

  return relativePath
    .split('/')
    .every(
      (segment) =>
        segment.length > 0 &&
        segment !== '.' &&
        segment !== '..' &&
        /^[A-Za-z0-9_.-]+$/.test(segment)
    )
}

function endOfUtcDay(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined
  const date = new Date(`${value}T23:59:59.999Z`)
  return Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== value
    ? undefined
    : date
}

export function collectPublicFiles(rootDir) {
  const imagesDir = path.join(rootDir, 'public/static/images')
  if (!existsSync(imagesDir)) return []

  return walk(imagesDir).filter((file) => {
    const relativePath = path.relative(imagesDir, file)
    return !relativePath.split(path.sep).some((segment) => segment.startsWith('.'))
  })
}

export function assetIdForPublicFile(rootDir, file) {
  return `/${path.relative(path.join(rootDir, 'public'), file).split(path.sep).join('/')}`
}

export function collectDeclaredAssetRoles(rootDir) {
  const roles = new Map()

  function declare(value, role) {
    if (typeof value === 'string' && isNormalizedAssetId(value)) roles.set(value, role)
  }

  const contentRoot = path.join(rootDir, 'data')
  const contentFiles = existsSync(contentRoot)
    ? walk(contentRoot).filter((file) => file.endsWith('.mdx'))
    : []

  for (const file of contentFiles) {
    let frontmatter
    try {
      frontmatter = matter(readFileSync(file, 'utf8')).data
    } catch {
      continue
    }

    const relativePath = path.relative(contentRoot, file).split(path.sep).join('/')
    if (relativePath.startsWith('blogs/')) {
      declare(frontmatter.cardImage, 'card')
      const images = Array.isArray(frontmatter.images) ? frontmatter.images : [frontmatter.images]
      images.forEach((image) => declare(image, 'header'))

      const imageRoles = frontmatter.imageRoles
      if (imageRoles && typeof imageRoles === 'object') {
        declare(imageRoles.homeRail, 'card')
        declare(imageRoles.gridCard, 'card')
        declare(imageRoles.listRow, 'header')
        declare(imageRoles.articleBanner, 'header')
        declare(imageRoles.social, 'header')
      }
    } else if (relativePath.startsWith('projects/')) {
      declare(frontmatter.cardImage, 'card')
      declare(
        frontmatter.image,
        typeof frontmatter.image === 'string' && /\.(?:gif|mp4|webm)$/i.test(frontmatter.image)
          ? 'video'
          : 'poster'
      )

      const heroMedia = frontmatter.heroMedia
      if (heroMedia?.type === 'image') declare(heroMedia.src, 'poster')
      if (heroMedia?.type === 'video') {
        declare(heroMedia.poster, 'poster')
        if (Array.isArray(heroMedia.sources)) {
          heroMedia.sources.forEach((source) => declare(source?.src, 'video'))
        }
      }
    } else if (relativePath.startsWith('authors/')) {
      declare(frontmatter.avatar, 'avatar')
    } else if (relativePath.startsWith('company/')) {
      declare(frontmatter.logo, 'logo')
    }
  }

  return roles
}

export function roleFor(assetId, declaredRoles = new Map()) {
  const declaredRole = declaredRoles.get(assetId)
  if (declaredRole) return declaredRole

  const lower = assetId.toLowerCase()
  const basename = path.basename(lower)

  if (lower.includes('/avatars/')) return 'avatar'
  if (basename.includes('logo') || basename.includes('favicon')) return 'logo'
  if (/\.(?:mp4|webm|gif)$/.test(lower) && lower.includes('/projects/')) return 'video'
  if (basename.includes('poster')) return 'poster'
  if (basename.includes('cardimage') || basename.includes('card-image')) return 'card'
  if (
    basename.includes('blogheader') ||
    basename.includes('header-image') ||
    basename.includes('social-banner') ||
    basename.includes('twitter-card')
  ) {
    return 'header'
  }
  return 'diagram'
}

export function sha256(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex')
}

function issue(code, assetId, message) {
  return { code, assetId, message }
}

export function validateAssets({ now = new Date(), rootDir = defaultRoot } = {}) {
  const assets = []
  const errors = []
  const hashes = new Map()
  const publicDir = path.join(rootDir, 'public')

  function readConfigArray(relativePath) {
    try {
      const value = readJson(rootDir, relativePath)
      if (Array.isArray(value)) return value
    } catch {
      // Report a stable validation error below.
    }

    errors.push(
      issue('invalid-asset-config', relativePath, 'Asset configuration must be a JSON array.')
    )
    return []
  }

  const migrationAllowlist = readConfigArray('data/asset-migration-allowlist.json')
  const budgetOverrides = readConfigArray('data/asset-budget-overrides.json')
  const duplicateAllowlist = readConfigArray('data/asset-duplicate-allowlist.json')
  const migrationById = new Map()
  const overrideById = new Map()
  const allowedDuplicateGroups = []
  const references = collectReferences(rootDir)
  const declaredRoles = collectDeclaredAssetRoles(rootDir)
  let assetManifest = {}

  try {
    const manifestValue = readJson(rootDir, 'data/assets-manifest.json')
    if (manifestValue && typeof manifestValue === 'object' && !Array.isArray(manifestValue)) {
      assetManifest = manifestValue
    } else {
      errors.push(
        issue(
          'invalid-asset-manifest',
          'data/assets-manifest.json',
          'Manifest must be a JSON object.'
        )
      )
    }
  } catch (error) {
    if (existsSync(path.join(rootDir, 'data/assets-manifest.json'))) {
      errors.push(
        issue('invalid-asset-manifest', 'data/assets-manifest.json', 'Manifest is not valid JSON.')
      )
    }
  }

  for (const entry of migrationAllowlist) {
    const assetId = entry?.assetId ?? '(missing assetId)'
    const expiry = endOfUtcDay(entry?.expiresAt)
    const isValid =
      isNormalizedAssetId(entry?.assetId) &&
      path.posix.extname(entry.assetId).toLowerCase() === '.gif' &&
      typeof entry.reason === 'string' &&
      entry.reason.trim().length > 0 &&
      typeof entry.owner === 'string' &&
      entry.owner.trim().length > 0 &&
      typeof entry.sha256 === 'string' &&
      /^[a-f0-9]{64}$/.test(entry.sha256) &&
      entry.removeAfter === 'PR5' &&
      expiry

    if (!isValid) {
      errors.push(
        issue(
          'invalid-gif-allowance',
          assetId,
          'GIF allowances require a normalized GIF assetId, SHA-256, reason, owner, valid expiry, and removeAfter PR5.'
        )
      )
      continue
    }

    if (migrationById.has(entry.assetId)) {
      errors.push(
        issue('duplicate-gif-allowance', entry.assetId, 'GIF allowance IDs must be unique.')
      )
      continue
    }

    migrationById.set(entry.assetId, entry)
    if (expiry < now) {
      errors.push(
        issue('gif-allowance-expired', entry.assetId, 'GIF migration allowance has expired.')
      )
    }
  }

  for (const override of budgetOverrides) {
    const assetId = override?.assetId ?? '(missing assetId)'
    const reviewDate = endOfUtcDay(override?.reviewDate)
    const isValid =
      isNormalizedAssetId(override?.assetId) &&
      Number.isInteger(override?.maxBytes) &&
      override.maxBytes > 0 &&
      typeof override.reason === 'string' &&
      override.reason.trim().length > 0 &&
      reviewDate

    if (!isValid) {
      errors.push(
        issue(
          'invalid-budget-override',
          assetId,
          'Overrides require a normalized assetId, positive integer maxBytes, reason, and valid reviewDate.'
        )
      )
      continue
    }

    if (overrideById.has(override.assetId)) {
      errors.push(
        issue('duplicate-budget-override', override.assetId, 'Override IDs must be unique.')
      )
      continue
    }

    overrideById.set(override.assetId, override)
    if (reviewDate < now) {
      errors.push(
        issue(
          'budget-override-review-due',
          override.assetId,
          'Budget override review date has passed.'
        )
      )
    }
  }

  for (const [index, group] of duplicateAllowlist.entries()) {
    const assetIds = Array.isArray(group) ? group : group?.assetIds
    const uniqueIds = Array.isArray(assetIds) ? new Set(assetIds) : undefined
    const isValid =
      uniqueIds &&
      uniqueIds.size >= 2 &&
      uniqueIds.size === assetIds.length &&
      assetIds.every(isNormalizedAssetId)

    if (!isValid) {
      errors.push(
        issue(
          'invalid-duplicate-allowance',
          `entry ${index + 1}`,
          'Duplicate allowances require at least two unique normalized asset IDs.'
        )
      )
      continue
    }

    allowedDuplicateGroups.push(uniqueIds)
  }

  for (const [assetId, record] of Object.entries(assetManifest)) {
    let remoteUrl
    try {
      remoteUrl = new URL(record?.url)
    } catch {
      // The complete shape check below emits one stable error.
    }

    const extension = path.posix.extname(assetId).toLowerCase()
    const expectedContentType = contentTypes[extension]
    const expectedRole = roleFor(assetId, declaredRoles)
    const isRaster = rasterExtensions.has(extension)
    const isValid =
      isNormalizedAssetId(assetId) &&
      record &&
      typeof record === 'object' &&
      remoteUrl?.protocol === 'https:' &&
      /^[A-Za-z0-9]+\.public\.blob\.vercel-storage\.com$/.test(remoteUrl.hostname) &&
      remoteUrl.pathname.startsWith('/public/') &&
      !remoteUrl.username &&
      !remoteUrl.password &&
      !remoteUrl.search &&
      !remoteUrl.hash &&
      typeof record.sha256 === 'string' &&
      /^[a-f0-9]{64}$/.test(record.sha256) &&
      Number.isInteger(record.bytes) &&
      record.bytes > 0 &&
      record.contentType === expectedContentType &&
      record.role === expectedRole &&
      (!isRaster ||
        (Number.isInteger(record.width) &&
          record.width > 0 &&
          Number.isInteger(record.height) &&
          record.height > 0))

    if (!isValid) {
      errors.push(
        issue(
          'invalid-asset-manifest-entry',
          assetId,
          'Manifest entries require a normalized ID, immutable public Blob URL, SHA-256, positive byte size, matching MIME/role, and raster dimensions.'
        )
      )
      continue
    }

    if (!remoteUrl.pathname.includes(record.sha256.slice(0, 16))) {
      errors.push(
        issue(
          'non-immutable-blob-path',
          assetId,
          'Blob pathname must include the first 16 characters of the asset SHA-256.'
        )
      )
    }

    const maxBytes = overrideById.get(assetId)?.maxBytes ?? budgetByRole[record.role]
    if (record.bytes > maxBytes) {
      errors.push(
        issue(
          'budget-exceeded',
          assetId,
          `${record.bytes} manifest bytes exceeds the ${record.role} budget of ${maxBytes} bytes.`
        )
      )
    }
  }

  for (const assetId of references) {
    if (!isNormalizedAssetId(assetId)) {
      errors.push(
        issue(
          'invalid-asset-reference',
          assetId,
          'Content asset references must be normalized paths below /static/images/.'
        )
      )
      continue
    }

    const filePath = path.join(publicDir, assetId.replace(/^\//, ''))
    const hasLocalFile = existsSync(filePath) && statSync(filePath).isFile()
    const manifestRecord = assetManifest[assetId]

    if (!hasLocalFile && !manifestRecord) {
      errors.push(
        issue(
          'missing-reference',
          assetId,
          'Referenced asset is absent locally and from the manifest.'
        )
      )
      continue
    }

    if (!hasLocalFile) {
      assets.push({ assetId, ...manifestRecord })
      continue
    }

    const extension = path.extname(filePath).toLowerCase()
    const contentType = contentTypes[extension]
    if (!contentType) {
      errors.push(
        issue('unsupported-mime', assetId, `Unsupported public media extension: ${extension}`)
      )
      continue
    }

    const bytes = statSync(filePath).size
    const role = roleFor(assetId, declaredRoles)
    const hash = sha256(filePath)
    const record = { assetId, bytes, contentType, role, sha256: hash }

    if (
      manifestRecord &&
      (manifestRecord.sha256 !== hash ||
        manifestRecord.bytes !== bytes ||
        manifestRecord.contentType !== contentType)
    ) {
      errors.push(
        issue(
          'manifest-local-mismatch',
          assetId,
          'Retained local fallback does not match the published manifest record.'
        )
      )
    }

    if (rasterExtensions.has(extension)) {
      try {
        const dimensions = imageSize(filePath)
        if (!dimensions.width || !dimensions.height) {
          errors.push(issue('missing-dimensions', assetId, 'Raster dimensions could not be read.'))
        } else {
          record.width = dimensions.width
          record.height = dimensions.height
        }
      } catch {
        errors.push(issue('missing-dimensions', assetId, 'Raster dimensions could not be read.'))
      }
    }

    if (/\/(?:source-artwork|source-image)\.[^/]+$/i.test(assetId)) {
      errors.push(
        issue(
          'source-in-public-delivery',
          assetId,
          'Reusable source artwork must not be referenced as public delivery media.'
        )
      )
    }

    const allowance = migrationById.get(assetId)
    const override = overrideById.get(assetId)
    const maxBytes = override?.maxBytes ?? budgetByRole[role]
    if (bytes > maxBytes && !(extension === '.gif' && allowance)) {
      errors.push(
        issue(
          'budget-exceeded',
          assetId,
          `${bytes} bytes exceeds the ${role} budget of ${maxBytes} bytes.`
        )
      )
    }

    const sameHash = hashes.get(hash) ?? []
    sameHash.push(assetId)
    hashes.set(hash, sameHash)
    assets.push(record)
  }

  const publicGifFiles = collectPublicFiles(rootDir).filter(
    (file) => path.extname(file).toLowerCase() === '.gif'
  )
  const publicGifIds = new Set(publicGifFiles.map((file) => assetIdForPublicFile(rootDir, file)))

  for (const file of publicGifFiles) {
    const assetId = assetIdForPublicFile(rootDir, file)
    const allowance = migrationById.get(assetId)
    if (!allowance) {
      errors.push(issue('gif-not-allowed', assetId, 'Animated GIF delivery requires an allowance.'))
      continue
    }

    if (allowance.sha256 !== sha256(file)) {
      errors.push(
        issue('gif-hash-mismatch', assetId, 'GIF hash differs from its migration allowance.')
      )
    }
  }

  for (const allowance of migrationById.values()) {
    if (!publicGifIds.has(allowance.assetId)) {
      errors.push(
        issue(
          'stale-gif-allowance',
          allowance.assetId,
          'Migration allowance does not match a public GIF.'
        )
      )
    } else if (!references.includes(allowance.assetId)) {
      errors.push(
        issue(
          'stale-gif-allowance',
          allowance.assetId,
          'Migration allowance is not referenced by content.'
        )
      )
    }
  }

  for (const [hash, assetIds] of hashes) {
    if (assetIds.length < 2) continue
    const isAllowed = allowedDuplicateGroups.some(
      (group) => assetIds.length === group.size && assetIds.every((assetId) => group.has(assetId))
    )
    if (!isAllowed) {
      errors.push(
        issue(
          'duplicate-content',
          assetIds.join(', '),
          `Multiple logical IDs share SHA-256 ${hash}.`
        )
      )
    }
  }

  return {
    ok: errors.length === 0,
    checkedAt: now.toISOString(),
    assetCount: assets.length,
    totalBytes: assets.reduce((total, asset) => total + asset.bytes, 0),
    assets,
    errors,
  }
}

function printReport(report) {
  const rows = report.assets.map((asset) => ({
    asset: asset.assetId,
    role: asset.role,
    bytes: asset.bytes,
    dimensions: asset.width ? `${asset.width}x${asset.height}` : 'n/a',
  }))

  console.table(rows)
  if (report.errors.length) console.table(report.errors)
  console.log(JSON.stringify(report, null, 2))
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = validateAssets()
  printReport(report)
  process.exitCode = report.ok ? 0 : 1
}
