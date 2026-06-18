---
name: blue-terminal-ascii-image-generator
description: Create or prompt raster images in a blue terminal ASCII-art, dot-matrix, CRT monitor, monospaced glyph mosaic, command-line poster, pixel dither, blue screen, or text-mode visual style. Use when the user asks for blue images that look like ASCII, terminal output, code rain, old computer screens, blue monochrome posters, glyph-built silhouettes, halftone dot figures, or the attached blue ASCII-like references. Pair with the imagegen skill for actual image generation. Do not use when the user needs literal copy-paste ASCII text art or exact readable text output.
---

# Blue Terminal ASCII Image Generator

Use this skill to create blue terminal and ASCII-like raster images: electric blue fields, white or cyan monospace glyphs, dot-matrix silhouettes, command-line poster layouts, CRT scanlines, and dense character textures.

This skill is for images that look built from text or terminal marks. If the user asks for actual plain-text ASCII art, create text directly instead of using this raster image style.

## Core Workflow

1. Identify the subject, target use, and aspect ratio.
2. Choose one terminal-image mode:
   - `glyph mosaic silhouette`
   - `dense ASCII poster`
   - `dot-matrix editorial graphic`
   - `CRT terminal screen`
   - `command-line credits poster`
3. Decide the glyph language: dots, circles, `0/1`, symbols, letters, command prompts, or mixed monospace fragments.
4. Keep exact text minimal. Put required exact copy outside the image when possible.
5. Build the prompt with the template below.
6. Use the `imagegen` skill and image generation tool when the user wants an actual image.
7. Inspect for subject readability, glyph density, text artifacts, crop safety, and unwanted branding.

## Visual System

Default palette:

- Background: saturated electric blue, royal blue, or deep terminal blue.
- Foreground: white, pale cyan, or low-opacity blue-white glyphs.
- Secondary tone: dimmer cyan for shadow regions and depth.
- Optional texture: CRT scanlines, phosphor bloom, grid noise, low-resolution pixel grain.

Glyph language:

- Use repeated monospace characters, circles, dots, small squares, `0`, `1`, `x`, `n`, brackets, slashes, underscores, and prompt markers.
- Create form through density changes, spacing, alignment, and character size.
- Use fewer, larger marks for social-card clarity; use dense micro-glyph fields only for posters or high-resolution images.
- Avoid long exact text unless it is large and central.

Composition:

- Make one strong subject silhouette or central cluster.
- Use negative blue space aggressively so the image does not become texture soup.
- For poster layouts, reserve a clean title or footer zone.
- For blog assets, generate portrait and wide versions separately when density or subject placement matters.

## Prompt Template

Use this when generating the image:

```text
Create a raster image in a blue terminal ASCII-art visual style.

Subject: [subject].
Mode: [glyph mosaic silhouette | dense ASCII poster | dot-matrix editorial graphic | CRT terminal screen | command-line credits poster].
Canvas: [aspect ratio, target use, crop constraints].
Composition: [subject placement, negative space, title/footer zones, focal point].
Glyph system: [dots/circles/0-1/letters/symbols/command prompts], arranged in a monospace grid, density forms the subject silhouette and shadows.
Palette: saturated electric blue background, white and pale cyan terminal glyphs, dim cyan secondary texture.
Texture: subtle CRT scanlines, pixel grid, low-resolution dither, phosphor glow, crisp monospaced marks.
Typography: only short large readable text if needed; avoid tiny exact copy.
Quality: high-resolution, graphic, sharp, poster-like, strong silhouette, intentional spacing.
Avoid: photorealistic rendering, gradients that obscure glyphs, random unreadable text, misspelled labels, brand logos, watermarks, signatures, cluttered noise.
```

## Mode Recipes

### Glyph Mosaic Silhouette

Use for hands, people, objects, animals, devices, or iconic single-subject graphics.

Build the subject from repeated dots, circles, or simple characters. Use larger and brighter glyphs on edges, smaller dim glyphs for internal shading, and clean blue negative space around the silhouette.

### Dense ASCII Poster

Use for cinematic, editorial, or music-poster-like compositions.

Create a field of monospace glyphs that forms a central burst, face, object, or scene. Add optional command-line footer blocks, but keep exact credits generic unless the user provides final copy.

### Dot-Matrix Editorial Graphic

Use for clean social or blog images like hands, documents, calendars, product icons, charts, and abstract metaphors.

Use large dot or circle marks instead of tiny letters. Keep the subject bold, legible, and minimal.

### CRT Terminal Screen

Use for cybersecurity, developer tools, old computers, data streams, monitoring dashboards, or retro computing.

Include scanlines, terminal window structure, cursor marks, prompts, blocky monospaced UI, and one clear focal output. Avoid real secrets, credentials, or identifiable account data.

### Command-Line Credits Poster

Use for poster-like images with metadata blocks, festival-poster inspiration, or text-mode title cards.

Use a large ASCII-built central form, a small terminal-style footer, and a few prompt lines such as `>RUN`, `>BUILD`, or `>TRACE`. Keep all exact copy supplied by the user outside the image unless it can be large and simple.

## Reference Image Handling

When the user provides reference images, use them for visual traits only.

Local sample reference images live in `references/`. Use these files directly when present:

- `references/dot-matrix-stair-figure.png`
- `references/dense-ascii-poster.png`
- `references/dot-matrix-hand-card.png`

If a listed file is missing, ask the user to add it or continue from the written style guidance only.

- Saturated blue background.
- White or cyan glyph-built subjects.
- Dot-matrix hands, figures, documents, or abstract clusters.
- Terminal-style footer blocks and monospaced prompt lines.
- CRT texture, scanlines, blue-screen feeling, and high-contrast negative space.

Do not copy specific poster titles, logos, credits, brand marks, or copyrighted layouts from references.

## Blog Asset Notes

For Ylang Labs blog visuals:

- Store final raster assets under `public/static/images/blogs/[slug]/`.
- Use descriptive filenames such as `terminal-glyph-map.png`, `ascii-system-poster.png`, or `dot-matrix-hand.png`.
- For a requested cover, generate separate portrait and wide compositions when possible, then use `blog-image-cropper` for:
  - `cardImage.png` at `1080x1920`
  - `blogHeader.png` at `1260x700`

This style can become illegible when blindly cropped, so prefer separate prompts for portrait and wide assets.

## Quality Checks

Before finalizing, verify:

- The image reads as blue terminal, ASCII, dot-matrix, or CRT style immediately.
- The subject silhouette remains clear at thumbnail size.
- Glyph density creates form rather than random visual noise.
- Any included text is short, large, and acceptable if imperfect.
- No logos, watermarks, signatures, or copied reference-poster credits appear.
- The composition has enough negative space for the target crop.
- Exact facts, numbers, and long copy are provided outside the image if needed.
