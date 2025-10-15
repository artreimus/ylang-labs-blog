import Link from '@/components/Link'
import Tag from '@/components/CardTag'
import Image from 'next/image'
import React from 'react'

export default function BlogCard({ post, variant = 'default' }) {
  const { slug, title, tags, cardImage, summary, readingTime, images } = post
  const displayImage = (Array.isArray(images) && images.length > 0 && images[0]) || cardImage

  if (variant === 'grid') {
    return (
      <Link href={`/blogs/${slug}`} className="group block h-full">
        <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-gray-200 transition-all duration-300 group-hover:shadow-xl group-hover:ring-primary-200 dark:bg-gray-800 dark:ring-gray-600 dark:group-hover:ring-primary-600">
          {/* Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={displayImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            {/* Tags */}
            <div className="mb-3 flex flex-wrap gap-2">
              {tags.slice(0, 2).map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>

            {/* Title */}
            <h2 className="mb-3 line-clamp-2 text-xl font-semibold leading-tight text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
              {title}
            </h2>

            {/* Summary */}
            <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {summary}
            </p>

            {/* Reading Time */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {readingTime?.text || 'Quick read'}
              </span>
              <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                Read more →
              </span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Original horizontal scroll variant
  return (
    <Link href={`/blogs/${slug}`} className="group block h-[320px] w-[240px]">
      <article className="relative h-full w-full overflow-hidden rounded-lg">
        {/* Image */}
        <Image
          src={cardImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Upper Content: Tags and Date */}
        <div className="absolute left-0 top-0 p-4">
          {/* Tags */}
          <div className="mb-1">
            {tags.slice(0, 1).map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        </div>

        {/* Bottom Content: Title */}
        <div className="absolute bottom-0 left-0 p-4">
          <h2 className="line-clamp-2 text-lg font-bold leading-tight text-white">{title}</h2>
        </div>
      </article>
    </Link>
  )
}
