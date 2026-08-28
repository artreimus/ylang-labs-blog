import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const defaultRoot = path.resolve(scriptDir, '../..')
const textOnlySlug = 'goal'
const chartSlugs = [
  'xllm-cluster-architecture-ai-inference',
  'a-deep-dive-into-deepseek-r1-the-open-source-challenger-using-reinforcement-learning',
]
// Measured after the slug-specific client split on 2026-07-13:
// 970,251 raw bytes / 310,959 gzip bytes. The ceilings retain roughly 8%
// tolerance for framework patch churn while still blocking a large shared client dependency.
const textRouteBudget = {
  initialJsBytes: 1_048_576,
  initialJsGzipBytes: 337_920,
}
const chartRouteBudget = {
  initialJsBytes: 1_638_400,
  initialJsGzipBytes: 512_000,
}

function walk(directory) {
  if (!existsSync(directory)) return []
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(entryPath) : [entryPath]
  })
}

function routeHtmlPath(buildDir, slug) {
  return path.join(buildDir, 'server/app/blogs', `${slug}.html`)
}

function extractRequestedChunks(html) {
  const matches = html.matchAll(/\/_next\/(static\/chunks\/[^'"\s<>?]+\.js)(?:\?[^'"\s<>]*)?/g)
  return new Set(Array.from(matches, (match) => decodeURIComponent(match[1])))
}

function requestedChunksForRoute(buildDir, slug) {
  const htmlPath = routeHtmlPath(buildDir, slug)
  if (!existsSync(htmlPath)) {
    throw new Error(`Missing prerendered blog fixture: ${htmlPath}`)
  }

  return extractRequestedChunks(readFileSync(htmlPath, 'utf8'))
}

function chunkPath(buildDir, relativePath) {
  return path.join(buildDir, relativePath)
}

function chunkBytes(buildDir, chunks) {
  return [...chunks].reduce((total, relativePath) => {
    const filePath = chunkPath(buildDir, relativePath)
    return total + (existsSync(filePath) ? statSync(filePath).size : 0)
  }, 0)
}

function chunkGzipBytes(buildDir, chunks) {
  return [...chunks].reduce((total, relativePath) => {
    const filePath = chunkPath(buildDir, relativePath)
    return total + (existsSync(filePath) ? gzipSync(readFileSync(filePath)).length : 0)
  }, 0)
}

function findRechartsChunks(buildDir) {
  const chunksDir = path.join(buildDir, 'static/chunks')
  return new Set(
    walk(chunksDir)
      .filter((file) => file.endsWith('.js') && readFileSync(file, 'utf8').includes('recharts'))
      .map((file) => path.relative(buildDir, file).split(path.sep).join('/'))
  )
}

function intersection(left, right) {
  return [...left].filter((value) => right.has(value))
}

export function validateBlogBundleIsolation({ rootDir = defaultRoot } = {}) {
  const buildDir = path.join(rootDir, '.next')
  const errors = []
  const rechartsChunks = findRechartsChunks(buildDir)

  if (rechartsChunks.size === 0) {
    errors.push('No Recharts chunk was found; the bundle detector has no positive control.')
  }

  let textChunks = new Set()
  try {
    textChunks = requestedChunksForRoute(buildDir, textOnlySlug)
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error))
  }

  const textRechartsChunks = intersection(textChunks, rechartsChunks)
  if (textRechartsChunks.length > 0) {
    errors.push(
      `Text-only article /blogs/${textOnlySlug} requests Recharts: ${textRechartsChunks.join(', ')}`
    )
  }

  const textInitialJsBytes = chunkBytes(buildDir, textChunks)
  const textInitialJsGzipBytes = chunkGzipBytes(buildDir, textChunks)
  if (textInitialJsBytes > textRouteBudget.initialJsBytes) {
    errors.push(
      `Text-only article initial JS is ${textInitialJsBytes} bytes; budget is ${textRouteBudget.initialJsBytes} bytes.`
    )
  }
  if (textInitialJsGzipBytes > textRouteBudget.initialJsGzipBytes) {
    errors.push(
      `Text-only article gzip JS is ${textInitialJsGzipBytes} bytes; budget is ${textRouteBudget.initialJsGzipBytes} bytes.`
    )
  }

  const chartRoutes = []
  for (const slug of chartSlugs) {
    try {
      const chunks = requestedChunksForRoute(buildDir, slug)
      const initialJsBytes = chunkBytes(buildDir, chunks)
      const initialJsGzipBytes = chunkGzipBytes(buildDir, chunks)
      if (initialJsBytes > chartRouteBudget.initialJsBytes) {
        errors.push(
          `Chart article /blogs/${slug} initial JS is ${initialJsBytes} bytes; budget is ${chartRouteBudget.initialJsBytes} bytes.`
        )
      }
      if (initialJsGzipBytes > chartRouteBudget.initialJsGzipBytes) {
        errors.push(
          `Chart article /blogs/${slug} gzip JS is ${initialJsGzipBytes} bytes; budget is ${chartRouteBudget.initialJsGzipBytes} bytes.`
        )
      }
      chartRoutes.push({
        slug,
        chunks,
        initialJsBytes,
        initialJsGzipBytes,
        rechartsChunks: intersection(chunks, rechartsChunks),
      })
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error))
    }
  }

  if (!chartRoutes.some((route) => route.rechartsChunks.length > 0)) {
    errors.push('Chart article fixtures do not request a detected Recharts chunk.')
  }

  const routes = [
    {
      slug: textOnlySlug,
      initialJsBytes: textInitialJsBytes,
      initialJsGzipBytes: textInitialJsGzipBytes,
      requestedChunkCount: textChunks.size,
      rechartsChunks: textRechartsChunks,
    },
    ...chartRoutes.map((route) => ({
      slug: route.slug,
      initialJsBytes: route.initialJsBytes,
      initialJsGzipBytes: route.initialJsGzipBytes,
      requestedChunkCount: route.chunks.size,
      rechartsChunks: route.rechartsChunks,
    })),
  ]

  return {
    ok: errors.length === 0,
    detector: {
      rechartsChunkCount: rechartsChunks.size,
      rechartsChunks: [...rechartsChunks].sort(),
    },
    routes,
    errors,
  }
}

function printReport(report) {
  console.table(
    report.routes.map((route) => ({
      route: `/blogs/${route.slug}`,
      initialJsKiB: (route.initialJsBytes / 1024).toFixed(1),
      initialJsGzipKiB: (route.initialJsGzipBytes / 1024).toFixed(1),
      chunks: route.requestedChunkCount,
      rechartsChunks: route.rechartsChunks.length,
    }))
  )
  if (report.errors.length > 0) console.error(report.errors.join('\n'))
  console.log(JSON.stringify(report, null, 2))
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = validateBlogBundleIsolation()
  printReport(report)
  process.exitCode = report.ok ? 0 : 1
}
