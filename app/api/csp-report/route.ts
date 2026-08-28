import { NextResponse } from 'next/server'
import { normalizeCspReport } from '@/lib/security/csp-report'

const MAX_REPORT_BYTES = 16 * 1024
const MAX_BATCH_SIZE = 50
const ALLOWED_CONTENT_TYPES = new Set(['application/csp-report', 'application/reports+json'])

type RawCspReport = Record<string, unknown>

async function readBodyWithinLimit(request: Request) {
  if (!request.body) return new Uint8Array()

  const reader = request.body.getReader()
  const chunks: Uint8Array[] = []
  let totalBytes = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    totalBytes += value.byteLength
    if (totalBytes > MAX_REPORT_BYTES) {
      await reader.cancel().catch(() => undefined)
      return null
    }
    chunks.push(value)
  }

  const body = new Uint8Array(totalBytes)
  let offset = 0
  for (const chunk of chunks) {
    body.set(chunk, offset)
    offset += chunk.byteLength
  }
  return body
}

function extractReports(payload: unknown): RawCspReport[] {
  const records = Array.isArray(payload) ? payload.slice(0, MAX_BATCH_SIZE) : [payload]

  return records.flatMap((record) => {
    if (!record || typeof record !== 'object') return []
    const object = record as RawCspReport
    const legacy = object['csp-report']
    if (legacy && typeof legacy === 'object') return [legacy as RawCspReport]
    if (object.body && typeof object.body === 'object') return [object.body as RawCspReport]
    return [object]
  })
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase()
  if (!contentType || !ALLOWED_CONTENT_TYPES.has(contentType)) {
    return NextResponse.json({ error: 'Unsupported media type' }, { status: 415 })
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0)
  if (declaredLength > MAX_REPORT_BYTES) {
    return NextResponse.json({ error: 'Report is too large' }, { status: 413 })
  }

  let bytes: Uint8Array | null
  try {
    bytes = await readBodyWithinLimit(request)
  } catch {
    return NextResponse.json({ error: 'Malformed report' }, { status: 400 })
  }

  if (!bytes) {
    return NextResponse.json({ error: 'Report is too large' }, { status: 413 })
  }

  let payload: unknown
  try {
    payload = JSON.parse(new TextDecoder().decode(bytes))
  } catch {
    return NextResponse.json({ error: 'Malformed report' }, { status: 400 })
  }

  const requestOrigin = new URL(request.url).origin
  for (const report of extractReports(payload)) {
    console.warn('CSP violation', normalizeCspReport(report, requestOrigin))
  }

  return new NextResponse(null, { status: 204 })
}
