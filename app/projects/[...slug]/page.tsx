import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allProjects, allAuthors } from 'contentlayer/generated'
import type { Authors, Project } from 'contentlayer/generated'
import ProjectLayout from '@/layouts/ProjectLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const resolvedParams = await params
  const slug = decodeURI(resolvedParams.slug.join('/'))
  const project = allProjects.find((p) => p.slug === slug)
  const authorList = project?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  if (!project) {
    return
  }

  const publishedAt = new Date(project.date).toISOString()
  const modifiedAt = new Date(project.lastmod || project.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (project.image) {
    imageList = [project.image]
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
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
  return allProjects.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params
  const slug = decodeURI(resolvedParams.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allProjects))
  const projectIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (projectIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[projectIndex + 1]
  const next = sortedCoreContents[projectIndex - 1]
  const project = allProjects.find((p) => p.slug === slug) as Project
  const authorList = project?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
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
