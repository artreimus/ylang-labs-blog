import BlogCardLayout from '@/layouts/BlogCardLayout'
import { getValidPageNumber } from '@/components/lib/pagination'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 10
const publishedBlogs = allBlogs.filter((post) => !post.draft)

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(publishedBlogs.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const resolvedParams = await params
  const posts = allCoreContent(sortPosts(publishedBlogs))
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const pageNumber = getValidPageNumber(resolvedParams.page, totalPages)

  if (!pageNumber) {
    notFound()
  }

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages,
  }

  return (
    <BlogCardLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
