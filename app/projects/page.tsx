import ProjectListLayout from '@/layouts/ProjectListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allProjects } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

const PROJECTS_PER_PAGE = 6

export const metadata = genPageMetadata({ title: 'Projects', url: '/projects' })

export default function ProjectsPage() {
  const publishedProjects = allProjects.filter((project) => !project.draft)
  const projects = allCoreContent(sortPosts(publishedProjects))
  const pageNumber = 1
  const initialDisplayProjects = projects.slice(
    PROJECTS_PER_PAGE * (pageNumber - 1),
    PROJECTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(projects.length / PROJECTS_PER_PAGE),
  }

  return (
    <ProjectListLayout
      projects={projects}
      initialDisplayProjects={initialDisplayProjects}
      pagination={pagination}
      title="All Projects"
    />
  )
}
