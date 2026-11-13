import createScene, { getLayout, meta } from '../../../public/ascii/ylang-garden/scene.js'
import { cellAspect } from '../../../public/ascii/ylang-garden/vendor/runtime/canvas.js'
import { flowerMask, flowerGeometry } from '../../../public/ascii/ylang-garden/flower-mask.js'

const mask = Uint8Array.from(atob(flowerMask.mask), (character) => character.charCodeAt(0))

describe('ASCII garden feeding motion', () => {
  it.each([
    { width: 1440, height: 780 },
    { width: 390, height: 724 },
  ])('keeps the beak inside each flower core at $width × $height', ({ width, height }) => {
    const layout = getLayout(width, height, cellAspect(meta))
    const draw = createScene(layout)

    for (const [flower, start] of [0, 4.5].entries()) {
      for (const phase of [0, 0.15, 0.5, 0.85, 0.999]) {
        const frame = draw(start + phase * 3.4)
        const [cx, cy] = frame.cores[flower]
        const [tipX, tipY] = frame.beak[1]
        const distance = Math.hypot(tipX - cx, (tipY - cy) * layout.aspect)

        expect(frame.feeding).toBe(flower)
        expect(distance).toBeLessThan(1)
        const [fx, fy] = frame.flowers[flower]
        const u = (tipX - fx) / flowerGeometry.size + 0.5
        const v = ((tipY - fy) * layout.aspect) / flowerGeometry.size + 0.5
        const cell =
          Math.floor(v * flowerMask.rows) * flowerMask.cols + Math.floor(u * flowerMask.cols)
        // Check the official logo mask as well as the geometric target.
        expect(mask[cell]).toBeLessThan(32)
        // The middle sip reaches the center, rather than stopping on a petal.
        if (phase === 0.5) expect(distance).toBeLessThan(0.001)
      }
    }
  })
})
