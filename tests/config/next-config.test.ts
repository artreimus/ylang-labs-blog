/** @jest-environment node */

import { spawnSync } from 'node:child_process'

function loadConfig(environment: Record<string, string | undefined> = {}) {
  const script = [
    "const config=require('./next.config.js')();",
    'Promise.resolve(config.headers()).then((headers)=>process.stdout.write(JSON.stringify({images:config.images,headers})))',
  ].join('')
  return spawnSync(process.execPath, ['-e', script], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: { ...process.env, ...environment },
  })
}

describe('Next security and asset configuration', () => {
  it('keeps the deployed CSP enforced while observing a tighter candidate', () => {
    const result = loadConfig()
    expect(result.status).toBe(0)

    const config = JSON.parse(result.stdout)
    const headers = config.headers[0].headers as { key: string; value: string }[]
    const enforcedCsp = headers.find((header) => header.key === 'Content-Security-Policy')
    const csp = headers.find((header) => header.key === 'Content-Security-Policy-Report-Only')

    expect(enforcedCsp?.value).toContain('img-src *')
    expect(enforcedCsp?.value).toContain('connect-src *')
    expect(enforcedCsp?.value).toContain("media-src 'self' blob: *.s3.amazonaws.com")
    expect(csp?.value).not.toContain('img-src *')
    expect(csp?.value).not.toContain('connect-src *')
    expect(csp?.value).toContain("object-src 'none'")
    expect(headers).toContainEqual({
      key: 'Reporting-Endpoints',
      value: 'csp-endpoint="/api/csp-report"',
    })
  })

  it('allows only the configured Blob hostname and narrow path prefix', () => {
    const result = loadConfig({
      BLOB_PUBLIC_ORIGIN: 'https://example.public.blob.vercel-storage.com',
      BLOB_PUBLIC_PATH_PREFIX: '/ylang-blog-public/**',
    })

    expect(result.status).toBe(0)
    const config = JSON.parse(result.stdout)
    expect(config.images.remotePatterns).toEqual([
      {
        protocol: 'https',
        hostname: 'example.public.blob.vercel-storage.com',
        pathname: '/ylang-blog-public/**',
      },
    ])
    const headers = config.headers[0].headers as { key: string; value: string }[]
    const enforcedCsp = headers.find((header) => header.key === 'Content-Security-Policy')
    expect(enforcedCsp?.value).toContain(
      "media-src 'self' blob: *.s3.amazonaws.com https://example.public.blob.vercel-storage.com"
    )
    expect(enforcedCsp?.value).not.toContain('*.blob.vercel-storage.com')
  })

  it('rejects a broad Blob wildcard', () => {
    const result = loadConfig({
      BLOB_PUBLIC_ORIGIN: 'https://example.public.blob.vercel-storage.com',
      BLOB_PUBLIC_PATH_PREFIX: '/**',
    })

    expect(result.status).not.toBe(0)
    expect(result.stderr).toContain('must be a narrow absolute prefix')
  })
})
