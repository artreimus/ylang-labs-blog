import ProjectListLayout from '@/layouts/ProjectListLayout'
import {
  getPaginatedStaticParams,
  getValidPageNumber,
  PROJECTS_PER_PAGE,
} from '@/components/lib/pagination'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import { allProjects } from 'contentlayer/generated'
import { notFound, permanentRedirect } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import { Suspense } from 'react'
import ListLayoutFallback from '@/layouts/components/ListLayoutFallback'
import { resolveProjectContentAssets } from '@/lib/assets/content.server'

const publishedProjects = allProjects.filter((project) => !project.draft)
const isStaticExport = Boolean(process.env.EXPORT)

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(publishedProjects.length / PROJECTS_PER_PAGE)
  return getPaginatedStaticParams(totalPages, { includeFirstPage: isStaticExport })
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params
  const totalPages = Math.ceil(publishedProjects.length / PROJECTS_PER_PAGE)

  if (page === '1') {
    return genPageMetadata({
      title: 'Projects',
      url: '/projects',
      robots: { index: false, follow: true },
    })
  }

  const pageNumber = getValidPageNumber(page, totalPages)
  if (!pageNumber) notFound()

  return genPageMetadata({
    title: `Projects - Page ${pageNumber}`,
    description: `Page ${pageNumber} of Ylang Labs AI engineering projects.`,
    url: `/projects/page/${pageNumber}`,
  })
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const resolvedParams = await params

  if (resolvedParams.page === '1' && !isStaticExport) {
    permanentRedirect('/projects')
  }

  const projects = allCoreContent(sortPosts(publishedProjects).map(resolveProjectContentAssets))
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE)
  const pageNumber = getValidPageNumber(resolvedParams.page, totalPages)

  if (!pageNumber) {
    notFound()
  }

  const pagination = {
    currentPage: pageNumber,
    totalPages,
  }

  return (
    <Suspense fallback={<ListLayoutFallback label="Loading projects..." />}>
      <ProjectListLayout projects={projects} pagination={pagination} title="All Projects" />
    </Suspense>
  )
}
