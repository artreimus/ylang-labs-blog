'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Project } from 'contentlayer/generated'
import { allAuthors } from 'contentlayer/generated'
import Link from '@/components/Link'
import EmptyView from '@/components/EmptyView'
import Image from '@/components/Image'
import { motion } from 'framer-motion'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ProjectListLayoutProps {
  projects: CoreContent<Project>[]
  title: string
  initialDisplayProjects?: CoreContent<Project>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="flex items-center justify-between py-8">
      <div className="flex flex-1 justify-between sm:hidden">
        {prevPage ? (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            rel="prev"
          >
            Previous
          </Link>
        ) : (
          <span className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-300 dark:border-gray-600 dark:bg-gray-800">
            Previous
          </span>
        )}
        {nextPage ? (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            rel="next"
          >
            Next
          </Link>
        ) : (
          <span className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-300 dark:border-gray-600 dark:bg-gray-800">
            Next
          </span>
        )}
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {prevPage ? (
              <Link
                href={
                  currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`
                }
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-600 dark:hover:bg-gray-700"
                rel="prev"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-600">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}

            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 dark:text-gray-100 dark:ring-gray-600">
              {currentPage}
            </span>

            {nextPage ? (
              <Link
                href={`/${basePath}/page/${currentPage + 1}`}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-600 dark:hover:bg-gray-700"
                rel="next"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-600">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default function ProjectListLayout({
  projects,
  title,
  initialDisplayProjects = [],
  pagination,
}: ProjectListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')

  const filteredProjects = projects.filter((project) => {
    const searchContent = project.title + project.description + project.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayProjects exist, display it if no searchValue is specified
  const displayProjects =
    initialDisplayProjects.length > 0 && !searchValue ? initialDisplayProjects : filteredProjects

  // Function to get author name from slug
  const getAuthorName = (authorSlug: string) => {
    const author = allAuthors.find((a) => a.slug === authorSlug)
    return author?.name || authorSlug
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="mx-auto max-w-7xl pt-12">
      {/* Header */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Explore our showcase of AI engineering projects and innovative technical solutions
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        className="mb-12 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="relative w-full max-w-lg">
          <input
            aria-label="Search projects"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-full border border-gray-200 bg-white px-6 py-3 text-gray-900 shadow-sm transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-25 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-primary-400"
          />
          <svg
            className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </motion.div>
      {/* Projects Grid */}
      {!filteredProjects.length ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <EmptyView
            title="No Projects Found"
            description={
              searchValue
                ? `No projects found matching "${searchValue}". Try adjusting your search terms.`
                : 'Our showcase of AI Engineering projects is coming soon. Check back for innovative solutions and technical deep-dives!'
            }
          />
        </motion.div>
      ) : (
        <motion.div
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayProjects.map((project) => {
            const { path, title, description, image, cardImage, github, demo, authors } = project
            const displayImage = cardImage || image
            return (
              <motion.div key={path} variants={cardVariants}>
                <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-500/10 dark:border-gray-800 dark:bg-gray-950">
                  <div className="flex h-full flex-col">
                    <Link href={`/${path}`} className="flex flex-1 flex-col">
                      {displayImage && (
                        <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                          <Image
                            src={displayImage}
                            alt={title}
                            width={800}
                            height={450}
                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-4 pb-0">
                        <div>
                          <h3 className="mb-2 text-base font-bold leading-tight tracking-tight text-gray-900 transition-colors duration-200 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
                            {title}
                          </h3>
                          <div className="prose mb-3 line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                            {description}
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Project links - now outside the Link component */}
                    {(github || demo) && (
                      <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-gray-100 p-6 pt-4 dark:border-gray-800">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {authors && authors.length > 0 && (
                            <span>By {getAuthorName(authors[0])}</span>
                          )}
                        </div>
                        <div className="ml-auto flex gap-3">
                          {github && (
                            <a
                              href={github}
                              className="inline-flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-4 w-4 fill-current"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </a>
                          )}
                          {demo && (
                            <a
                              href={demo}
                              className="inline-flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-4 w-4 fill-none stroke-current"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        </motion.div>
      )}
    </div>
  )
}
