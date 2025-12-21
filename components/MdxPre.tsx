import React from 'react'
import Pre from 'pliny/ui/Pre'
import MermaidDiagram from './MermaidDiagram'

function extractText(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (React.isValidElement(node)) return extractText(node.props.children)
  return ''
}

function isMermaidClassName(className: unknown): boolean {
  if (typeof className !== 'string') return false
  const normalized = className.toLowerCase()
  return (
    normalized.includes('language-mermaid') ||
    normalized.includes('lang-mermaid') ||
    normalized.split(/\s+/).includes('mermaid')
  )
}

export default function MdxPre(props: React.ComponentProps<typeof Pre>) {
  const childrenArray = React.Children.toArray(props.children)
  const codeEl = childrenArray.find((child) => React.isValidElement(child)) as
    | React.ReactElement
    | undefined

  if (!codeEl) return <Pre {...props} />

  const combinedClassName = `${props.className ?? ''} ${codeEl.props?.className ?? ''}`
  if (!isMermaidClassName(combinedClassName)) return <Pre {...props} />

  const code = extractText(codeEl.props?.children).trim()
  if (!code) return <Pre {...props} />

  return <MermaidDiagram code={code} />
}
