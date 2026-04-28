---
name: blog-image-creator
description: Crop and prepare provided source images for Ylang Labs blog artwork, especially `cardImage.png` and `blogHeader.png`, for posts in the ylang-labs-blog project. Use this skill whenever the user provides an image and asks to make blog images, crop blog artwork, create a card image, create a blog header, resize a header, fit an image to blog requirements, or update article thumbnails. The agent must visually analyze the provided picture first and choose the best crop for each required aspect ratio instead of blindly center-cropping.
---

# Blog Image Creator

Use this skill to turn a provided source image into the two required Ylang Labs blog assets:

- `public/static/images/blogs/[slug]/cardImage.png`
- `public/static/images/blogs/[slug]/blogHeader.png`

If the user says `static/images/blogs`, use the repo path `public/static/images/blogs`.

## Required Outputs

Create both files unless the user explicitly asks for only one:

- `cardImage.png`: exactly `1080x1920`, portrait.
- `blogHeader.png`: exactly `1260x700`, wide banner.

Use PNG. Keep filenames exact because blog frontmatter expects these names.

## Core Rule

Do not blindly resize or center-crop.

First inspect the provided image, understand what matters visually, then choose the crop window that best preserves the image's story for each format.

The two crops may use different focal regions:

- The card image needs a strong vertical composition and can crop tighter.
- The blog header needs a wide composition with the main subject readable across a banner.

## Visual Analysis Checklist

Before editing, inspect the source image with `view_image` or another visual inspection path. Identify:

- Main subject: person, object, document, diagram, scene, UI, logo, or central metaphor.
- Secondary subject: supporting context that should remain visible if possible.
- Directionality: where faces, figures, arrows, screens, or lines point.
- Text: labels or titles that must remain readable.
- Empty space: areas useful for breathing room or responsive cropping.
- Edge hazards: important details near image borders that may be cut off.
- Brand fit: whether the image already follows the house style.

For Ylang Labs blog art, the preferred house style remains a beautiful painting-like background with a central conceptual illustration or diagram. When the provided image already has that structure, preserve it. When it does not, still crop it cleanly; do not invent new artwork unless the user asks for generation.

## Crop Strategy

### `cardImage.png` crop

Target: `1080x1920` (`9:16`).

Choose a portrait crop that:

- Keeps the main subject between the upper-middle and center.
- Preserves enough surrounding context to make the image feel intentional.
- Avoids cutting through faces, diagrams, titles, icons, logos, hands, or important object edges.
- Keeps readable text large enough for blog card use.
- Uses vertical space well; if the source is wide, choose the strongest vertical slice rather than shrinking the full image with padding.

Good card crops often place the subject slightly above center with supporting detail below.

### `blogHeader.png` crop

Target: `1260x700` (`1.8:1`).

Choose a wide crop that:

- Keeps the main subject centered or slightly left of center.
- Preserves horizontal context and scene depth.
- Leaves the bottom-right reasonably clean when possible for brand mark visibility.
- Avoids cropping important text or diagrams at the top and bottom.
- Keeps the result useful as a responsive blog banner.

Good header crops often show more environment than the card crop.

## When the Source Aspect Ratio Fights the Target

Use judgment instead of forcing a bad crop:

- If a wide source must become a portrait card, crop around the strongest subject cluster.
- If a portrait source must become a wide header, crop around the subject and accept losing vertical detail.
- If cropping would destroy the image, create a tasteful extended canvas using blurred, darkened, or painterly background fill from the source image, then place the uncropped image region over it.
- Avoid plain white padding unless the source image already has a clean white/editorial layout.

## Workflow

1. Identify inputs.

   - Determine the blog slug from the MDX path or user prompt.
   - Determine the source image path from the user-provided file or existing blog asset.
   - If an MDX file exists, read its frontmatter to confirm expected output paths.

2. Inspect the source image.

   - Open it visually.
   - Note the focal subject, important text, and likely crop hazards.
   - Decide separate crop positions for card and header.

3. Create the crops.

   - Prefer deterministic tooling such as `sharp`, ImageMagick, or `sips`.
   - Use object-position / gravity only after deciding the crop direction from visual analysis.
   - Do not upscale tiny sources aggressively unless there is no better input.

4. Save outputs.

   - Ensure `public/static/images/blogs/[slug]/` exists.
   - Save the portrait crop as `cardImage.png`.
   - Save the wide crop as `blogHeader.png`.

5. Verify.
   - Confirm exact dimensions with `sips -g pixelWidth -g pixelHeight` or equivalent.
   - Visually inspect both final images.
   - Re-crop if the subject is awkwardly cut off, text is unreadable, or the composition feels accidental.

## Sharp Implementation Pattern

Use this pattern when `sharp` is available. Adjust `position`, `left`, or `top` based on the visual analysis.

```js
const sharp = require('sharp')

async function cropCover(input, output, width, height, position) {
  await sharp(input)
    .resize(width, height, {
      fit: 'cover',
      position,
      withoutEnlargement: false,
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(output)
}

await cropCover(sourceImage, `${outDir}/cardImage.png`, 1080, 1920, 'attention')
await cropCover(sourceImage, `${outDir}/blogHeader.png`, 1260, 700, 'attention')
```

Do not assume `attention` is always correct. It is a starting point. If the image has known focal placement, use positions like `north`, `south`, `east`, `west`, or a manual extract crop.

## Manual Crop Pattern

Use manual crop rectangles when the automatic crop misses the subject.

```js
await sharp(sourceImage)
  .extract({ left, top, width, height })
  .resize(1080, 1920)
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(`${outDir}/cardImage.png`)
```

Pick `left`, `top`, `width`, and `height` from the source image dimensions after visual inspection.

## Quality Bar

Before finalizing, confirm:

- `cardImage.png` is exactly `1080x1920`.
- `blogHeader.png` is exactly `1260x700`.
- Both outputs come from the provided image.
- The card crop and header crop are intentionally chosen for their different aspect ratios.
- Main subjects, labels, and diagrams are not accidentally cut off.
- Text remains readable where text matters.
- The final files live under `public/static/images/blogs/[slug]/`.

Mention any limitation clearly, such as a source image that is too low-resolution, too wide for a good card crop, or too portrait-oriented for a good header crop.
