import { spawnSync } from 'node:child_process'
import packageJson from '../../../package.json'

function runAuditModule(expression: string) {
  return spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `import('./scripts/security/check-production-audit.mjs').then(({parseAuditReport,evaluateAuditReport})=>{try{const value=${expression};process.stdout.write(JSON.stringify({ok:true,value}))}catch(error){process.stdout.write(JSON.stringify({ok:false,message:error.message}))}})`,
    ],
    { cwd: process.cwd(), encoding: 'utf8' }
  )
}

const cleanReport = {
  advisories: {},
  metadata: {
    vulnerabilities: { critical: 0, high: 0, moderate: 0, low: 0, info: 0 },
  },
}

describe('production dependency audit gate', () => {
  it('uses a pnpm release that supports the registry bulk advisory endpoint', () => {
    expect(packageJson.packageManager).toMatch(/^pnpm@11\./)
  })

  it('accepts a recognized clean report', () => {
    const result = runAuditModule(
      `evaluateAuditReport(parseAuditReport({status:0,signal:null,stdout:${JSON.stringify(
        JSON.stringify(cleanReport)
      )},stderr:''}),{exceptions:[]},'2026-07-14')`
    )

    expect(result.status).toBe(0)
    expect(JSON.parse(result.stdout)).toMatchObject({
      ok: true,
      value: { findings: [], unacceptedFindings: [] },
    })
  })

  it('accepts a nonzero audit exit only when a recognized report contains findings', () => {
    const report = {
      advisories: {
        123: {
          id: 123,
          module_name: 'example-package',
          severity: 'moderate',
          findings: [{ paths: ['example-package>dependency'] }],
        },
      },
      metadata: {
        vulnerabilities: { critical: 0, high: 0, moderate: 1, low: 0, info: 0 },
      },
    }
    const result = runAuditModule(
      `parseAuditReport({status:1,signal:null,stdout:${JSON.stringify(
        JSON.stringify(report)
      )},stderr:''})`
    )

    expect(JSON.parse(result.stdout).ok).toBe(true)
  })

  it.each([
    [
      'a registry error encoded as JSON',
      `{status:0,signal:null,stdout:${JSON.stringify(
        JSON.stringify({
          error: { code: 'ERR_PNPM_AUDIT_BAD_RESPONSE', summary: 'registry unavailable' },
        })
      )},stderr:''}`,
      'pnpm audit failed',
    ],
    [
      'a terminated child process',
      `{status:null,signal:'SIGTERM',stdout:'',stderr:''}`,
      'did not exit normally',
    ],
    [
      'an unrecognized report schema',
      `{status:0,signal:null,stdout:${JSON.stringify(JSON.stringify({ advisories: {} }))},stderr:''}`,
      'unrecognized report schema',
    ],
    [
      'a nonzero exit without reported findings',
      `{status:1,signal:null,stdout:${JSON.stringify(JSON.stringify(cleanReport))},stderr:''}`,
      'without reporting findings',
    ],
    [
      'high vulnerability counts without advisory records',
      `{status:1,signal:null,stdout:${JSON.stringify(
        JSON.stringify({
          advisories: {},
          metadata: {
            vulnerabilities: { critical: 0, high: 1, moderate: 0, low: 0, info: 0 },
          },
        })
      )},stderr:''}`,
      'do not match advisory records for: high',
    ],
    [
      'a successful exit that still reports vulnerabilities',
      `{status:0,signal:null,stdout:${JSON.stringify(
        JSON.stringify({
          advisories: {
            123: {
              id: 123,
              module_name: 'example-package',
              severity: 'high',
              findings: [{ paths: ['example-package'] }],
            },
          },
          metadata: {
            vulnerabilities: { critical: 0, high: 1, moderate: 0, low: 0, info: 0 },
          },
        })
      )},stderr:''}`,
      'exited successfully while reporting vulnerabilities',
    ],
    [
      'a counted advisory without affected dependency paths',
      `{status:1,signal:null,stdout:${JSON.stringify(
        JSON.stringify({
          advisories: {
            123: {
              id: 123,
              module_name: 'example-package',
              severity: 'high',
              findings: [],
            },
          },
          metadata: {
            vulnerabilities: { critical: 0, high: 1, moderate: 0, low: 0, info: 0 },
          },
        })
      )},stderr:''}`,
      'malformed advisory 123',
    ],
    [
      'an empty vulnerability count map',
      `{status:0,signal:null,stdout:${JSON.stringify(
        JSON.stringify({ advisories: {}, metadata: { vulnerabilities: {} } })
      )},stderr:''}`,
      'must include every known severity',
    ],
    [
      'two counted high vulnerabilities with only one advisory record',
      `{status:1,signal:null,stdout:${JSON.stringify(
        JSON.stringify({
          advisories: {
            123: {
              id: 123,
              module_name: 'example-package',
              severity: 'high',
              findings: [{ paths: ['example-package'] }],
            },
          },
          metadata: {
            vulnerabilities: { critical: 0, high: 2, moderate: 0, low: 0, info: 0 },
          },
        })
      )},stderr:''}`,
      'do not match advisory records for: high',
    ],
  ])('fails closed for %s', (_name, auditResult, expectedMessage) => {
    const result = runAuditModule(`parseAuditReport(${auditResult})`)
    const output = JSON.parse(result.stdout)

    expect(output.ok).toBe(false)
    expect(output.message).toContain(expectedMessage)
  })
})
