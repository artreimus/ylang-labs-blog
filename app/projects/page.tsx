import ProjectListLayout from '@/layouts/ProjectListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allProjects } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { PROJECTS_PER_PAGE } from '@/components/lib/pagination'

export const metadata = genPageMetadata({ title: 'Projects', url: '/projects' })

export default function ProjectsPage() {
  const publishedProjects = allProjects.filter((project) => !project.draft)
  const projects = allCoreContent(sortPosts(publishedProjects))
  const pageNumber = 1
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(projects.length / PROJECTS_PER_PAGE),
  }

  return <ProjectListLayout projects={projects} pagination={pagination} title="All Projects" />
}
