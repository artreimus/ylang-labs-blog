import { spawnSync } from 'node:child_process'
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

function fixture() {
  const rootDir = mkdtempSync(path.join(os.tmpdir(), 'ylang-inventory-'))
  temporaryDirectories.push(rootDir)
  mkdirSync(path.join(rootDir, 'data/blogs'), { recursive: true })
  mkdirSync(path.join(rootDir, 'public/static/images/blogs/example'), { recursive: true })
  writeFileSync(
    path.join(rootDir, 'data/blogs/example.mdx'),
    "images: ['/static/images/blogs/example/blogHeader.png']"
  )

  const files = [
    'public/static/images/blogs/example/blogHeader.png',
    'public/static/images/blogs/example/source-artwork.png',
    'public/static/images/blogs/example/unused.png',
    'public/static/images/logo-light.svg',
    'public/static/images/social-banner.png',
  ]
  files.forEach((file, index) =>
    writeFileSync(path.join(rootDir, file), Buffer.concat([png, Buffer.from([index])]))
  )
  return rootDir
}

it('classifies every public file deterministically without writing a report', () => {
  const rootDir = fixture()
  const result = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      "import('./scripts/assets/inventory.mjs').then(({buildAssetInventory}) => process.stdout.write(JSON.stringify(buildAssetInventory({ rootDir: process.argv[1], now: new Date('2026-07-13T00:00:00.000Z') }))))",
      rootDir,
    ],
    { cwd: process.cwd(), encoding: 'utf8' }
  )

  expect(result.stderr).toBe('')
  expect(result.status).toBe(0)
  const report = JSON.parse(result.stdout)
  expect(report.assetCount).toBe(5)
  expect(report.assets.map(({ logicalId, disposition }) => [logicalId, disposition])).toEqual([
    ['/static/images/blogs/example/blogHeader.png', 'public-blob'],
    ['/static/images/blogs/example/source-artwork.png', 'private-blob'],
    ['/static/images/blogs/example/unused.png', 'defer'],
    ['/static/images/logo-light.svg', 'keep-local'],
    ['/static/images/social-banner.png', 'keep-local'],
  ])
  expect(report.counts).toMatchObject({
    'keep-local': 2,
    'public-blob': 1,
    'private-blob': 1,
    defer: 1,
  })
})

it('uses frontmatter roles for ambiguously named project card images', () => {
  const rootDir = mkdtempSync(path.join(os.tmpdir(), 'ylang-inventory-role-'))
  temporaryDirectories.push(rootDir)
  mkdirSync(path.join(rootDir, 'data/projects'), { recursive: true })
  mkdirSync(path.join(rootDir, 'public/static/images/projects/example'), { recursive: true })
  writeFileSync(
    path.join(rootDir, 'data/projects/example.mdx'),
    ['---', "cardImage: '/static/images/projects/example/iphone.png'", '---'].join('\n')
  )
  writeFileSync(path.join(rootDir, 'public/static/images/projects/example/iphone.png'), png)

  const result = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      "import('./scripts/assets/inventory.mjs').then(({buildAssetInventory}) => process.stdout.write(JSON.stringify(buildAssetInventory({ rootDir: process.argv[1] }))))",
      rootDir,
    ],
    { cwd: process.cwd(), encoding: 'utf8' }
  )

  expect(result.stderr).toBe('')
  expect(result.status).toBe(0)
  expect(JSON.parse(result.stdout).assets[0]).toMatchObject({
    logicalId: '/static/images/projects/example/iphone.png',
    role: 'card',
    disposition: 'public-blob',
  })
})

it('keeps an allowlisted public source local until its content reference is replaced', () => {
  const rootDir = mkdtempSync(path.join(os.tmpdir(), 'ylang-inventory-public-source-'))
  temporaryDirectories.push(rootDir)
  const assetId = '/static/images/blogs/example/source-artwork.png'
  const assetPath = path.join(rootDir, 'public', assetId)
  mkdirSync(path.dirname(assetPath), { recursive: true })
  mkdirSync(path.join(rootDir, 'data/blogs'), { recursive: true })
  writeFileSync(path.join(rootDir, 'data/blogs/example.mdx'), `image: '${assetId}'`)
  writeFileSync(
    path.join(rootDir, 'data/asset-public-source-allowlist.json'),
    JSON.stringify([{ assetId }])
  )
  writeFileSync(assetPath, png)

  const result = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      "import('./scripts/assets/inventory.mjs').then(({buildAssetInventory}) => process.stdout.write(JSON.stringify(buildAssetInventory({ rootDir: process.argv[1] }))))",
      rootDir,
    ],
    { cwd: process.cwd(), encoding: 'utf8' }
  )

  expect(result.status).toBe(0)
  expect(JSON.parse(result.stdout).assets[0]).toMatchObject({
    logicalId: assetId,
    disposition: 'keep-local',
  })
})
