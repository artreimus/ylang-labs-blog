import { appendFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { imageSize } from 'image-size'
import { atomicWriteJson, buildAssetInventory } from './inventory.mjs'
import { budgetByRole, contentTypes, isNormalizedAssetId, roleFor, sha256 } from './validate.mjs'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const defaultRoot = path.resolve(scriptDir, '../..')
const publicManifestPath = 'data/assets-manifest.json'
const privateInventoryPath = 'data/private-assets-inventory.json'
const immutableCacheSeconds = 31_536_000

function readJson(rootDir, relativePath, fallback) {
  const filePath = path.join(rootDir, relativePath)
  return existsSync(filePath) ? JSON.parse(readFileSync(filePath, 'utf8')) : fallback
}

function safeSegment(value, label) {
  if (!value || !/^[A-Za-z0-9_.-]+$/.test(value)) {
    throw new Error(`${label} must contain only letters, numbers, dots, underscores, and hyphens.`)
  }
  return value
}

export function parsePublishArgs(argv) {
  const result = { apply: false }
  const valueOptions = {
    '--slug': 'slug',
    '--path': 'path',
    '--derived-path': 'derivedPath',
    '--logical-id': 'logicalId',
    '--role': 'role',
    '--store': 'store',
  }

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index]
    if (argument === '--') {
      continue
    } else if (argument === '--apply') {
      if (result.dryRun) throw new Error('--apply and --dry-run are mutually exclusive.')
      result.apply = true
    } else if (argument === '--dry-run') {
      if (result.apply) throw new Error('--apply and --dry-run are mutually exclusive.')
      result.dryRun = true
    } else if (Object.hasOwn(valueOptions, argument)) {
      const value = argv[index + 1]
      if (!value || value.startsWith('--')) throw new Error(`${argument} requires a value.`)
      result[valueOptions[argument]] = value
      index += 1
    } else {
      throw new Error(`Unknown asset publish argument: ${argument}`)
    }
  }

  if (result.store !== 'public' && result.store !== 'private') {
    throw new Error('--store must be public or private.')
  }
  const scopes = [result.slug, result.path, result.derivedPath].filter(Boolean)
  if (scopes.length !== 1) {
    throw new Error('Choose exactly one of --slug, --path, or --derived-path.')
  }
  if (result.slug) safeSegment(result.slug, 'Slug')
  if (result.derivedPath) {
    if (!isNormalizedAssetId(result.logicalId)) {
      throw new Error('--derived-path requires a normalized --logical-id below /static/images/.')
    }
    if (!Object.hasOwn(budgetByRole, result.role)) {
      throw new Error('--derived-path requires a valid --role.')
    }
  } else if (result.logicalId || result.role) {
    throw new Error('--logical-id and --role are only valid with --derived-path.')
  }

  return { ...result, dryRun: !result.apply }
}

function loadBudgetOverrides(rootDir) {
  const entries = readJson(rootDir, 'data/asset-budget-overrides.json', [])
  return new Map(entries.map((entry) => [entry.assetId, entry.maxBytes]))
}

function targetPathFor(asset, store) {
  const segments = asset.logicalId.split('/').filter(Boolean)
  const extension = path.posix.extname(asset.logicalId).toLowerCase()
  const category = safeSegment(segments[2], 'Asset category')
  const namespace =
    segments.length > 4 ? `${category}/${safeSegment(segments[3], 'Asset slug')}` : category
  const role = store === 'private' ? 'source' : asset.role
  return `${store}/${namespace}/${role}-${asset.sha256.slice(0, 16)}${extension}`
}

