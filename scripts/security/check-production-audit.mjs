import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const severityGate = new Set(['critical', 'high'])
const exceptionsPath = new URL(
  '../../config/security/dependency-audit-exceptions.json',
  import.meta.url
)

function fail(message) {
  console.error(message)
  process.exit(1)
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
      fail(`Audit exception ${index} has an invalid ${field}.`)
    }
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(exception.expiresAt)) {
    fail(`Audit exception ${index} must use YYYY-MM-DD for expiresAt.`)
  }

  if (exception.expiresAt < today) {
    fail(`Audit exception ${exception.advisoryId} expired on ${exception.expiresAt}.`)
  }
}

const audit = spawnSync('pnpm', ['audit', '--prod', '--json'], {
  encoding: 'utf8',
  maxBuffer: 50 * 1024 * 1024,
})

if (audit.error) {
  fail(`Unable to run pnpm audit: ${audit.error.message}`)
}

let report
try {
  report = JSON.parse(audit.stdout)
} catch {
  fail(`pnpm audit did not return valid JSON.\n${audit.stderr.trim()}`)
}

let policy
try {
  policy = JSON.parse(readFileSync(exceptionsPath, 'utf8'))
} catch (error) {
  fail(`Unable to read dependency audit exceptions: ${error.message}`)
}

if (!Array.isArray(policy.exceptions)) {
  fail('Dependency audit policy must contain an exceptions array.')
}

const today = new Date().toISOString().slice(0, 10)
policy.exceptions.forEach((exception, index) => validateException(exception, index, today))

const findings = Object.values(report.advisories ?? {}).flatMap((advisory) => {
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

if (unacceptedFindings.length > 0) {
  console.error('Unaccepted high/critical production dependency findings:')
  console.table(unacceptedFindings)
  process.exit(1)
}

const counts = report.metadata?.vulnerabilities ?? {}
console.log(
  `Production dependency audit passed (${counts.critical ?? 0} critical, ${counts.high ?? 0} high; ${findings.length} accepted paths).`
)
