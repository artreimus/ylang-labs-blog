import Link from '@/components/Link'
import Tag from '@/components/CardTag'
import Image from 'next/image'
import React from 'react'
import type { Project } from 'contentlayer/generated'

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, title, tags, cardImage, image } = project
  const displayImage = cardImage || image

  return (
    <Link href={`/projects/${slug}`} className="group block h-[320px] w-[240px]">
      <article className="relative h-full w-full overflow-hidden rounded-lg bg-gray-900">
        {/* Image */}
        {displayImage && (
          <Image
            src={displayImage}
            alt={title}
            fill
            sizes="240px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

        {/* Upper Content: Tags and Date */}
        <div className="absolute left-0 top-0 p-4">
          {/* Tags */}
          <div className="mb-1">
            {tags && tags.slice(0, 1).map((tag: string) => <Tag key={tag} text={tag} />)}
          </div>
        </div>

        {/* Bottom Content: Title */}
        <div className="absolute bottom-0 left-0 p-4">
          <h2 className="line-clamp-2 text-lg font-bold leading-tight text-white drop-shadow-sm">
            {title}
          </h2>
        </div>
      </article>
    </Link>
  )
}
