/* Adapted from ASCII Magic hummingbird-hibiscus, MIT © 2026 ASCII Magic.
 * https://github.com/kailashsr38/ascii-magic-art/blob/main/pieces/hummingbird-hibiscus.js
 * Changes: responsive scene layout; flower blooms are drawn from the Ylang Labs logo
 * by paint.js; separate botanical and bird layers. Original license: vendor/LICENSE.
 */
import { Grid, palette, gradient, KEYS, clamp, smooth, TAU } from './vendor/lib/kit.js'
import { flowerGeometry } from './flower-mask.js'

const P = []
const add = (c) => {
  const o = P.length
  P.push(...c)
  return o
}
const BIRD = add(gradient(['#0a3a2a', '#127a4a', '#24b064', '#6ae08a'], 6))
const THROAT = add(['#a8102a', '#ff2a5a', '#ff8ab0'])
const BELLY = add(['#9aa4a0', '#d8dcd4'])
const BEAK = add(['#1a1410', '#3a302a'])
const WING = add(['#4a6a5a', '#8aa89a', '#c4d8cc'])

export const sceneColors = {
  bird: BIRD,
  throat: THROAT,
  belly: BELLY,
  beak: BEAK,
  wing: WING,
}

export const meta = {
  slug: 'hummingbird-ylang',
  name: 'Hummingbird in the Ylang Garden',
  category: 'animals',
  note: 'A ruby-throated hummingbird hovers on blurred wings, sipping from one Ylang Labs flower and then darting across to the other.',
  tags: ['hummingbird', 'bird', 'flowers', 'garden', 'nature', 'hero'],
  cols: 88,
  rows: 32,
  fps: 30,
  palette: palette(P),
}

const PER = 9
const BIRD_SHAPE = {
  scale: 0.84,
  headX: 5.2,
  headY: -1.9,
  beakBaseX: 2.6,
  beakBaseY: 0.1,
  beakTipX: 11.6,
  beakTipY: 0.55,
}
export function getLayout(width, height, aspect) {
  const portrait = width / height < 0.95
  const cols = portrait ? 60 : Math.max(88, Math.ceil((32 * aspect * width) / height))
  const rows = Math.max(portrait ? 52 : 32, Math.ceil((cols * height) / (width * aspect)))
  return {
    cols,
    rows,
    aspect,
    flowers: portrait
      ? [
          { x: cols * 0.25, y: rows * 0.7, face: 1 },
          { x: cols * 0.75, y: rows * 0.3, face: -1 },
        ]
      : [
          { x: cols * 0.195, y: rows * 0.5625, face: 1 },
          { x: cols * 0.805, y: rows * 0.375, face: -1 },
        ],
  }
}

