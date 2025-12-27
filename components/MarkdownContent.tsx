'use client'

import { useMemo } from 'react'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

interface MarkdownContentProps {
  content: string
  className?: string
}

/**
 * A lightweight component to render markdown strings as HTML.
 * Used for frontmatter fields like `tldr` that contain markdown but aren't MDX.
 */
export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  const htmlContent = useMemo(() => {
    if (!content) return ''

    // Synchronously process markdown to HTML
    const result = remark().use(remarkHtml).processSync(content)
    return result.toString()
  }, [content])

  return (
    <div
      className={`prose-sm dark:prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
