import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import Image from 'next/image'
import React from 'react'

export default function BlogCard({ post }) {
  const { slug, date, title, tags, images } = post

  return (
    <Link href={`/blog/${slug}`} className="group block h-[320px] w-[240px]">
      <article className="relative h-full w-full overflow-hidden rounded-lg">
        {/* Image */}
        <Image
          src={images?.[0] ?? 'https://picsum.photos/seed/picsum/800/400'}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Upper Content: Tags and Date */}
        <div className="absolute left-0 top-0 p-4">
          {/* Tags */}
          <div className="mb-1">
            {tags.slice(0, 1).map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>

          {/* Date */}
          <time className="text-xs text-gray-200">{formatDate(date)}</time>
        </div>

        {/* Bottom Content: Title */}
        <div className="absolute bottom-0 left-0 p-4">
          <h2 className="line-clamp-2 text-lg font-bold leading-tight text-white">{title}</h2>
        </div>
      </article>
    </Link>
  )
}
