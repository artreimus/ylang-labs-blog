import { buildSitemap } from '@/lib/content/sitemap'

describe('buildSitemap', () => {
  it('keeps static routes stable, uses content dates, and excludes drafts', () => {
    const entries = buildSitemap(
      'https://ylanglabs.com',
      [
        { path: 'blogs/published', date: '2026-01-01' },
        { path: 'blogs/draft', date: '2026-01-02', draft: true },
      ],
      [{ path: 'projects/published', date: '2026-01-03', lastmod: '2026-01-04' }]
    )
    const staticEntries = entries.slice(0, 7)

    expect(staticEntries).toHaveLength(7)
    expect(staticEntries.every((entry) => entry.lastModified === undefined)).toBe(true)
    expect(entries).toContainEqual({
      url: 'https://ylanglabs.com/blogs/published',
      lastModified: '2026-01-01',
    })
    expect(entries).toContainEqual({
      url: 'https://ylanglabs.com/projects/published',
      lastModified: '2026-01-04',
    })
    expect(entries.some((entry) => entry.url.includes('/draft'))).toBe(false)
  })
})
