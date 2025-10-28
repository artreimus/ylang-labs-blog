'use client'

import { useState } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import BlogCard from '@/components/BlogCard'
import EmptyView from '@/components/EmptyView'
import { motion } from 'framer-motion'
import BlogPagination from '@/layouts/components/BlogPagination'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface BlogGridLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

export default function BlogGridLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: BlogGridLayoutProps) {
  const [searchValue, setSearchValue] = useState('')

  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

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
    <div className="mx-auto max-w-7xl">
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
          Discover insightful articles on AI engineering, machine learning, and cutting-edge
          technology
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
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles..."
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

      {/* Blog Grid */}
      {!filteredBlogPosts.length ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <EmptyView
            title="No Posts Found"
            description={
              searchValue
                ? `No articles found matching "${searchValue}". Try adjusting your search terms.`
                : 'The world of AI Engineering is waiting to be explored. Check back soon for cutting-edge insights and practical guides!'
            }
          />
        </motion.div>
      ) : (
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayPosts.map((post) => (
            <motion.div key={post.slug} variants={cardVariants}>
              <BlogCard post={post} variant="grid" />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <BlogPagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        </motion.div>
      )}
    </div>
  )
}
