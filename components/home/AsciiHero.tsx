'use client'

import { useEffect, useRef, useState } from 'react'
import Image from '@/components/Image'

type GardenController = {
  destroy: () => void
}

export default function AsciiHero({ basePath = '' }: { basePath?: string }) {
  const hostRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controllerRef = useRef<GardenController | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let disposed = false
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    const fitViewport = () => {
      host.style.width = `${document.documentElement.clientWidth}px`
    }
    const viewportObserver = new ResizeObserver(fitViewport)
    viewportObserver.observe(document.documentElement)
    fitViewport()

    // This locally hosted ES module keeps the painter out of the site's React bundle.
    const source = `${basePath}/ascii/ylang-garden/garden.js`
    import(/* webpackIgnore: true */ source)
      .then(({ mountGarden }) => {
        if (disposed) return
        controllerRef.current = mountGarden(canvas, host, {
          onReady: () => setReady(true),
        })
      })
      .catch((error) => {
        // The server-rendered still and navigation remain usable if animation cannot load.
        console.error('Unable to start the ASCII garden:', error)
      })

    return () => {
      disposed = true
      viewportObserver.disconnect()
      controllerRef.current?.destroy()
      controllerRef.current = null
    }
  }, [basePath])

  return (
    <section
      ref={hostRef}
      aria-label="Ylang Labs ASCII garden"
      data-ascii-hero
      className="relative left-1/2 -ml-[50vw] h-[calc(100svh-var(--header-height))] min-h-[28rem] w-screen overflow-hidden"
    >
      <h1 className="sr-only">Ylang Labs — AI Engineering</h1>
      {(['light', 'dark'] as const).map((theme) => (
        <picture
          key={theme}
          className={`pointer-events-none absolute inset-0 ${ready ? 'invisible' : theme === 'dark' ? 'invisible dark:visible' : 'visible dark:invisible'}`}
        >
          <source
            media="(max-width: 767px)"
            srcSet={`${basePath}/static/images/home/ylang-garden-mobile-${theme}.webp`}
          />
          <Image
            src={`/static/images/home/ylang-garden-${theme}.webp`}
            alt=""
            fill
            loading="eager"
            sizes="100vw"
            className="object-contain"
          />
        </picture>
      ))}
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <div
        aria-hidden="true"
        data-ascii-wordmark
        className="pointer-events-none absolute left-1/2 top-[45%] aspect-[5/1] w-[70vw] max-w-md -translate-x-1/2 -translate-y-1/2 text-secondary-500 [--dot-radius:0.9px] [--dot-size:2px] dark:text-primary-400 sm:w-[32vw] sm:[--dot-radius:1.15px] sm:[--dot-size:2.5px]"
        style={{
          backgroundImage:
            'radial-gradient(circle, currentColor var(--dot-radius), transparent calc(var(--dot-radius) + 0.1px))',
          backgroundSize: 'var(--dot-size) var(--dot-size)',
          maskImage: `url("${basePath}/ascii/ylang-garden/wordmark.svg")`,
          maskSize: 'contain',
          maskPosition: 'center',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: `url("${basePath}/ascii/ylang-garden/wordmark.svg")`,
          WebkitMaskSize: 'contain',
          WebkitMaskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
    </section>
  )
}
