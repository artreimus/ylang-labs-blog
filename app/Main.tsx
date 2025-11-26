'use client'

import Link from '@/components/Link'
import EmptyView from '@/components/EmptyView'
import BlogCard from '@/components/BlogCard'
import ProjectCard from '@/components/ProjectCard'
import { motion } from 'framer-motion'
import NextLink from 'next/link'

const MAX_DISPLAY = 5

export default function Home({ posts, projects }) {
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
            <NextLink
              href="/blogs"
              className="w-full rounded-md bg-primary-500 px-4 py-3 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400 sm:px-5 sm:py-4 sm:text-lg"
            >
              Start Reading
            </NextLink>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="divide-y divide-gray-200 dark:divide-gray-700"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Latest Blogs
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Discover insightful blogs on AI engineering
          </p>
        </div>
        <div className="relative w-full">
          <div className="hide-scrollbar flex overflow-x-auto py-6">
            {!posts.length && (
              <EmptyView
                title="No Posts Yet"
                description="The world of AI Engineering is waiting to be explored. Check back soon for cutting-edge insights and practical guides!"
              />
            )}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug } = post
              return (
                <div key={slug} className="flex-none pr-3 first:pl-0">
                  <BlogCard post={post} />
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
      {posts.length > MAX_DISPLAY && (
        <div className="mt-1 flex justify-end text-base font-medium leading-6">
          <Link
            href="/blogs"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}

      {/* Projects Section */}
      <motion.div
        className="divide-y divide-gray-200 dark:divide-gray-700"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Latest Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Explore our showcase of AI engineering projects
          </p>
        </div>
        <div className="relative w-full">
          <div className="hide-scrollbar flex overflow-x-auto py-6">
            {!projects?.length && (
              <EmptyView
                title="No Projects Yet"
                description="Our showcase of AI Engineering projects is coming soon. Check back for innovative solutions and technical deep-dives!"
              />
            )}
            {projects?.slice(0, MAX_DISPLAY).map((project) => {
              const { slug } = project
              return (
                <div key={slug} className="flex-none pr-3 first:pl-0">
                  <ProjectCard project={project} />
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
      {projects?.length > 0 && (
        <div className="mt-1 flex justify-end text-base font-medium leading-6">
          <Link
            href="/projects"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All projects"
          >
            All Projects &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
