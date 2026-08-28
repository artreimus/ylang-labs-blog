import { spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const temporaryDirectories: string[] = []

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { force: true, recursive: true })
  }
})

function writeFixture(
  rootDir: string,
  textOnlyRequestsRecharts: boolean,
  textOnlyShell = 'console.log("shell")'
) {
  const chunksDir = path.join(rootDir, '.next/static/chunks')
  const blogsDir = path.join(rootDir, '.next/server/app/blogs')
  mkdirSync(chunksDir, { recursive: true })
  mkdirSync(blogsDir, { recursive: true })
  writeFileSync(path.join(chunksDir, 'shell.js'), textOnlyShell)
  writeFileSync(path.join(chunksDir, 'charts.js'), 'const library = "recharts"')

  const shellScript = '<script src="/_next/static/chunks/shell.js"></script>'
  const chartScript = '<script src="/_next/static/chunks/charts.js"></script>'
  writeFileSync(
    path.join(blogsDir, 'goal.html'),
    textOnlyRequestsRecharts ? shellScript + chartScript : shellScript
  )
  for (const slug of [
    'xllm-cluster-architecture-ai-inference',
    'a-deep-dive-into-deepseek-r1-the-open-source-challenger-using-reinforcement-learning',
  ]) {
    writeFileSync(path.join(blogsDir, `${slug}.html`), shellScript + chartScript)
  }
}

function validateFixture(rootDir: string) {
  const command = [
    '--input-type=module',
    '-e',
    "import('./scripts/bundles/validate.mjs').then(({validateBlogBundleIsolation}) => process.stdout.write(JSON.stringify(validateBlogBundleIsolation({ rootDir: process.argv[1] }))))",
    rootDir,
  ]
  const result = spawnSync(process.execPath, command, {
    cwd: process.cwd(),
    encoding: 'utf8',
  })
  expect(result.stderr).toBe('')
  expect(result.status).toBe(0)
  return JSON.parse(result.stdout)
}

describe('blog bundle validation', () => {
  it('accepts a build where only chart articles request Recharts', () => {
    const rootDir = mkdtempSync(path.join(os.tmpdir(), 'ylang-bundles-'))
    temporaryDirectories.push(rootDir)
    writeFixture(rootDir, false)

    expect(validateFixture(rootDir)).toMatchObject({ ok: true, errors: [] })
  })

  it('rejects a Recharts request from the text-only fixture', () => {
    const rootDir = mkdtempSync(path.join(os.tmpdir(), 'ylang-bundles-'))
    temporaryDirectories.push(rootDir)
    writeFixture(rootDir, true)

    const report = validateFixture(rootDir)
    expect(report.ok).toBe(false)
    expect(report.errors).toEqual([
      expect.stringContaining('Text-only article /blogs/goal requests Recharts'),
    ])
  })

  it('rejects a text-only route that exceeds the initial JavaScript ceiling', () => {
    const rootDir = mkdtempSync(path.join(os.tmpdir(), 'ylang-bundles-'))
    temporaryDirectories.push(rootDir)
    writeFixture(rootDir, false, 'x'.repeat(1_048_577))

    const report = validateFixture(rootDir)
    expect(report.ok).toBe(false)
    expect(report.errors).toEqual([
      expect.stringContaining('Text-only article initial JS is 1048577 bytes'),
    ])
  })
})
