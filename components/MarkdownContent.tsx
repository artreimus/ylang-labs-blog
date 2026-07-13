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
export default async function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  const htmlContent = content ? (await remark().use(remarkHtml).process(content)).toString() : ''

  return (
    <div
      className={`prose-sm dark:prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
