import { MetadataRoute } from 'next'
import { allBlogs, allProjects } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const projectRoutes = allProjects
    .filter((project) => !project.draft)
    .map((project) => ({
      url: `${siteUrl}/${project.path}`,
      lastModified: project.lastmod || project.date,
    }))

  const staticRoutes = ['', 'blogs', 'projects', 'tags', 'about', 'contact-us'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...staticRoutes, ...blogRoutes, ...projectRoutes]
}
