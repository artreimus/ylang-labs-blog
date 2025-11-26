'use client'

import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allProjects } from 'contentlayer/generated'
import Main from './Main'

export default function Page() {
  const publishedBlogs = allBlogs.filter((post) => !post.draft)
  const sortedPosts = sortPosts(publishedBlogs)
  const posts = allCoreContent(sortedPosts)

  const publishedProjects = allProjects.filter((project) => !project.draft)
  const sortedProjects = sortPosts(publishedProjects)
  const projects = allCoreContent(sortedProjects)
  return <Main posts={posts} projects={projects} />
}