function selectedAssets(report, args, rootDir) {
  if (args.slug) {
    const prefix = new RegExp(`^/static/images/(?:blogs|projects)/${args.slug}/`)
    return report.assets.filter(
      (asset) =>
        prefix.test(asset.logicalId) &&
        asset.disposition === (args.store === 'public' ? 'public-blob' : 'private-blob') &&
        !(args.store === 'public' && asset.contentType === 'image/gif')
    )
  }

  const absolutePath = path.resolve(rootDir, args.path)
  const publicImagesRoot = path.join(rootDir, 'public/static/images')
  const relativePath = path.relative(publicImagesRoot, absolutePath)
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error('--path must select a file below public/static/images/.')
  }

  const logicalId = `/static/images/${relativePath.split(path.sep).join('/')}`
  const asset = report.assets.find((candidate) => candidate.logicalId === logicalId)
  if (!asset) throw new Error(`Selected asset does not exist: ${logicalId}`)

  const expectedDisposition = args.store === 'public' ? 'public-blob' : 'private-blob'
  if (asset.disposition !== expectedDisposition) {
    throw new Error(
      `${logicalId} is classified ${asset.disposition}; expected ${expectedDisposition} for the ${args.store} store.`
    )
  }
  return [asset]
}

function derivedAsset(args, rootDir) {
  const absolutePath = path.resolve(rootDir, args.derivedPath)
  const derivedRoot = path.join(rootDir, 'artifacts/assets')
  const relativePath = path.relative(derivedRoot, absolutePath)
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    throw new Error('--derived-path must select a file below artifacts/assets/.')
  }
  if (!existsSync(absolutePath) || !statSync(absolutePath).isFile()) {
    throw new Error(`Derived asset does not exist: ${args.derivedPath}`)
  }

  const sourceExtension = path.extname(absolutePath).toLowerCase()
  const logicalExtension = path.posix.extname(args.logicalId).toLowerCase()
  const contentType = contentTypes[sourceExtension]
  if (!contentType || sourceExtension !== logicalExtension) {
    throw new Error('Derived source and logical ID must use the same supported media extension.')
  }

  const expectedRole = roleFor(args.logicalId)
  if (
    expectedRole !== args.role &&
    !(args.role === 'poster' && ['card', 'diagram', 'header'].includes(expectedRole))
  ) {
    throw new Error(`Derived role ${args.role} conflicts with logical asset role ${expectedRole}.`)
  }

  const asset = {
    logicalId: args.logicalId,
    file: path.relative(rootDir, absolutePath).split(path.sep).join('/'),
    sha256: sha256(absolutePath),
    bytes: statSync(absolutePath).size,
    contentType,
    role: args.role,
  }

  if (contentType.startsWith('image/') && contentType !== 'image/svg+xml') {
    const dimensions = imageSize(absolutePath)
    if (dimensions.width && dimensions.height) {
      asset.width = dimensions.width
      asset.height = dimensions.height
    }
  }

  return asset
}

function validatePublishAsset(asset, store, budgetOverrides) {
  if (asset.contentType === 'application/octet-stream') {
    throw new Error(`Unsupported media type for ${asset.logicalId}.`)
  }
  if (asset.contentType.startsWith('image/') && asset.contentType !== 'image/svg+xml') {
    if (!asset.width || !asset.height) {
      throw new Error(`Raster dimensions are required for ${asset.logicalId}.`)
    }
  }

  if (store === 'public') {
    const limit = budgetOverrides.get(asset.logicalId) ?? budgetByRole[asset.role]
    if (!limit || asset.bytes > limit) {
      throw new Error(
        `${asset.logicalId} is ${asset.bytes} bytes and exceeds its ${asset.role} budget of ${limit ?? 0} bytes.`
      )
    }
  }
}

export function buildPublishPlan({ rootDir = defaultRoot, args, now = new Date() }) {
  const budgetOverrides = loadBudgetOverrides(rootDir)
  const assets = args.derivedPath
    ? [derivedAsset(args, rootDir)]
    : selectedAssets(buildAssetInventory({ rootDir, now }), args, rootDir)
  if (assets.length === 0) throw new Error('No assets matched the selected store and scope.')

  const entries = assets.map((asset) => {
    validatePublishAsset(asset, args.store, budgetOverrides)
    return {
      ...asset,
      sourcePath: path.join(rootDir, asset.file),
      pathname: targetPathFor(asset, args.store),
    }
  })

  return {
    mode: args.apply ? 'apply' : 'dry-run',
    store: args.store,
    selection: args.slug
      ? { slug: args.slug }
      : args.derivedPath
        ? { derivedPath: args.derivedPath, logicalId: args.logicalId }
        : { path: args.path },
    entries,
  }
}

