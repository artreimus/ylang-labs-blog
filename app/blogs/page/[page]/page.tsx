import BlogCardLayout from '@/layouts/BlogCardLayout'
import {
  BLOGS_PER_PAGE,
  getPaginatedStaticParams,
  getValidPageNumber,
} from '@/components/lib/pagination'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { notFound, permanentRedirect } from 'next/navigation'
import { genPageMetadata } from 'app/seo'

const publishedBlogs = allBlogs.filter((post) => !post.draft)
const isStaticExport = Boolean(process.env.EXPORT)

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(publishedBlogs.length / BLOGS_PER_PAGE)
  return getPaginatedStaticParams(totalPages, { includeFirstPage: isStaticExport })
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params
  const totalPages = Math.ceil(publishedBlogs.length / BLOGS_PER_PAGE)

  if (page === '1') {
    return genPageMetadata({
      title: 'Blog',
      url: '/blogs',
      robots: { index: false, follow: true },
    })
  }

  const pageNumber = getValidPageNumber(page, totalPages)
  if (!pageNumber) notFound()

  return genPageMetadata({
    title: `Blog - Page ${pageNumber}`,
    description: `Page ${pageNumber} of Ylang Labs AI engineering articles.`,
    url: `/blogs/page/${pageNumber}`,
  })
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const resolvedParams = await params

  if (resolvedParams.page === '1' && !isStaticExport) {
    permanentRedirect('/blogs')
  }

  const posts = allCoreContent(sortPosts(publishedBlogs))
  const totalPages = Math.ceil(posts.length / BLOGS_PER_PAGE)
  const pageNumber = getValidPageNumber(resolvedParams.page, totalPages)

  if (!pageNumber) {
    notFound()
  }

  const pagination = {
    currentPage: pageNumber,
    totalPages,
  }

  return <BlogCardLayout posts={posts} pagination={pagination} title="All Posts" />
}
