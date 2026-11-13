// Botanical halftone geometry. Cache the dot paths at each size; only the breeze
// transforms change during animation. Empty space always stays transparent.
const cache = new WeakMap()
const STEP = 0.38
const TAU = Math.PI * 2
const colors = {
  light: ['#2f4423', '#354f25', '#3e6229', '#507f31', '#75b34a', '#87bb60'],
  dark: ['#354f25', '#3e6229', '#507f31', '#75b34a', '#87bb60', '#a7d086'],
}

function makeSprig(anchor, phase, depth, bounds, build) {
  const paths = colors.light.map(() => new Path2D())
  const dot = (x, y, radius, shade) => {
    // Taper the stippling at the artwork edges rather than cropping leaves flat.
    const px = anchor[0] + x,
      py = anchor[1] + y
    const fade = Math.max(
      0,
      Math.min(1, px / 2, (bounds[0] - px) / 2, py / 2, (bounds[1] - py) / 4)
    )
    radius *= fade
    if (radius < 0.012) return
    const path = paths[Math.max(0, Math.min(5, Math.round(shade)))]
    path.moveTo(x + radius, y)
    path.arc(x, y, radius, 0, TAU)
  }
  const leaf = (ax, ay, bx, by, width, bend = 0, shade = 3) => {
    const vx = bx - ax,
      vy = by - ay,
      length = Math.hypot(vx, vy)
    const margin = width + Math.abs(bend)
    for (let y = Math.min(ay, by) - margin; y <= Math.max(ay, by) + margin; y += STEP) {
      for (let x = Math.min(ax, bx) - margin; x <= Math.max(ax, bx) + margin; x += STEP) {
        const u = ((x - ax) * vx + (y - ay) * vy) / (length * length)
        if (u <= 0 || u >= 1) continue
        const normal = ((x - ax) * -vy + (y - ay) * vx) / length - bend * Math.sin(u * Math.PI)
        const half = width * Math.pow(Math.sin(u * Math.PI), 0.85) * (1 - u * 0.18)
        const edge = 1 - Math.abs(normal) / half
        if (edge <= 0) continue
        const midrib = Math.abs(normal) < 0.13
        const vein = Math.abs(((u * 7 - Math.abs(normal) * 0.24) % 1) - 0.5) < 0.055
        const light = shade - (normal / half) * 0.8 + (midrib ? 1.1 : vein ? 0.55 : 0)
        const texture = Math.sin(x * 2.3 + y * 3.7 + phase) * 0.1
        dot(x, y, (0.115 + edge * 0.055 + texture * 0.1) * Math.min(1, edge * 4), light)
      }
    }
  }
  const curve = (ax, ay, bx, by, bend, shade = 2) => {
    const vx = bx - ax,
      vy = by - ay,
      length = Math.hypot(vx, vy)
    const at = (u) => [
      ax + vx * u - (vy / length) * bend * Math.sin(u * Math.PI),
      ay + vy * u + (vx / length) * bend * Math.sin(u * Math.PI),
    ]
    for (let u = 0; u <= 1; u += STEP / length) {
      const [x, y] = at(u)
      dot(x, y, 0.07 + (1 - u) * 0.025, shade)
    }
    return at
  }
  const branch = (bx, by, bend, count, length, width, shade = 3) => {
    const at = curve(0, 0, bx, by, bend, shade - 1)
    for (let i = 0; i < count; i++) {
      const u = 0.16 + (i / count) * 0.76
      const [ax, ay] = at(u)
      const next = at(Math.min(1, u + 0.02))
      const dx = next[0] - ax,
        dy = next[1] - ay,
        magnitude = Math.hypot(dx, dy)
      const side = i % 2 ? 1 : -1
      const size = length * (1 - u * 0.48) * (1 + Math.sin(i * 2.7 + phase) * 0.14)
      const tx = ax + ((dx * 0.5 - dy * side) / magnitude) * size,
        ty = ay + ((dy * 0.5 + dx * side) / magnitude) * size
      leaf(ax, ay, tx, ty, width * (1 - u * 0.5), side * size * 0.1, shade + (i % 3) * 0.3)
    }
    const [ax, ay] = at(0.86)
    leaf(ax, ay, bx * 1.08, by * 1.08, width * 0.58, 0.2, shade + 0.6)
  }
  build({ leaf, curve, branch })
  return { anchor, phase, depth, paths }
}

