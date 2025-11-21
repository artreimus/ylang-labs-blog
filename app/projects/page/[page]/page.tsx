import ProjectListLayout from '@/layouts/ProjectListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allProjects } from 'contentlayer/generated'

const PROJECTS_PER_PAGE = 6
const publishedProjects = allProjects.filter((project) => !project.draft)

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(publishedProjects.length / PROJECTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const resolvedParams = await params
  const projects = allCoreContent(sortPosts(publishedProjects))
  const pageNumber = parseInt(resolvedParams.page as string)
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