export default function create(layout) {
  const { cols, rows, flowers: FL } = layout
  const g = new Grid(cols, rows)
  const ell = (cx, cy, rx, ry, fn) => {
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++)
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
        const dx = (x + 0.5 - cx) / rx,
          dy = (y + 0.5 - cy) / ry,
          d = dx * dx + dy * dy
        if (d <= 1) fn(x, y, dx, dy, d)
      }
  }
  const flower = (f, t, i) => [
    f.x + Math.sin(t * 0.7 + i * 2) * 0.8,
    f.y + Math.sin(t * 0.5 + i) * 0.3,
  ]
  return (t) => {
    g.clear()
    const tips = FL.map((f, i) => flower(f, t, i))
    const cores = tips.map(([cx, cy]) => [
      cx + (flowerGeometry.core.x - 0.5) * flowerGeometry.size,
      cy + ((flowerGeometry.core.y - 0.5) * flowerGeometry.size) / layout.aspect,
    ])
    // flight plan: sip at A, dart to B, sip, dart back
    const p = ((t % PER) + PER) % PER
    const at = (k, back) => {
      const [cx, cy] = cores[k]
      const f = FL[k]
      const reach = (BIRD_SHAPE.headX + BIRD_SHAPE.beakTipX) * BIRD_SHAPE.scale
      const rise = (BIRD_SHAPE.headY + BIRD_SHAPE.beakTipY) * BIRD_SHAPE.scale
      return [cx + f.face * (reach + back), cy - rise]
    }
    let bx, by, face
    let feeding = null
    const sip = (k, u) => {
      // Three small sips. Even at full retraction the tip stays inside the core.
      const back = 0.85 * Math.pow(Math.cos(u * Math.PI * 3), 2)
      const [x, y] = at(k, back)
      return [x, y + Math.sin(u * TAU * 3) * Math.sin(u * Math.PI) * 0.12]
    }
    if (p < 3.4) {
      ;[bx, by] = sip(0, p / 3.4)
      face = -1
      feeding = 0
    } else if (p < 4.5) {
      const u = smooth((p - 3.4) / 1.1)
      const [x0, y0] = at(0, 0.85),
        [x1, y1] = at(1, 0.85)
      bx = x0 + (x1 - x0) * u
      by = y0 + (y1 - y0) * u - Math.sin(u * Math.PI) * 6
      face = 1
    } else if (p < 7.9) {
      ;[bx, by] = sip(1, (p - 4.5) / 3.4)
      face = 1
      feeding = 1
    } else {
      const u = smooth((p - 7.9) / 1.1)
      const [x0, y0] = at(1, 0.85),
        [x1, y1] = at(0, 0.85)
      bx = x0 + (x1 - x0) * u
      by = y0 + (y1 - y0) * u - Math.sin(u * Math.PI) * 4
      face = -1
    }
    // Positive d points the beak to the right; negative d points it to the left.
    const d = face
    const fl = Math.floor(t * 30) % 3
    const birdPoint = (x, y) => [bx + (x - bx) * BIRD_SHAPE.scale, by + (y - by) * BIRD_SHAPE.scale]
    const birdSet = (x, y, ch, color) => g.set(...birdPoint(x, y), ch, color)
    // wings behind body: blurred previous stroke, then current stroke
    const wing = (up, k, ch) => {
      const tipx = bx - d * 3.5,
        tipy = by + (up ? -8 : 4.5)
      for (let s = 0; s <= 1; s += 0.12) {
        const x = bx + (tipx - bx) * s,
          y = by - 0.8 + (tipy - by + 0.8) * s
        const w = 2.4 * Math.sin(Math.PI * Math.min(1, s * 1.1 + 0.1))
        for (let o = -w; o <= w; o += 1) birdSet(x + o - d * s, y, ch, KEYS[WING + k])
      }
    }
    wing(fl !== 0, 0, '░')
    // tail
    for (let k = 1; k <= 7; k++) {
      birdSet(bx - d * (5 + k), by + 0.8 + k * 0.4, k > 4 ? '▀' : '█', KEYS[BIRD + (k > 4 ? 0 : 1)])
      birdSet(bx - d * (5 + k), by + 1.8 + k * 0.4, '▀', KEYS[BIRD])
    }
    birdSet(bx - d * 12, by + 3.6, '▀', KEYS[BEAK])
    ell(bx, by, 6, 2.4, (x, y, dx, dy) => {
      const belly = dy > 0.25
      birdSet(
        x,
        y,
        '█',
        belly
          ? KEYS[BELLY + (dy > 0.6 ? 0 : 1)]
          : KEYS[BIRD + Math.min(5, Math.floor(clamp(0.7 - dy * 0.6 + dx * d * 0.2) * 6))]
      )
    })
    const hx = bx + d * BIRD_SHAPE.headX,
      hy = by + BIRD_SHAPE.headY
    ell(hx, hy, 3.2, 1.9, (x, y, dx, dy) =>
      birdSet(x, y, '█', dy > 0.3 ? KEYS[THROAT + (dx * d > 0 ? 1 : 0)] : KEYS[BIRD + 3])
    )
    // current wing in front
    wing(fl === 0, 2, fl === 0 ? '▓' : '▒')
    const beak = [
      birdPoint(hx + d * BIRD_SHAPE.beakBaseX, hy + BIRD_SHAPE.beakBaseY),
      birdPoint(hx + d * BIRD_SHAPE.beakTipX, hy + BIRD_SHAPE.beakTipY),
    ]
    // Anchor the tip vertically while the body bobs. Painting this precise line
    // avoids character-cell rounding moving the tip back onto a petal.
    if (feeding !== null) beak[1][1] = cores[feeding][1]
    const eye = birdPoint(hx + d, hy - 0.6).map((coordinate) => Math.floor(coordinate) + 0.5)
    return { bird: g.frame(), flowers: tips, cores, eye, beak, feeding, time: t }
  }
}