function parseTokenStoreId(token) {
  const parts = token.split('_')
  return parts.length >= 5 && parts[0] === 'vercel' && parts[1] === 'blob' && parts[2] === 'rw'
    ? parts[3]
    : undefined
}

export function resolveStoreConfiguration(store, environment = process.env) {
  const prefix = store === 'public' ? 'BLOB_PUBLIC' : 'BLOB_SOURCES'
  const storeId = environment[`${prefix}_STORE_ID`]?.trim()
  const token = environment[`${prefix}_READ_WRITE_TOKEN`]?.trim()

  if (!storeId || !/^[A-Za-z0-9]+$/.test(storeId)) {
    throw new Error(`${prefix}_STORE_ID is required and must be an exact Vercel Blob store ID.`)
  }
  if (!token) throw new Error(`${prefix}_READ_WRITE_TOKEN is required for --apply.`)

  const tokenStoreId = parseTokenStoreId(token)
  if (tokenStoreId !== storeId) {
    throw new Error(`${prefix}_READ_WRITE_TOKEN is not scoped to ${prefix}_STORE_ID.`)
  }

  return { storeId, token, access: store }
}

function assertBlobMetadata(metadata, entry, configuration) {
  const url = new URL(metadata.url)
  const expectedPublicHost = `${configuration.storeId}.public.blob.vercel-storage.com`
  const hasExpectedStoreHost =
    url.hostname.startsWith(`${configuration.storeId}.`) &&
    url.hostname.endsWith('.blob.vercel-storage.com')

  if (
    !hasExpectedStoreHost ||
    (configuration.access === 'public' && url.hostname !== expectedPublicHost)
  ) {
    throw new Error(`Blob response hostname does not match store ${configuration.storeId}.`)
  }
  if (metadata.pathname !== entry.pathname) {
    throw new Error(`Blob pathname mismatch for ${entry.logicalId}.`)
  }
  if (metadata.contentType !== entry.contentType) {
    throw new Error(`Blob content type mismatch for ${entry.logicalId}.`)
  }
  if ('size' in metadata && metadata.size !== entry.bytes) {
    throw new Error(`Blob byte-size mismatch for ${entry.logicalId}.`)
  }
}

function journalPath(rootDir, plan) {
  const scope =
    plan.selection.slug ??
    path.basename(plan.selection.path ?? plan.selection.logicalId ?? plan.selection.derivedPath)
  return path.join(rootDir, 'artifacts/assets', `publish-${plan.store}-${scope}.jsonl`)
}

function readJournal(filePath) {
  if (!existsSync(filePath)) return []
  return readFileSync(filePath, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line))
}

function appendJournal(filePath, record) {
  mkdirSync(path.dirname(filePath), { recursive: true })
  appendFileSync(filePath, `${JSON.stringify(record)}\n`)
}

async function reconcileOrUpload({ client, configuration, entry, journal }) {
  const journalEntry = [...journal]
    .reverse()
    .find((candidate) => candidate.logicalId === entry.logicalId)

  if (journalEntry) {
    const matchesPlan =
      journalEntry.pathname === entry.pathname &&
      journalEntry.sha256 === entry.sha256 &&
      journalEntry.bytes === entry.bytes &&
      journalEntry.contentType === entry.contentType
    if (!matchesPlan) throw new Error(`Crash journal conflicts with ${entry.logicalId}.`)
  }

  try {
    const metadata = await client.head(entry.pathname, { token: configuration.token })
    assertBlobMetadata(metadata, entry, configuration)
    const uploadedAt =
      journalEntry?.uploadedAt ??
      (metadata.uploadedAt instanceof Date
        ? metadata.uploadedAt.toISOString()
        : (metadata.uploadedAt ?? new Date().toISOString()))
    return {
      ...metadata,
      uploadedAt,
      resumed: true,
      journaled: Boolean(journalEntry),
    }
  } catch (error) {
    if (!client.isNotFound?.(error)) throw error
  }

  const result = await client.put(entry.pathname, readFileSync(entry.sourcePath), {
    access: configuration.access,
    addRandomSuffix: false,
    allowOverwrite: false,
    cacheControlMaxAge: immutableCacheSeconds,
    contentType: entry.contentType,
    token: configuration.token,
  })
  assertBlobMetadata(result, entry, configuration)
  return {
    ...result,
    uploadedAt: new Date().toISOString(),
    resumed: false,
    journaled: false,
  }
}

