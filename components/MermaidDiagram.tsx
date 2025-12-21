'use client'

import React, { useEffect, useId, useMemo, useRef, useState } from 'react'
import InlineLoader from './InlineLoader'

type MermaidModule = typeof import('mermaid')

let mermaidModulePromise: Promise<MermaidModule> | null = null

function loadMermaidModule(): Promise<MermaidModule> {
  if (!mermaidModulePromise) {
    mermaidModulePromise = import('mermaid')
  }
  return mermaidModulePromise
}

function getMermaidApi(mod: MermaidModule) {
  const anyModule = mod as unknown as { default?: unknown }
  return (anyModule.default ?? mod) as {
    initialize: (config: Record<string, unknown>) => void
    render: (
      id: string,
      text: string
    ) => Promise<{ svg: string; bindFunctions?: (el: Element) => void }>
  }
}

export interface MermaidDiagramProps {
  code?: string
  children?: string
  className?: string
}

export default function MermaidDiagram({ code, children, className = '' }: MermaidDiagramProps) {
  const renderId = useId().replace(/[:]/g, '')
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isDark, setIsDark] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const diagramCode = useMemo(() => {
    if (typeof code === 'string' && code.trim()) return code.trim()
    if (typeof children === 'string' && children.trim()) return children.trim()
    return ''
  }, [code, children])

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!diagramCode || !containerRef.current) return

    let isCancelled = false
    setIsLoading(true)
    setError(null)

    void (async () => {
      try {
        const mod = await loadMermaidModule()
        const mermaid = getMermaidApi(mod)

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: isDark ? 'dark' : 'default',
          themeVariables: { background: 'transparent' },
        })

        const { svg, bindFunctions } = await mermaid.render(renderId, diagramCode)

        if (isCancelled || !containerRef.current) return
        containerRef.current.innerHTML = svg
        bindFunctions?.(containerRef.current)

        const svgEl = containerRef.current.querySelector('svg')
        if (svgEl) {
          svgEl.style.maxWidth = '100%'
          svgEl.style.height = 'auto'
          svgEl.setAttribute('preserveAspectRatio', 'xMinYMin meet')
        }
      } catch (e) {
        if (isCancelled) return
        setError(e instanceof Error ? e.message : 'Failed to render diagram')
      } finally {
        if (!isCancelled) setIsLoading(false)
      }
    })()

    return () => {
      isCancelled = true
    }
  }, [diagramCode, isDark, renderId])

  if (!diagramCode) return null

  return (
    <div className={`my-6 ${className}`}>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
        {isLoading && (
          <InlineLoader
            text="Rendering diagram…"
            color="text-gray-700"
            className="justify-start text-sm dark:text-gray-200"
          />
        )}
        {error && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              Mermaid render error: {error}
            </p>
            <pre className="overflow-x-auto rounded-md bg-gray-50 p-3 text-xs text-gray-900 dark:bg-gray-900 dark:text-gray-100">
              {diagramCode}
            </pre>
          </div>
        )}
        <div
          ref={containerRef}
          className={isLoading || error ? 'hidden' : 'mermaid-diagram'}
          aria-label="Mermaid diagram"
        />
      </div>
    </div>
  )
}
