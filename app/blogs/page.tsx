import BlogCardLayout from '@/layouts/BlogCardLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { BLOGS_PER_PAGE } from '@/components/lib/pagination'
import { Suspense } from 'react'
import ListLayoutFallback from '@/layouts/components/ListLayoutFallback'
import { resolveBlogContentAssets } from '@/lib/assets/content.server'

export const metadata = genPageMetadata({ title: 'Blog', url: '/blogs' })

export default function BlogPage() {
  const publishedPosts = allBlogs.filter((post) => !post.draft)
  const posts = allCoreContent(sortPosts(publishedPosts).map(resolveBlogContentAssets))
  const pageNumber = 1
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / BLOGS_PER_PAGE),
  }

  return (
    <Suspense fallback={<ListLayoutFallback label="Loading articles..." />}>
      <BlogCardLayout posts={posts} pagination={pagination} title="All Posts" />
    </Suspense>
  )
}