function sortedObject(value) {
  return Object.fromEntries(
    Object.entries(value).sort(([left], [right]) => left.localeCompare(right))
  )
}

function publicRecord(entry, result) {
  return {
    url: result.url,
    sha256: entry.sha256,
    bytes: entry.bytes,
    contentType: entry.contentType,
    role: entry.role,
    ...(entry.width ? { width: entry.width, height: entry.height } : {}),
  }
}

export async function applyPublishPlan({
  rootDir = defaultRoot,
  plan,
  environment = process.env,
  client,
}) {
  if (plan.mode !== 'apply') throw new Error('Refusing to upload a dry-run publish plan.')
  const configuration = resolveStoreConfiguration(plan.store, environment)
  const filePath = journalPath(rootDir, plan)
  const journal = readJournal(filePath)
  const results = []

  for (const entry of plan.entries) {
    const result = await reconcileOrUpload({ client, configuration, entry, journal })
    if (!result.journaled) {
      const journalRecord = {
        logicalId: entry.logicalId,
        storeId: configuration.storeId,
        pathname: entry.pathname,
        sha256: entry.sha256,
        bytes: entry.bytes,
        contentType: entry.contentType,
        uploadedAt: result.uploadedAt,
        url: plan.store === 'public' ? result.url : undefined,
      }
      appendJournal(filePath, journalRecord)
      journal.push(journalRecord)
    }
    results.push({ entry, result })
  }

  const rollback = {
    createdAt: new Date().toISOString(),
    store: plan.store,
    entries: [],
  }

  if (plan.store === 'public') {
    const previousManifest = readJson(rootDir, publicManifestPath, {})
    const nextManifest = { ...previousManifest }
    for (const { entry, result } of results) {
      const next = publicRecord(entry, result)
      rollback.entries.push({
        logicalId: entry.logicalId,
        previous: nextManifest[entry.logicalId],
        next,
      })
      nextManifest[entry.logicalId] = next
    }
    atomicWriteJson(path.join(rootDir, 'artifacts/assets', `rollback-${Date.now()}.json`), rollback)
    atomicWriteJson(path.join(rootDir, publicManifestPath), sortedObject(nextManifest))
  } else {
    const previousInventory = readJson(rootDir, privateInventoryPath, [])
    const inventoryById = new Map(previousInventory.map((entry) => [entry.logicalId, entry]))
    for (const { entry, result } of results) {
      const next = {
        logicalId: entry.logicalId,
        storeId: configuration.storeId,
        pathname: entry.pathname,
        sha256: entry.sha256,
        bytes: entry.bytes,
        contentType: entry.contentType,
        uploadedAt: result.uploadedAt,
      }
      rollback.entries.push({
        logicalId: entry.logicalId,
        previous: inventoryById.get(entry.logicalId),
        next,
      })
      inventoryById.set(entry.logicalId, next)
    }
    atomicWriteJson(path.join(rootDir, 'artifacts/assets', `rollback-${Date.now()}.json`), rollback)
    atomicWriteJson(
      path.join(rootDir, privateInventoryPath),
      [...inventoryById.values()].sort((left, right) =>
        left.logicalId.localeCompare(right.logicalId)
      )
    )
  }

  return { results, rollback, journalPath: filePath }
}

async function realBlobClient() {
  const { BlobNotFoundError, head, put } = await import('@vercel/blob')
  return { head, put, isNotFound: (error) => error instanceof BlobNotFoundError }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = parsePublishArgs(process.argv.slice(2))
    const plan = buildPublishPlan({ args })
    console.table(
      plan.entries.map((entry) => ({
        asset: entry.logicalId,
        bytes: entry.bytes,
        role: entry.role,
        pathname: entry.pathname,
      }))
    )

    if (plan.mode === 'dry-run') {
      console.log('Dry run complete. No Blob API calls or manifest writes were made.')
    } else {
      const outcome = await applyPublishPlan({ plan, client: await realBlobClient() })
      console.log(`Published ${outcome.results.length} asset(s); journal: ${outcome.journalPath}`)
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
}
