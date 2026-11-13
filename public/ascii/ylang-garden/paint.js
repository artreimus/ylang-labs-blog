import { paint } from './vendor/runtime/canvas.js'
import { gradient, KEYS } from './vendor/lib/kit.js'
import { meta, sceneColors } from './scene.js'
import { flowerMask, flowerGeometry } from './flower-mask.js'
import { drawFoliage } from './foliage.js'

const mask = Uint8Array.from(atob(flowerMask.mask), (character) => character.charCodeAt(0))
const gold = {
  light: ['#a46a04', '#ce9500', '#efc003', '#ffd702'],
  dark: ['#a46a04', '#ce9500', '#efc003', '#ffeb43'],
}
// At most one pair of flowers per theme; their geometry is unchanged by motion.
const flowerCache = { light: [], dark: [] }

function makePalette(dark) {
  const palette = { ...meta.palette }
  const replace = (start, colors) =>
    colors.forEach((color, index) => {
      palette[KEYS[start + index]] = color
    })
  replace(
    sceneColors.bird,
    gradient(dark ? ['#354f25', '#75b34a', '#c9e3b3'] : ['#2f4423', '#507f31', '#87bb60'], 6)
  )
  replace(sceneColors.belly, dark ? ['#9ca3af', '#e5e7eb'] : ['#4b5563', '#9ca3af'])
  replace(sceneColors.beak, dark ? ['#d1d5db', '#9ca3af'] : ['#374151', '#6b7280'])
  replace(
    sceneColors.wing,
    dark ? ['#4b5563', '#6b7280', '#d1d5db'] : ['#9ca3af', '#6b7280', '#4b5563']
  )
  return palette
}

const palettes = { light: makePalette(false), dark: makePalette(true) }

function coverage(u, v) {
  const x = Math.max(0, Math.min(flowerMask.cols - 1, u * flowerMask.cols - 0.5))
  const y = Math.max(0, Math.min(flowerMask.rows - 1, v * flowerMask.rows - 0.5))
  const x0 = Math.floor(x),
    y0 = Math.floor(y)
  const x1 = Math.min(flowerMask.cols - 1, x0 + 1),
    y1 = Math.min(flowerMask.rows - 1, y0 + 1)
  const tx = x - x0,
    ty = y - y0
  const sample = (a, b) => mask[b * flowerMask.cols + a] / 255
  return (
    sample(x0, y0) * (1 - tx) * (1 - ty) +
    sample(x1, y0) * tx * (1 - ty) +
    sample(x0, y1) * (1 - tx) * ty +
    sample(x1, y1) * tx * ty
  )
}

function makeFlower(size, dark, index) {
  const colors = gold[dark ? 'dark' : 'light']
  const count = Math.min(92, Math.max(36, Math.round(size / 4.5)))
  const step = size / count
  const layers = colors.map(() => new Path2D())
  for (let y = 0; y < count; y++)
    for (let x = 0; x < count; x++) {
      const u = (x + 0.5) / count,
        v = (y + 0.5) / count
      const alpha = coverage(u, v)
      if (alpha < 0.25) continue
      const angle = Math.atan2(v - 0.5, u - 0.5),
        distance = Math.hypot(u - 0.5, v - 0.5)
      const ridge = Math.sin(angle * 10 - distance * 6) * 0.08
      const shade = 0.5 + Math.sin(u * 8 + v * 4 + index) * 0.14 + (1 - v) * 0.18 + ridge
      const layer = Math.min(3, Math.floor(shade * 4))
      const radius = step * ((dark ? 0.31 : 0.38) + shade * 0.1) * Math.sqrt(alpha)
      const px = (u - 0.5) * size,
        py = (v - 0.5) * size
      layers[layer].moveTo(px + radius, py)
      layers[layer].arc(px, py, radius, 0, Math.PI * 2)
    }
  return { size, layers }
}

function flower(context, centerX, centerY, size, dark, index) {
  const theme = dark ? 'dark' : 'light'
  let entry = flowerCache[theme][index]
  if (!entry || entry.size !== size) {
    entry = makeFlower(size, dark, index)
    flowerCache[theme][index] = entry
  }
  context.save()
  context.translate(centerX, centerY)
  entry.layers.forEach((path, index) => {
    context.fillStyle = gold[theme][index]
    context.fill(path)
  })
  context.restore()
}