function createFoliage(layout) {
  const { cols: w, rows, aspect, flowers } = layout
  const h = rows * aspect
  const portrait = w / h < 0.95
  const sprigs = []
  const add = (x, y, phase, depth, build) =>
    sprigs.push(makeSprig([x, y], phase, depth, [w, h], build))

  // Broad, quieter leaves create depth behind the sharper edge plants.
  add(w * 0.035, h * 0.93, 1, 'far', ({ branch }) => branch(w * 0.025, -h * 0.62, 3, 8, 13, 3.5, 2))
  add(w * 0.97, h * 1.03, 4, 'far', ({ branch }) => branch(-w * 0.045, -h * 0.53, -3, 7, 14, 4, 2))
  add(w * 0.39, -h * 0.12, 9, 'far', ({ branch }) => branch(w * 0.17, h * 0.25, 2, 7, 8, 2.2, 2.8))
  // Distant branches carry the garden through the open middle of the artwork.
  // Their translucent dots add foliage without painting a background surface.
  if (portrait) {
    add(w * 0.35, h * 1.07, 10, 'far', ({ branch }) =>
      branch(w * 0.12, -h * 0.45, -2, 8, 8, 2.2, 2.8)
    )
    add(-3, h * 0.13, 11, 'far', ({ branch }) => branch(w * 0.46, h * 0.31, 3, 8, 6.8, 1.7, 2.6))
  } else {
    add(w * 0.5, h * 1.08, 10, 'far', ({ branch }) =>
      branch(-w * 0.07, -h * 0.57, -3, 9, 9, 2.2, 2.8)
    )
    add(w * 0.69, -h * 0.1, 11, 'far', ({ branch }) =>
      branch(-w * 0.11, h * 0.46, 3, 9, 7.5, 1.8, 2.8)
    )
    add(w * 1.03, h * 0.5, 12, 'far', ({ branch }) => branch(-w * 0.29, h * 0.15, -2, 8, 8, 2, 2.6))
  }
  if (!portrait) {
    add(w * 0.32, h * 1.1, 3, 'far', ({ branch }) => branch(-6, -h * 0.35, -3, 6, 10, 3.1, 2))
    add(w * 0.71, h * 1.08, 7, 'far', ({ branch }) => branch(7, -h * 0.34, 2, 6, 11, 3, 2))
  }

  // Asymmetric overhanging sprigs frame the upper corners without a dot field.
  add(-2, h * 0.035, 5, 'edge', ({ branch }) =>
    branch(w * (portrait ? 0.32 : 0.24), h * 0.12, -2, 7, portrait ? 7 : 8.5, 1.8, 2.7)
  )
  add(w + 3, -2, 2, 'edge', ({ branch }) =>
    branch(-w * (portrait ? 0.2 : 0.16), h * 0.1, 1.2, 5, 7, 1.9, 3)
  )

  // Larger tropical leaves at the lower edges, plus fine fern-like fronds.
  add(-3, h + 2, 2, 'edge', ({ branch }) => branch(w * 0.16, -h * 0.23, -2, 7, 11.5, 3, 3.2))
  add(w + 2, h + 3, 6, 'edge', ({ branch }) => branch(-w * 0.14, -h * 0.28, 2, 7, 12, 3.2, 3.5))
  add(w * (portrait ? 0.12 : 0.37), h + 3, 1, 'edge', ({ branch }) =>
    branch(portrait ? 5 : 8, -h * 0.29, 2, 16, 5, 0.8, 3)
  )
  add(w * (portrait ? 0.94 : 0.66), h + 3, 8, 'edge', ({ branch }) =>
    branch(-6, -h * 0.24, -1.5, 14, 4.5, 0.75, 3.6)
  )

  // The flowering stems and their leaves move with the logo blooms.
  flowers.forEach((f, i) => {
    const height = h + 3 - f.y * aspect
    add(f.x, f.y * aspect, i * 2, i, ({ curve, leaf }) => {
      const at = curve(-f.face * 4, height, 0, 10.5, -f.face * 1.8, 3)
      const count = portrait ? 6 : 4
      for (let k = 0; k < count; k++) {
        const u = 0.14 + (k / count) * 0.64
        const [ax, ay] = at(u)
        const side = (k % 2 ? 1 : -1) * f.face
        const length = 10 + Math.sin(k * 2.5 + i) * 1.5
        leaf(ax, ay, ax + side * length, ay - length * 0.5, 2.6, side * 0.7, 3.3)
      }
    })
  })
  return sprigs
}

export function drawFoliage(context, layout, { x, y, cw, dark, time, flowers }) {
  let sprigs = cache.get(layout)
  if (!sprigs) {
    sprigs = createFoliage(layout)
    cache.set(layout, sprigs)
  }
  const palette = colors[dark ? 'dark' : 'light']
  context.save()
  context.translate(x, y)
  context.scale(cw, cw)
  for (const sprig of sprigs) {
    context.save()
    const bloom = typeof sprig.depth === 'number' ? flowers[sprig.depth] : null
    const [ax, ay] = bloom ? [bloom[0], bloom[1] * layout.aspect] : sprig.anchor
    context.translate(ax, ay)
    // One slow gust passes through the garden, with a smaller local flutter.
    const breeze =
      Math.sin(time * 0.33 - (ax / layout.cols) * 2.4) * 0.012 +
      Math.sin(time * 0.71 + sprig.phase) * 0.003
    context.rotate(breeze * (bloom ? 0.35 : sprig.depth === 'far' ? 0.7 : 1))
    context.globalAlpha = sprig.depth === 'far' ? (dark ? 0.38 : 0.28) : 1
    sprig.paths.forEach((path, shade) => {
      context.fillStyle = palette[shade]
      context.fill(path)
    })
    context.restore()
  }
  context.restore()
}
