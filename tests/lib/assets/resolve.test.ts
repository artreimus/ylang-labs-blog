import {
  resolveAssetUrl,
  resolveOptionalAssetUrl,
  type AssetManifest,
} from '@/lib/assets/resolve-build'
import { resolveProjectHeroMedia } from '@/lib/assets/project-media'
import { BlogImageRolesSchema, isAssetId, ProjectHeroMediaSchema } from '@/lib/assets/types'

const approvedRemoteHosts = ['store123.public.blob.vercel-storage.com']
const manifest = {
  '/static/images/blogs/example/header.webp': {
    url: 'https://store123.public.blob.vercel-storage.com/public/blogs/example/header-abc.webp',
    sha256: 'a'.repeat(64),
    bytes: 100,
    contentType: 'image/webp',
    role: 'header' as const,
    width: 1200,
    height: 630,
  },
} as const satisfies AssetManifest

describe('asset resolution', () => {
  const originalBlobOrigin = process.env.BLOB_PUBLIC_ORIGIN

  afterEach(() => {
    if (originalBlobOrigin === undefined) delete process.env.BLOB_PUBLIC_ORIGIN
    else process.env.BLOB_PUBLIC_ORIGIN = originalBlobOrigin
  })

  it('recognizes normalized logical asset IDs', () => {
    expect(isAssetId('/static/images/blogs/example/header.webp')).toBe(true)
    expect(isAssetId('/static/images/../secret.txt')).toBe(false)
    expect(isAssetId('/static/images/blogs//header.webp')).toBe(false)
    expect(isAssetId('/static/images/blogs/%2e%2e/secret.webp')).toBe(false)
    expect(isAssetId('/static/images/blogs/header.webp?version=1')).toBe(false)
    expect(isAssetId('static/images/example.png')).toBe(false)
  })

  it('resolves manifest IDs and preserves explicitly approved source schemes', () => {
    expect(
      resolveAssetUrl('/static/images/blogs/example/header.webp', {
        manifest,
        approvedRemoteHosts,
      })
    ).toBe(manifest['/static/images/blogs/example/header.webp'].url)
    expect(
      resolveAssetUrl('https://store123.public.blob.vercel-storage.com/header.webp', {
        approvedRemoteHosts,
      })
    ).toBe('https://store123.public.blob.vercel-storage.com/header.webp')
    expect(resolveAssetUrl('data:image/png;base64,AAAA')).toBe('data:image/png;base64,AAAA')
  })

  it('approves the application Blob host from BLOB_PUBLIC_ORIGIN without a store ID', () => {
    process.env.BLOB_PUBLIC_ORIGIN = 'https://store123.public.blob.vercel-storage.com'

    expect(
      resolveAssetUrl('/static/images/blogs/example/header.webp', {
        manifest,
      })
    ).toBe(manifest['/static/images/blogs/example/header.webp'].url)
  })

  it('uses an explicit local fallback during migration and fails closed afterward', () => {
    const id = '/static/images/blogs/example/missing.webp'
    expect(resolveAssetUrl(id, { manifest: {}, allowLocalFallback: true })).toBe(id)
    expect(() => resolveAssetUrl(id, { manifest: {}, allowLocalFallback: false })).toThrow(
      'Unknown logical asset ID'
    )
  })

  it('rejects manifest entries and remote URLs from unapproved hosts', () => {
    expect(() =>
      resolveAssetUrl('/static/images/blogs/example/header.webp', {
        manifest,
        approvedRemoteHosts: [],
      })
    ).toThrow('unapproved remote host')
    expect(() => resolveAssetUrl('https://assets.example.com/header.webp')).toThrow(
      'Unsupported asset source'
    )
  })

  it('rejects ambiguous relative and insecure remote sources', () => {
    expect(() => resolveAssetUrl('images/example.png')).toThrow('Unsupported asset source')
    expect(() => resolveAssetUrl('http://assets.example.com/header.webp')).toThrow(
      'Unsupported asset source'
    )
    expect(() => resolveAssetUrl('https://')).toThrow('Unsupported asset source')
    expect(() => resolveAssetUrl('https://user:password@assets.example.com/header.webp')).toThrow(
      'Unsupported asset source'
    )
    expect(() => resolveAssetUrl('data:text/html;base64,PGgxPk5vdCBhbiBpbWFnZTwvaDE+')).toThrow(
      'Unsupported asset source'
    )
  })

  it('keeps optional values optional', () => {
    expect(resolveOptionalAssetUrl()).toBeUndefined()
  })

  it('resolves every project hero media source through the same policy', () => {
    const media = ProjectHeroMediaSchema.parse({
      type: 'video',
      label: 'Product walkthrough',
      poster: '/static/images/projects/example/poster.webp',
      sources: [
        { src: '/static/images/projects/example/demo.webm', type: 'video/webm' },
        { src: '/static/images/projects/example/demo.mp4', type: 'video/mp4' },
      ],
      width: 1200,
      height: 675,
    })

    expect(resolveProjectHeroMedia(media, { manifest: {}, allowLocalFallback: true })).toEqual(
      media
    )
  })

  it('rejects misspelled image roles and unsafe project media sources', () => {
    expect(() =>
      BlogImageRolesSchema.parse({
        gridCard: '/static/images/blogs/example/card.webp',
        gridcard: '/static/images/blogs/example/typo.webp',
      })
    ).toThrow()

    expect(() =>
      ProjectHeroMediaSchema.parse({
        type: 'image',
        src: '/static/images/blogs/../secret.webp',
        alt: 'Unsafe path',
        width: 1200,
        height: 630,
      })
    ).toThrow()
  })
})