function motes(context, { width, height, time, cw, dark }) {
  const count = width / height < 0.95 ? 12 : 20
  const base = Math.max(0.65, Math.min(1.7, cw * 0.09))
  context.save()
  for (let i = 0; i < count; i++) {
    const phase = i * 2.39996
    const px = width * (0.09 + ((i * 0.618034) % 1) * 0.82) + Math.sin(time * 0.18 + phase) * 9
    const py = height * (0.16 + ((i * 0.381966) % 1) * 0.69) + Math.cos(time * 0.14 + phase) * 7
    const pulse = 0.2 + Math.pow(0.5 + Math.sin(time * 0.65 + phase) * 0.5, 3) * 0.8
    const radius = base * (0.65 + pulse * 0.35)
    context.globalAlpha = pulse * (dark ? 0.85 : 0.7)
    context.fillStyle = dark ? '#ffeb43' : '#a46a04'
    context.beginPath()
    context.arc(px, py, radius, 0, Math.PI * 2)
    context.fill()
    // A few separated green flecks suggest fireflies, without a glow field.
    if (pulse > 0.7) {
      context.globalAlpha = (pulse - 0.7) * 0.65
      context.fillStyle = dark ? '#a7d086' : '#507f31'
      context.beginPath()
      for (let k = 0; k < 3; k++) {
        const angle = (k * Math.PI * 2) / 3 + phase
        const x = px + Math.cos(angle) * base * 3,
          y = py + Math.sin(angle) * base * 3
        context.moveTo(x + base * 0.45, y)
        context.arc(x, y, base * 0.45, 0, Math.PI * 2)
      }
      context.fill()
    }
  }
  context.restore()
}

// Shared by the live canvas and transparent static fallbacks. No surface is filled.
export function drawGardenFrame(context, frame, { layout, width, height, dpr = 1, dark = false }) {
  const artHeight = Math.max(1, height)
  const cw = Math.max(width / layout.cols, artHeight / (layout.rows * layout.aspect))
  const ch = cw * layout.aspect
  const x = (width - layout.cols * cw) / 2,
    y = (artHeight - layout.rows * ch) / 2
  const palette = palettes[dark ? 'dark' : 'light']
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.clearRect(0, 0, width, height)
  context.save()
  context.beginPath()
  context.rect(0, 0, width, artHeight)
  context.clip()
  const options = {
    x,
    y,
    cw,
    ch,
    dpr,
    mode: 'circle',
    look: 'dots',
    size: dark ? 0.34 : 0.4,
    density: 2.2,
    invert: false,
    tone: { sat: dark ? 0.15 : 0, curve: 0.65, lo: 0, hi: 1, sizes: [0.35, 0.6, 0.9, 1.1] },
    noStamp: true,
    ink: dark ? '#f3f4f6' : '#374151',
  }
  drawFoliage(context, layout, { x, y, cw, dark, time: frame.time, flowers: frame.flowers })
  motes(context, { width, height: artHeight, time: frame.time, cw, dark })
  frame.flowers.forEach(([fx, fy], index) =>
    flower(context, x + fx * cw, y + fy * ch, cw * flowerGeometry.size, dark, index)
  )
  paint(context, frame.bird, palette, options)
  const [billBase, billTip] = frame.beak
  context.strokeStyle = palette[KEYS[sceneColors.beak]]
  context.lineWidth = Math.max(0.5, cw * 0.07)
  context.lineCap = 'round'
  context.beginPath()
  context.moveTo(x + billBase[0] * cw, y + billBase[1] * ch)
  context.lineTo(x + billTip[0] * cw, y + billTip[1] * ch)
  context.stroke()
  // Keep the pupil dark in both themes; the beak uses lighter ink in dark mode.
  const ex = x + frame.eye[0] * cw,
    ey = y + frame.eye[1] * ch
  context.fillStyle = '#111827'
  context.beginPath()
  context.arc(ex, ey, cw * 0.3, 0, Math.PI * 2)
  context.fill()
  context.fillStyle = '#f3f4f6'
  context.beginPath()
  context.arc(ex - cw * 0.08, ey - cw * 0.09, cw * 0.07, 0, Math.PI * 2)
  context.fill()
  context.restore()
}
