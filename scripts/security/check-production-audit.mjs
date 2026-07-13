import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const severityGate = new Set(['critical', 'high'])
const auditSeverities = ['info', 'low', 'moderate', 'high', 'critical']
const auditSeveritySet = new Set(auditSeverities)
const exceptionsPath = new URL(
  '../../config/security/dependency-audit-exceptions.json',
  import.meta.url
)

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function auditErrorMessage(report) {
  if (!isRecord(report.error)) return String(report.error)
  return [report.error.code, report.error.summary, report.error.detail].filter(Boolean).join(': ')
}

export function parseAuditReport(audit) {
  if (audit.error) {
    throw new Error(`Unable to run pnpm audit: ${audit.error.message}`)
  }
  if (audit.signal || !Number.isInteger(audit.status)) {
    throw new Error(`pnpm audit did not exit normally${audit.signal ? ` (${audit.signal})` : ''}.`)
  }

  let report
  try {
    report = JSON.parse(audit.stdout)
  } catch {
    throw new Error(`pnpm audit did not return valid JSON.\n${audit.stderr.trim()}`)
  }

  if (!isRecord(report)) {
    throw new Error('pnpm audit returned an invalid report.')
  }
  if (Object.hasOwn(report, 'error')) {
    throw new Error(`pnpm audit failed: ${auditErrorMessage(report) || 'unknown registry error'}`)
  }
  if (
    !isRecord(report.advisories) ||
    !isRecord(report.metadata) ||
    !isRecord(report.metadata.vulnerabilities)
  ) {
    throw new Error('pnpm audit returned an unrecognized report schema.')
  }

  for (const [advisoryId, advisory] of Object.entries(report.advisories)) {
    if (
      !isRecord(advisory) ||
      !auditSeveritySet.has(advisory.severity) ||
      typeof advisory.module_name !== 'string' ||
      !Array.isArray(advisory.findings) ||
      advisory.findings.length === 0 ||
      advisory.findings.some(
        (finding) =>
          !isRecord(finding) ||
          !Array.isArray(finding.paths) ||
          finding.paths.length === 0 ||
          finding.paths.some((findingPath) => typeof findingPath !== 'string')
      )
    ) {
      throw new Error(`pnpm audit returned malformed advisory ${advisoryId}.`)
    }
  }

  const counts = report.metadata.vulnerabilities
  if (auditSeverities.some((severity) => !Object.hasOwn(counts, severity))) {
    throw new Error('pnpm audit vulnerability counts must include every known severity.')
  }
  if (Object.values(counts).some((count) => !Number.isInteger(count) || count < 0)) {
    throw new Error('pnpm audit returned invalid vulnerability counts.')
  }

  const advisoryCounts = Object.fromEntries(auditSeverities.map((severity) => [severity, 0]))
  for (const advisory of Object.values(report.advisories)) {
    advisoryCounts[advisory.severity] += 1
  }
  const mismatchedSeverities = auditSeverities.filter(
    (severity) => counts[severity] !== advisoryCounts[severity]
  )
  if (mismatchedSeverities.length > 0) {
    throw new Error(
      `pnpm audit vulnerability counts do not match advisory records for: ${mismatchedSeverities.join(', ')}.`
    )
  }

  const totalVulnerabilities = auditSeverities.reduce(
    (total, severity) => total + counts[severity],
    0
  )

  if (audit.status === 0 && totalVulnerabilities > 0) {
    throw new Error('pnpm audit exited successfully while reporting vulnerabilities.')
  }
  if (audit.status !== 0 && totalVulnerabilities === 0) {
    throw new Error(`pnpm audit exited with status ${audit.status} without reporting findings.`)
  }

  return report
}

function validateException(exception, index, today) {
  const requiredFields = [
    'advisoryId',
    'package',
    'path',
    'impact',
    'mitigation',
    'owner',
    'expiresAt',
  ]

  for (const field of requiredFields) {
    if (typeof exception[field] !== 'string' || exception[field].trim() === '') {
      throw new Error(`Audit exception ${index} has an invalid ${field}.`)
    }
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(exception.expiresAt)) {
    throw new Error(`Audit exception ${index} must use YYYY-MM-DD for expiresAt.`)
  }

  if (exception.expiresAt < today) {
    throw new Error(`Audit exception ${exception.advisoryId} expired on ${exception.expiresAt}.`)
  }
}

export function evaluateAuditReport(report, policy, today = new Date().toISOString().slice(0, 10)) {
  if (!Array.isArray(policy.exceptions)) {
    throw new Error('Dependency audit policy must contain an exceptions array.')
  }
  policy.exceptions.forEach((exception, index) => validateException(exception, index, today))

  const findings = Object.values(report.advisories).flatMap((advisory) => {
    if (!severityGate.has(advisory.severity)) return []

    const advisoryId = advisory.github_advisory_id || String(advisory.id)
    return advisory.findings.flatMap((finding) =>
      finding.paths.map((path) => ({
        advisoryId,
        package: advisory.module_name,
        path,
        severity: advisory.severity,
      }))
    )
  })

  const unacceptedFindings = findings.filter(
    (finding) =>
      !policy.exceptions.some(
        (exception) =>
          exception.advisoryId === finding.advisoryId &&
          exception.package === finding.package &&
          exception.path === finding.path
      )
  )

  return {
    counts: report.metadata.vulnerabilities,
    findings,
    unacceptedFindings,
  }
}

function main() {
  const audit = spawnSync('pnpm', ['audit', '--prod', '--json'], {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
  })
  const report = parseAuditReport(audit)

  let policy
  try {
    policy = JSON.parse(readFileSync(exceptionsPath, 'utf8'))
  } catch (error) {
    throw new Error(`Unable to read dependency audit exceptions: ${error.message}`)
  }

  const outcome = evaluateAuditReport(report, policy)
  if (outcome.unacceptedFindings.length > 0) {
    console.error('Unaccepted high/critical production dependency findings:')
    console.table(outcome.unacceptedFindings)
    process.exitCode = 1
    return
  }

  console.log(
    `Production dependency audit passed (${outcome.counts.critical ?? 0} critical, ${outcome.counts.high ?? 0} high; ${outcome.findings.length} accepted paths).`
  )
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  try {
    main()
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
}
