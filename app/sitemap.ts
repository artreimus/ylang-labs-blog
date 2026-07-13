import { MetadataRoute } from 'next'
import { allBlogs, allProjects } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { buildSitemap } from '@/lib/content/sitemap'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap(siteMetadata.siteUrl, allBlogs, allProjects)
}
