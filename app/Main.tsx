'use client'

import Link from '@/components/Link'
import EmptyView from '@/components/EmptyView'
import BlogCard from '@/components/BlogCard'
import ProjectCard from '@/components/ProjectCard'
import { motion, Variants } from 'framer-motion'
import NextLink from 'next/link'

const MAX_DISPLAY = 5

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number], // "Crispy" bezier
    },
  },
}

export default function Home({ posts, projects }) {
  return (
    <>
      {/* Hero Section */}
      <motion.div
        className="relative flex min-h-[70vh] flex-col items-center justify-center text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="max-w-4xl space-y-6 px-4">
          <h1 className="font-serif text-5xl tracking-tighter text-secondary-500 dark:text-white sm:text-7xl md:text-8xl">
            Discover the Best of <br className="hidden sm:block" />
            <span className="text-primary-400">AI Engineering</span>
          </h1>

          <p className="dark:text-whitemd:text-2xl mx-auto max-w-2xl text-lg font-medium leading-relaxed text-secondary-500 dark:text-white sm:text-xl">
            A curated space to deepen your understanding of artificial intelligence. Simplicity in
            thought, precision in code.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <NextLink
              href="/blogs"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary-500 px-8 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2"
            >
              <span className="mr-2">Start Reading</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </NextLink>

            <NextLink
              href="/projects"
              className="group inline-flex items-center justify-center rounded-full border border-secondary-300 bg-secondary-500 px-8 py-3 font-medium text-white transition-transform duration-300 hover:scale-105 hover:bg-secondary-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:ring-offset-2"
            >
              <span className="mr-2">View Projects</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0-7 7m7-7H3"
                />
              </svg>
            </NextLink>
          </div>
        </motion.div>
      </motion.div>

      {/* Latest Blogs */}
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
