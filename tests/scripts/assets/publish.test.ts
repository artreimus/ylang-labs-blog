import { spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
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
  const rootDir = mkdtempSync(path.join(os.tmpdir(), 'ylang-publish-'))
  temporaryDirectories.push(rootDir)
  mkdirSync(path.join(rootDir, 'data/blogs'), { recursive: true })
  mkdirSync(path.join(rootDir, 'public/static/images/blogs/example'), { recursive: true })
  writeFileSync(path.join(rootDir, 'data/assets-manifest.json'), '{}')
  writeFileSync(path.join(rootDir, 'data/private-assets-inventory.json'), '[]')
  writeFileSync(path.join(rootDir, 'data/asset-budget-overrides.json'), '[]')
  writeFileSync(
    path.join(rootDir, 'data/blogs/example.mdx'),
    [
      "cardImage: '/static/images/blogs/example/cardImage.png'",
      "source: '/static/images/blogs/example/source-artwork.png'",
    ].join('\n')
  )
  writeFileSync(path.join(rootDir, 'public/static/images/blogs/example/cardImage.png'), png)
  writeFileSync(path.join(rootDir, 'public/static/images/blogs/example/source-artwork.png'), png)
  mkdirSync(path.join(rootDir, 'artifacts/assets/example'), { recursive: true })
  writeFileSync(path.join(rootDir, 'artifacts/assets/example/demo.webm'), Buffer.from('webm'))
  return rootDir
}

function runModule(source: string, rootDir: string) {
  return spawnSync(process.execPath, ['--input-type=module', '-e', source, rootDir], {
    cwd: process.cwd(),
    encoding: 'utf8',
  })
}

it('builds an immutable dry-run plan without credentials or API calls', () => {
  const rootDir = fixture()
  const result = runModule(
    `import('./scripts/assets/publish.mjs').then(({parsePublishArgs,buildPublishPlan}) => {
      const args = parsePublishArgs(['--path','public/static/images/blogs/example/cardImage.png','--store','public']);
      const plan = buildPublishPlan({rootDir:process.argv[1],args,now:new Date('2026-07-13T00:00:00.000Z')});
      process.stdout.write(JSON.stringify(plan));
    })`,
    rootDir
  )

  expect(result.stderr).toBe('')
  expect(result.status).toBe(0)
  const plan = JSON.parse(result.stdout)
  expect(plan.mode).toBe('dry-run')
  expect(plan.entries).toHaveLength(1)
  expect(plan.entries[0].pathname).toMatch(/^public\/blogs\/example\/card-[a-f0-9]{16}\.png$/)
  expect(readFileSync(path.join(rootDir, 'data/assets-manifest.json'), 'utf8')).toBe('{}')
})

it('accepts pnpm script argument separators', () => {
  const result = runModule(
    `import('./scripts/assets/publish.mjs').then(({parsePublishArgs}) => {
      process.stdout.write(JSON.stringify(parsePublishArgs(['--','--path','public/static/images/blogs/example/cardImage.png','--store','public','--dry-run'])));
    })`,
    fixture()
  )

  expect(result.stderr).toBe('')
  expect(result.status).toBe(0)
  expect(JSON.parse(result.stdout)).toMatchObject({ store: 'public', dryRun: true })
})

it('publishes ignored derived media through an explicit logical ID and role', () => {
  const rootDir = fixture()
  const result = runModule(
    `import('./scripts/assets/publish.mjs').then(({parsePublishArgs,buildPublishPlan}) => {
      const args=parsePublishArgs(['--derived-path','artifacts/assets/example/demo.webm','--logical-id','/static/images/projects/example/demo.webm','--role','video','--store','public','--dry-run']);
      process.stdout.write(JSON.stringify(buildPublishPlan({rootDir:process.argv[1],args,now:new Date('2026-07-13T00:00:00.000Z')})));
    })`,
    rootDir
  )

  expect(result.stderr).toBe('')
  expect(result.status).toBe(0)
  const plan = JSON.parse(result.stdout)
  expect(plan.entries).toHaveLength(1)
  expect(plan.entries[0]).toMatchObject({
    logicalId: '/static/images/projects/example/demo.webm',
    role: 'video',
    contentType: 'video/webm',
  })
  expect(plan.entries[0].pathname).toMatch(/^public\/projects\/example\/video-[a-f0-9]{16}\.webm$/)
})

