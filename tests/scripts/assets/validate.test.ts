import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const temporaryDirectories: string[] = []
const png = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
  'base64'
)

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { force: true, recursive: true })
  }
})

function runValidator(rootDir?: string) {
  const invocation = rootDir
    ? `validateAssets({ rootDir: process.argv[1], now: new Date('2026-07-13T00:00:00.000Z') })`
    : `validateAssets({ now: new Date('2026-07-13T00:00:00.000Z') })`
  const command = [
    '--input-type=module',
    '-e',
    `import('./scripts/assets/validate.mjs').then(({validateAssets}) => { const report = ${invocation}; process.stdout.write(JSON.stringify({ ok: report.ok, assetCount: report.assetCount, errors: report.errors })); process.exitCode = report.ok ? 0 : 1 })`,
  ]
  if (rootDir) command.push(rootDir)

  return spawnSync(process.execPath, command, {
    cwd: process.cwd(),
    encoding: 'utf8',
  })
}

describe('asset validation command', () => {
  it('accepts the current referenced corpus only through explicit migration records', () => {
    const result = runValidator()

    expect(result.stderr).toBe('')
    expect(result.status).toBe(0)
    expect(JSON.parse(result.stdout)).toMatchObject({
      ok: true,
      assetCount: expect.any(Number),
      errors: [],
    })
  })

  it('rejects unallowlisted public GIFs, unsupported content media, and traversal references', () => {
    const rootDir = mkdtempSync(path.join(os.tmpdir(), 'ylang-assets-'))
    temporaryDirectories.push(rootDir)

    mkdirSync(path.join(rootDir, 'data/blogs'), { recursive: true })
    mkdirSync(path.join(rootDir, 'public/static/images/projects/example'), { recursive: true })
    writeFileSync(path.join(rootDir, 'data/asset-budget-overrides.json'), '[]')
    writeFileSync(path.join(rootDir, 'data/asset-duplicate-allowlist.json'), '[]')
    writeFileSync(path.join(rootDir, 'data/asset-migration-allowlist.json'), '[]')
    writeFileSync(path.join(rootDir, 'data/asset-public-source-allowlist.json'), '[]')
    writeFileSync(
      path.join(rootDir, 'data/blogs/example.mdx'),
      ["image: '/static/images/unsafe.bmp'", "other: '/static/images/blogs/../secret.png'"].join(
        '\n'
      )
    )
    writeFileSync(path.join(rootDir, 'public/static/images/unsafe.bmp'), 'not web-safe media')
    writeFileSync(
      path.join(rootDir, 'public/static/images/projects/example/demo.gif'),
      Buffer.from('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==', 'base64')
    )

    const result = runValidator(rootDir)

    expect(result.stderr).toBe('')
    expect(result.status).toBe(1)
    const errorCodes = JSON.parse(result.stdout).errors.map((error: { code: string }) => error.code)
    expect(errorCodes).toEqual(
      expect.arrayContaining(['gif-not-allowed', 'invalid-asset-reference', 'unsupported-mime'])
    )
  })

  it('allows a hash-pinned legacy public source only until its cleanup expiry', () => {
    const rootDir = mkdtempSync(path.join(os.tmpdir(), 'ylang-public-source-'))
    temporaryDirectories.push(rootDir)

    const assetId = '/static/images/blogs/example/source-artwork.png'
    const assetPath = path.join(rootDir, 'public', assetId)
    mkdirSync(path.dirname(assetPath), { recursive: true })
    mkdirSync(path.join(rootDir, 'data/blogs'), { recursive: true })
    writeFileSync(path.join(rootDir, 'data/blogs/example.mdx'), `image: '${assetId}'`)
    writeFileSync(assetPath, png)
    writeFileSync(path.join(rootDir, 'data/asset-budget-overrides.json'), '[]')
    writeFileSync(path.join(rootDir, 'data/asset-duplicate-allowlist.json'), '[]')
    writeFileSync(path.join(rootDir, 'data/asset-migration-allowlist.json'), '[]')
    writeFileSync(
      path.join(rootDir, 'data/asset-public-source-allowlist.json'),
      JSON.stringify([
        {
          assetId,
          sha256: createHash('sha256').update(png).digest('hex'),
          reason: 'Legacy article cleanup is tracked separately.',
          owner: 'Ylang Labs',
          expiresAt: '2026-08-12',
        },
      ])
    )

    const allowed = runValidator(rootDir)
    expect(allowed.status).toBe(0)
    expect(JSON.parse(allowed.stdout).errors).toEqual([])

    writeFileSync(assetPath, Buffer.concat([png, Buffer.from('changed')]))
    const changed = runValidator(rootDir)
    expect(changed.status).toBe(1)
    expect(JSON.parse(changed.stdout).errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'public-source-hash-mismatch', assetId }),
      ])
    )
  })
})
