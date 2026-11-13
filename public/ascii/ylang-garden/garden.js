import createScene, { getLayout, meta } from './scene.js'
import { cellAspect } from './vendor/runtime/canvas.js'
import { drawGardenFrame } from './paint.js'

export function mountGarden(canvas, host, { onReady, onPauseChange } = {}) {
  const context = canvas.getContext('2d')
  if (!context) return { destroy() {}, setPaused() {} }

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
  let paused = reducedMotion.matches
  let visible = true
  let destroyed = false
  let raf = 0
  let previous = 0
  let lastPaint = 0
  let elapsed = 1.2
  let width = 0
  let height = 0
  let dpr = 1
  let layout
  let draw
  let dark = document.documentElement.classList.contains('dark')
  const aspect = cellAspect(meta)

  function render() {
    if (!draw || !width || !height || destroyed) return
    drawGardenFrame(context, draw(elapsed), { layout, width, height, dpr, dark })
  }

  function resize() {
    const bounds = host.getBoundingClientRect()
    width = bounds.width
    height = bounds.height
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    layout = getLayout(width, Math.max(1, height), aspect)
    draw = createScene(layout)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    render()
  }

  function tick(now) {
    raf = 0
    if (destroyed || paused || !visible || document.hidden) return
    if (previous) elapsed += Math.min(100, now - previous) / 1000
    previous = now
    if (now - lastPaint >= 1000 / 24) {
      render()
      lastPaint = now
    }
    raf = requestAnimationFrame(tick)
  }

  function sync() {
    cancelAnimationFrame(raf)
    raf = 0
    previous = 0
    if (!destroyed && !paused && visible && !document.hidden) {
      raf = requestAnimationFrame(tick)
    }
  }

  function setPaused(value) {
    paused = value
    onPauseChange?.(paused)
    render()
    sync()
  }

  const resizeObserver = new ResizeObserver(resize)
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    sync()
  })
  const themeObserver = new MutationObserver(() => {
    dark = document.documentElement.classList.contains('dark')
    render()
  })
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  const motionChanged = () => setPaused(reducedMotion.matches)
  resizeObserver.observe(host)
  intersectionObserver.observe(host)
  reducedMotion.addEventListener('change', motionChanged)
  document.addEventListener('visibilitychange', sync)
  resize()
  onPauseChange?.(paused)
  onReady?.()
  sync()

  return {
    setPaused,
    destroy() {
      destroyed = true
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      reducedMotion.removeEventListener('change', motionChanged)
      document.removeEventListener('visibilitychange', sync)
    },
  }
}