it('uses exact write options, journals success, updates the manifest, and resumes through head', () => {
  const rootDir = fixture()
  const result = runModule(
    `import('./scripts/assets/publish.mjs').then(async ({parsePublishArgs,buildPublishPlan,applyPublishPlan}) => {
      const args=parsePublishArgs(['--path','public/static/images/blogs/example/cardImage.png','--store','public','--apply']);
      const plan=buildPublishPlan({rootDir:process.argv[1],args,now:new Date('2026-07-13T00:00:00.000Z')});
      const calls=[];
      const metadata=(entry)=>({url:'https://store123.public.blob.vercel-storage.com/'+entry.pathname,pathname:entry.pathname,contentType:entry.contentType,etag:'etag',size:entry.bytes});
      const client={put:async(pathname,body,options)=>{calls.push({pathname,bytes:body.length,options});return metadata(plan.entries[0])},head:async()=>metadata(plan.entries[0])};
      const environment={BLOB_PUBLIC_STORE_ID:'store123',BLOB_PUBLIC_READ_WRITE_TOKEN:'vercel_blob_rw_store123_secret'};
      const first=await applyPublishPlan({rootDir:process.argv[1],plan,environment,client});
      client.put=async()=>{throw new Error('put must not run during resume')};
      const second=await applyPublishPlan({rootDir:process.argv[1],plan,environment,client});
      const {readFileSync}=await import('node:fs');
      process.stdout.write(JSON.stringify({calls,manifest:JSON.parse(readFileSync(process.argv[1]+'/data/assets-manifest.json','utf8')),resumed:second.results[0].result.resumed,journal:first.journalPath}));
    })`,
    rootDir
  )

  expect(result.stderr).toBe('')
  expect(result.status).toBe(0)
  const output = JSON.parse(result.stdout)
  expect(output.calls).toHaveLength(1)
  expect(output.calls[0].options).toMatchObject({
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: false,
    cacheControlMaxAge: 31_536_000,
    contentType: 'image/png',
    token: 'vercel_blob_rw_store123_secret',
  })
  expect(output.resumed).toBe(true)
  expect(Object.values(output.manifest)).toHaveLength(1)
  expect(readFileSync(output.journal, 'utf8')).toContain('store123')
  expect(readFileSync(output.journal, 'utf8')).not.toContain('vercel_blob_rw')
})

it('keeps private upload recovery metadata free of URLs and credentials', () => {
  const rootDir = fixture()
  const result = runModule(
    `import('./scripts/assets/publish.mjs').then(async ({parsePublishArgs,buildPublishPlan,applyPublishPlan}) => {
      const args=parsePublishArgs(['--path','public/static/images/blogs/example/source-artwork.png','--store','private','--apply']);
      const plan=buildPublishPlan({rootDir:process.argv[1],args,now:new Date('2026-07-13T00:00:00.000Z')});
      const entry=plan.entries[0];
      const client={put:async()=>({url:'https://source456.private.blob.vercel-storage.com/'+entry.pathname,pathname:entry.pathname,contentType:entry.contentType,etag:'etag'}),head:async()=>{throw new Error('unused')}};
      await applyPublishPlan({rootDir:process.argv[1],plan,environment:{BLOB_SOURCES_STORE_ID:'source456',BLOB_SOURCES_READ_WRITE_TOKEN:'vercel_blob_rw_source456_secret'},client});
      const {readFileSync}=await import('node:fs');
      process.stdout.write(readFileSync(process.argv[1]+'/data/private-assets-inventory.json','utf8'));
    })`,
    rootDir
  )

  expect(result.stderr).toBe('')
  expect(result.status).toBe(0)
  const inventory = JSON.parse(result.stdout)
  expect(inventory).toHaveLength(1)
  expect(inventory[0]).toMatchObject({
    logicalId: '/static/images/blogs/example/source-artwork.png',
    storeId: 'source456',
    pathname: expect.stringMatching(/^private\/blogs\/example\/source-[a-f0-9]{16}\.png$/),
  })
  expect(JSON.stringify(inventory)).not.toContain('url')
  expect(JSON.stringify(inventory)).not.toContain('vercel_blob_rw')
})

it('rejects a token that is scoped to a different store before upload', () => {
  const result = runModule(
    `import('./scripts/assets/publish.mjs').then(({resolveStoreConfiguration}) => {
      try { resolveStoreConfiguration('public',{BLOB_PUBLIC_STORE_ID:'store123',BLOB_PUBLIC_READ_WRITE_TOKEN:'vercel_blob_rw_other_secret'}) }
      catch(error) { process.stdout.write(error.message); return }
      process.exitCode=1;
    })`,
    fixture()
  )

  expect(result.status).toBe(0)
  expect(result.stdout).toContain('not scoped')
})
