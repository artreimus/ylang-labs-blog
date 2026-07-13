import type { MetadataRoute } from 'next'

type SitemapContent = {
  path: string
  date: string
  lastmod?: string
  draft?: boolean
}

const staticPaths = ['', 'blogs', 'projects', 'tags', 'about', 'contact-us', 'legal'] as const

export function buildSitemap(
  siteUrl: string,
  blogs: SitemapContent[],
  projects: SitemapContent[]
): MetadataRoute.Sitemap {
  const contentRoutes = [...blogs, ...projects]
    .filter((content) => !content.draft)
    .map((content) => ({
      url: `${siteUrl}/${content.path}`,
      lastModified: content.lastmod || content.date,
    }))

  const staticRoutes = staticPaths.map((route) => ({ url: `${siteUrl}/${route}` }))
  return [...staticRoutes, ...contentRoutes]
}
