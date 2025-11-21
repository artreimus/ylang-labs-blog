'use client'

import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allProjects } from 'contentlayer/generated'
import Main from './Main'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Page() {
  const publishedBlogs = allBlogs.filter((post) => !post.draft)
  const sortedPosts = sortPosts(publishedBlogs)
  const posts = allCoreContent(sortedPosts)

  const publishedProjects = allProjects.filter((project) => !project.draft)
  const sortedProjects = sortPosts(publishedProjects)
  const projects = allCoreContent(sortedProjects)
  return (
    <>
      <motion.div
        className="mb-24 flex h-[60vh] items-center justify-center sm:mb-32"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center">
          <motion.h1
            className="mb-5 text-center font-serif text-4xl text-secondary-500 dark:text-white sm:text-8xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the Best of <span className="text-primary-500">AI Engineering</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="mb-10 overflow-hidden whitespace-normal border-r-0 text-center text-sm text-secondary-500 dark:border-white dark:text-white sm:animate-typewriterWithCaret sm:whitespace-nowrap sm:border-r-4 sm:border-secondary-500 sm:text-lg md:text-2xl">
              A place to read and deepen your understanding of AI engineering.{' '}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/blogs"
              className="w-full rounded-md bg-primary-500 px-4 py-3 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400 sm:px-5 sm:py-4 sm:text-lg"
            >
              Start Reading
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Main posts={posts} projects={projects} />
      </motion.div>
    </>
  )
}
