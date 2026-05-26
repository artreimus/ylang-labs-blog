---
name: blog-logo-watermark
description: Add Ylang Labs black or white logo watermarks to blog source images, `source-image.png`, `blogHeader.png`, and other blog artwork. Use when a user asks to watermark Ylang Labs blog images, apply the Ylang Labs logo mark, choose a black or white logo by local contrast, or prepare source/header assets with the brand mark.
---

# Blog Logo Watermark

Use this skill to place the Ylang Labs logo on blog artwork without cropping or resizing the artwork itself.

The bundled script uses:

- `assets/logo-black.png`
- `assets/logo-white.png`
- `scripts/apply-logo-watermark.mjs`

## Defaults

- Placement: lower-left.
- Logo choice: `auto`, based on contrast sampled from the image area where the logo will land.
- Logo width: `6.5%` of the image width, clamped for blog artwork.
- Margin: `4.2%` of the image width.
- Opacity: `0.95`.

Use black logos on light local backgrounds and white logos on dark local backgrounds. If the user asks for a specific color, pass `--logo black` or `--logo white`.

## Workflow

1. Identify each target image.

   Typical Ylang Labs blog targets are:

   - `public/static/images/blogs/<slug>/source-image.png`
   - `public/static/images/blogs/<slug>/blogHeader.png`

   Source images are uncropped. Blog headers are already cropped. Do not crop, resize, or reframe either one when applying the watermark.

2. Inspect the target image when composition matters.

   Prefer a clean corner where the logo does not cover a face, diagram label, important object, or dense text. Use lower-left unless the user or existing art direction calls for a different corner.

   If the image already has a Ylang Labs logo, do not add a duplicate mark unless the user explicitly asks for a second placement or replacement.

3. Run the script.

   ```bash
   node .agents/skills/blog-logo-watermark/scripts/apply-logo-watermark.mjs \
     --input public/static/images/blogs/<slug>/source-image.png \
     --output public/static/images/blogs/<slug>/source-image.png \
     --corner lower-left \
     --logo auto
   ```

   For a non-destructive preview, write to a temp output path instead of overwriting the input.

4. Repeat for `blogHeader.png`.

   ```bash
   node .agents/skills/blog-logo-watermark/scripts/apply-logo-watermark.mjs \
     --input public/static/images/blogs/<slug>/blogHeader.png \
     --output public/static/images/blogs/<slug>/blogHeader.png \
     --corner lower-left \
     --logo auto
   ```

5. Verify the outputs.

   - Confirm dimensions stayed unchanged.
   - Visually inspect both images.
   - Confirm the chosen black/white logo has readable contrast.
   - Re-run with `--logo black`, `--logo white`, a different `--corner`, or a smaller `--scale` if the automatic result covers important content.

## Script Options

```bash
node .agents/skills/blog-logo-watermark/scripts/apply-logo-watermark.mjs --help
```

Important options:

- `--input <path>`: source image.
- `--output <path>`: output image. May equal `--input` for in-place replacement.
- `--corner lower-left|lower-right|upper-left|upper-right`: placement corner.
- `--logo auto|black|white`: logo color selection.
- `--scale <number>`: logo width as a fraction of image width.
- `--margin <number>`: margin as a fraction of image width.
- `--opacity <number>`: logo opacity from `0` to `1`.

## Quality Bar

Before finalizing:

- The image dimensions are exactly the same before and after watermarking.
- The logo is in the requested corner, lower-left by default.
- The logo does not cover important subject matter or readable text.
- The selected logo color is visibly legible against the local background.
- Only the intended blog image files are changed.
