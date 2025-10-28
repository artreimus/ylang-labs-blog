'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from '@/components/Link'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import EmptyView from '@/components/EmptyView'
import BlogPagination from '@/layouts/components/BlogPagination'
import CardTag from '@/components/CardTag'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface BlogCardLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  description?: string
}

function getDisplayImage(post: CoreContent<Blog>) {
  if (Array.isArray(post.images) && post.images.length > 0) {
    return post.images[0]
  }

  if (post.cardImage) {
    return post.cardImage
  }

  return null
}

export default function BlogCardLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  description = 'Latest Blogs from Ylang Labs',
}: BlogCardLayoutProps) {
  const [searchValue, setSearchValue] = useState('')

  const filteredBlogPosts = useMemo(() => {
    if (!searchValue) return posts

    const lowerSearch = searchValue.toLowerCase()
    return posts.filter((post) => {
      const searchContent = post.title + post.summary + post.tags?.join(' ')
      return searchContent.toLowerCase().includes(lowerSearch)
    })
  }, [posts, searchValue])

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-12 sm:px-6 lg:px-0">
      <header className="flex flex-col items-center gap-6 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 sm:text-5xl">
            {title}
          </h1>
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
          {description}
        </p>
        <div className="relative w-full max-w-xl">
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <input
            id="blog-search"
            aria-label="Search articles"
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search announcements, features, or guides…"
            className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-sm text-gray-900 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-primary-400"
          />
          <svg
            className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
      </header>

      <section className="mt-16 divide-y divide-gray-200 border-t border-gray-200 dark:divide-gray-800 dark:border-gray-800">
        {!displayPosts.length ? (
          <div className="py-16">
            <EmptyView
              title="No Posts Found"
              description={
                searchValue
                  ? `No articles found matching "${searchValue}". Try a different keyword.`
                  : 'The Ylang Labs team is busy building the next update. Check back soon!'
              }
            />
          </div>
        ) : (
          displayPosts.map((post) => {
            const { slug, title: postTitle, summary, date, readingTime, tags = [] } = post
            const formattedDate = formatDate(date, siteMetadata.locale)
            const displayImage = getDisplayImage(post)

            return (
              <article
                key={slug}
                className="flex gap-8 py-10 transition-colors max-md:flex-col max-md:gap-4"
              >
                <div className="relative w-40 shrink-0 text-sm text-gray-500 dark:text-gray-400 max-md:w-full">
                  <div className="md:sticky md:top-24">
                    <time dateTime={date} className="font-medium">
                      {formattedDate}
                    </time>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-5">
                  {displayImage && (
                    <Link
                      href={`/blogs/${slug}`}
                      className="group relative block overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={displayImage}
                          alt={postTitle}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(min-width: 1024px) 640px, 100vw"
                          priority={false}
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>
                  )}

                  <div className="flex flex-col gap-3">
                    <Link
                      href={`/blogs/${slug}`}
                      className="text-2xl font-semibold leading-snug text-gray-900 transition hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
                    >
                      {postTitle}
                    </Link>
                    <p className="max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {readingTime?.text && (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        {readingTime.text}
                      </span>
                    )}
                    {tags.slice(0, 3).map((tag) => (
                      <CardTag key={tag} text={tag} />
                    ))}
                    <Link
                      href={`/blogs/${slug}`}
                      className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-primary-600 transition hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 max-md:ml-0"
                    >
                      Read Blog
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.5 2.5L8 6L3.5 9.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            )
          })
        )}
      </section>

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <div className="mt-12">
          <BlogPagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        </div>
      )}
    </div>
  )
}
