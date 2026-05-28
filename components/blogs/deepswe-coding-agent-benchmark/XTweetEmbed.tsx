import type { ReactNode } from 'react'

type XTweetEmbedProps = {
  url: string
  author: string
  handle: string
  date: string
  children: ReactNode
}

export default function XTweetEmbed({ url, author, handle, date, children }: XTweetEmbedProps) {
  return (
    <figure className="not-prose my-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-950 dark:text-gray-50">{author}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {handle} · {date}
          </p>
        </div>
        <span className="rounded-full border border-gray-200 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-800 dark:text-gray-400">
          X
        </span>
      </div>
      <blockquote className="mt-4 text-sm leading-6 text-gray-800 dark:text-gray-200">
        {children}
      </blockquote>
      <a
        href={url}
        className="mt-4 inline-flex text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
      >
        View post on X
      </a>
    </figure>
  )
}
