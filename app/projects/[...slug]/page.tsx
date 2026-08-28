import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components.js'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer.js'
import { allProjects, allAuthors } from 'contentlayer/generated'
import type { Authors, Project } from 'contentlayer/generated'
import ProjectLayout from '@/layouts/ProjectLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { parseProjectHeroMedia } from '@/lib/content/project-hero-media'
import {
  resolveAuthorContentAssets,
  resolveProjectContentAssets,
} from '@/lib/assets/content.server'

const publishedProjects = allProjects.filter((project) => !project.draft)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const resolvedParams = await params
  const slug = decodeURI(resolvedParams.slug.join('/'))
  const rawProject = publishedProjects.find((p) => p.slug === slug)
  const project = rawProject ? resolveProjectContentAssets(rawProject) : undefined
  const authorList = project?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(resolveAuthorContentAssets(authorResults as Authors))
  })
  if (!project) {
    return
  }

  const publishedAt = new Date(project.date).toISOString()
  const modifiedAt = new Date(project.lastmod || project.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  const heroMedia = parseProjectHeroMedia((project as Project & { heroMedia?: unknown }).heroMedia)
  const socialImage = heroMedia?.type === 'video' ? heroMedia.poster : heroMedia?.src
  const imageList = [socialImage ?? project.image ?? siteMetadata.socialBanner]
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  const projectUrl = `${siteMetadata.siteUrl}/${project.path}`

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: projectUrl,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  return publishedProjects.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params
  const slug = decodeURI(resolvedParams.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(
    sortPosts(publishedProjects).map(resolveProjectContentAssets)
  )
  const projectIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (projectIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[projectIndex + 1]
  const next = sortedCoreContents[projectIndex - 1]
  const project = resolveProjectContentAssets(
    publishedProjects.find((p) => p.slug === slug) as Project
  )
  const authorList = project?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(resolveAuthorContentAssets(authorResults as Authors))
  })
  const mainContent = coreContent(project)

  return (
    <>
      <ProjectLayout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={project.body.code} components={components} toc={project.toc} />
      </ProjectLayout>
    </>
  )
}
