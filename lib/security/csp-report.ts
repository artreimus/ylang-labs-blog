type RawCspReport = Record<string, unknown>

type NormalizedCspReport = {
  directive: string
  disposition: string
  route?: string
  blockedOrigin?: string
}

function safeToken(value: unknown, fallback: string) {
  if (typeof value !== 'string') return fallback

  const sanitized = value
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .trim()
    .slice(0, 128)
  return sanitized || fallback
}

function sameOriginPath(value: unknown, requestOrigin: string) {
  if (typeof value !== 'string') return undefined

  try {
    const url = new URL(value, requestOrigin)
    return url.origin === requestOrigin ? url.pathname.slice(0, 1024) : undefined
  } catch {
    return undefined
  }
}

function blockedOrigin(value: unknown, requestOrigin: string) {
  if (typeof value !== 'string' || value.length === 0) return undefined
  if (['inline', 'eval', 'self'].includes(value)) return value
  if (value.startsWith('data:')) return 'data:'
  if (value.startsWith('blob:')) return 'blob:'

  try {
    const url = new URL(value, requestOrigin)
    if (url.origin === requestOrigin) return 'self'
    return url.origin === 'null' ? url.protocol : url.origin
  } catch {
    return undefined
  }
}

export function normalizeCspReport(
  report: RawCspReport,
  requestOrigin: string
): NormalizedCspReport {
  return {
    directive: safeToken(
      report.effectiveDirective ?? report['effective-directive'] ?? report['violated-directive'],
      'unknown'
    ),
    disposition: safeToken(report.disposition, 'unknown'),
    route: sameOriginPath(
      report.documentURL ?? report['document-uri'] ?? report.url,
      requestOrigin
    ),
    blockedOrigin: blockedOrigin(report.blockedURL ?? report['blocked-uri'], requestOrigin),
  }
}
