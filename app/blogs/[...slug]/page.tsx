import 'css/prism.css'
import 'katex/dist/katex.css'

import { coreMDXComponents } from '@/components/mdx/core-components'
import { MDXLayoutRenderer } from 'pliny/mdx-components.js'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer.js'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { getBlogImage } from '@/lib/content/blog-images'
import { loadBlogComponents } from '../../../lib/mdx/blog-component-loaders'
import { resolveAuthorContentAssets, resolveBlogContentAssets } from '@/lib/assets/content.server'

const defaultLayout = 'PostBanner'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

const publishedBlogs = allBlogs.filter((post) => !post.draft)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const resolvedParams = await params
  const slug = decodeURI(resolvedParams.slug.join('/'))
  const rawPost = publishedBlogs.find((p) => p.slug === slug)
  const post = rawPost ? resolveBlogContentAssets(rawPost) : undefined
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(resolveAuthorContentAssets(authorResults as Authors))
  })
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  const imageList = [getBlogImage(post, 'social') ?? siteMetadata.socialBanner]
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  const postUrl = `${siteMetadata.siteUrl}/${post.path}`

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: postUrl,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  return publishedBlogs.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params
  const slug = decodeURI(resolvedParams.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(publishedBlogs).map(resolveBlogContentAssets))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = resolveBlogContentAssets(publishedBlogs.find((p) => p.slug === slug) as Blog)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(resolveAuthorContentAssets(authorResults as Authors))
  })
  const mainContent = coreContent(post)
  const jsonLd = {
    ...post.structuredData,
    author: authorDetails.map((author) => ({
      '@type': 'Person',
      name: author.name,
    })),
  }

  const Layout = layouts[post.layout || defaultLayout]
  const postComponents = await loadBlogComponents(post.slug)
  const components = { ...coreMDXComponents, ...postComponents }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  )
}
