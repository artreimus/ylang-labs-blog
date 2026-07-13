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
  description?: string
  label?: string
}

export default function MermaidDiagram({
  code,
  children,
  className = '',
  description,
  label = 'Mermaid diagram',
}: MermaidDiagramProps) {
  const renderId = useId().replace(/[:]/g, '')
  const descriptionId = useId().replace(/[:]/g, '')
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
        const diagramBackground = isDark ? '#030712' : '#ffffff'
        const diagramText = isDark ? '#f3f4f6' : '#111827'

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          themeCSS: `.edgeLabel, .labelBkg { background-color: ${diagramBackground} !important; } .edgeLabel p { color: ${diagramText} !important; }`,
          themeVariables: {
            background: 'transparent',
            darkMode: isDark,
            primaryTextColor: diagramText,
            textColor: diagramText,
          },
        })

        const { svg, bindFunctions } = await mermaid.render(renderId, diagramCode)

        if (isCancelled || !containerRef.current) return
        containerRef.current.innerHTML = svg
        bindFunctions?.(containerRef.current)

        // Mermaid's generated stylesheet gives edge-label paragraphs a theme
        // accent background. Set the accessible label surface explicitly after
        // render so dark-mode contrast is stable across Mermaid releases.
        for (const element of containerRef.current.querySelectorAll<HTMLElement>(
          '.edgeLabel, .edgeLabel p, .labelBkg'
        )) {
          element.style.setProperty('background-color', diagramBackground, 'important')
          element.style.setProperty('color', diagramText, 'important')
        }

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
          <div role="status" aria-live="polite">
            <InlineLoader
              text="Rendering diagram…"
              color="text-gray-700"
              className="justify-start text-sm dark:text-gray-200"
            />
          </div>
        )}
        {error && (
          <div className="space-y-3" role="alert">
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
          role="img"
          aria-label={label}
          aria-describedby={description ? descriptionId : undefined}
        />
        {description && (
          <p id={descriptionId} className="sr-only">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
