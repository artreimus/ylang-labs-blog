import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allProjects } from 'contentlayer/generated'
import Main from './Main'

const MAX_DISPLAY = 5

export default function Page() {
  const publishedBlogs = allBlogs.filter((post) => !post.draft)
  const sortedPosts = sortPosts(publishedBlogs)
  const posts = allCoreContent(sortedPosts.slice(0, MAX_DISPLAY))

  const publishedProjects = allProjects.filter((project) => !project.draft)
  const sortedProjects = sortPosts(publishedProjects)
  const projects = allCoreContent(sortedProjects.slice(0, MAX_DISPLAY))

  return (
    <Main
      posts={posts}
      projects={projects}
      hasMorePosts={sortedPosts.length > MAX_DISPLAY}
      hasProjects={sortedProjects.length > 0}
    />
  )
}
