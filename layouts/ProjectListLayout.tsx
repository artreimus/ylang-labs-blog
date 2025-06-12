'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Project } from 'contentlayer/generated'
import { allAuthors } from 'contentlayer/generated'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import EmptyView from '@/components/EmptyView'
import Image from '@/components/Image'

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
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
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

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <label>
              <span className="sr-only">Search projects</span>
              <input
                aria-label="Search projects"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search projects"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
              />
            </label>
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
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
        </div>
        <div className="grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3">
          {!filteredProjects.length && (
            <div className="col-span-full">
              <EmptyView
                title="No Projects Yet"
                description="Our showcase of AI Engineering projects is coming soon. Check back for innovative solutions and technical deep-dives!"
              />
            </div>
          )}
          {displayProjects.map((project) => {
            const { path, title, description, image, cardImage, github, demo, authors } = project
            const displayImage = cardImage || image
            return (
              <div
                key={path}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
              >
                <div className="flex h-full flex-col">
                  <Link href={`/${path}`} className="group flex flex-1 flex-col">
                    {displayImage && (
                      <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={displayImage}
                          alt={title}
                          width={800}
                          height={450}
                          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-4 pb-0">
                      <div>
                        <h3 className="text-md mb-2 font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100">
                          {title}
                        </h3>
                        <div className="prose mb-4 line-clamp-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
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
            )
          })}
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
