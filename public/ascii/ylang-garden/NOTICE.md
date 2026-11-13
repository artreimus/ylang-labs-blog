# Ylang ASCII garden

The hummingbird, foliage, and halftone renderer derive from [ASCII Magic](https://www.ascii-magic.com/ascii/hummingbird-hibiscus), copyright 2026 ASCII Magic, under the [MIT license](vendor/LICENSE).

Upstream source: https://github.com/kailashsr38/ascii-magic-art

Vendored Git blob revisions:

- `runtime/canvas.js`: `a908954e30ce41960ee9eb3e1b179b6e0aeeb984`
- `runtime/glyphs.js`: `7ace43f2376a150f56895266daad2f9823ab4f94`
- `lib/kit.js`: `41d246df3e4563583b1eaaadd993238e4f8fd26a`
- Scene adapted from `pieces/hummingbird-hibiscus.js`: `e7a7801f600fda104b6989cccab151de7872bec9`

Local changes separate the bird and plant layers, replace the hibiscus blooms with a mask sampled from `public/static/images/logo-icon-light.svg`, add a portrait composition, original layered botanical dot paths in `foliage.js` (broad leaves, veins, hanging sprigs, fine fronds, edge fading, and cached breeze transforms), transparent theme-aware painting and alpha WebP fallbacks, and manage responsive sizing, reduced motion, visibility, and cleanup. The homepage presents the art without visible controls. All runtime files are served locally; no external embed script is loaded.

Visual references reviewed for the final polish were [Firefly Meadow](https://www.ascii-magic.com/ascii/fireflies), [Wind Through Grass](https://www.ascii-magic.com/ascii/wind-grass), and [Fern Fractal](https://www.ascii-magic.com/ascii/fern-fractal). The local warm motes, shared breeze, petal shading, cached flower paths, pupil/catchlight rendering, and core-aligned feeding path are original adaptations; no additional upstream source files were copied.

`flowerGeometry` records the size and measured center of the logo’s hollow core. Feeding poses and the precise bill stroke share that geometry, so the bird follows the moving core rather than a petal.

The centered wordmark uses only the lettering path from `public/static/images/logo-light.svg`, cropped into `wordmark.svg`. Its dotted treatment is a transparent CSS mask in `AsciiHero.tsx`; the flower icon is excluded from this wordmark.
