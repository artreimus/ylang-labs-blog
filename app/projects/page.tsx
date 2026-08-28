import ProjectListLayout from '@/layouts/ProjectListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import { allProjects } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { PROJECTS_PER_PAGE } from '@/components/lib/pagination'
import { Suspense } from 'react'
import ListLayoutFallback from '@/layouts/components/ListLayoutFallback'
import { resolveProjectContentAssets } from '@/lib/assets/content.server'

export const metadata = genPageMetadata({ title: 'Projects', url: '/projects' })

export default function ProjectsPage() {
  const publishedProjects = allProjects.filter((project) => !project.draft)
  const projects = allCoreContent(sortPosts(publishedProjects).map(resolveProjectContentAssets))
  const pageNumber = 1
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(projects.length / PROJECTS_PER_PAGE),
  }

  return (
    <Suspense fallback={<ListLayoutFallback label="Loading projects..." />}>
      <ProjectListLayout projects={projects} pagination={pagination} title="All Projects" />
    </Suspense>
  )
}
