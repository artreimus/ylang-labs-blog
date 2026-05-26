---
name: blog-logo-watermark
description: Add Ylang Labs black or white logo watermarks to blog `source-image.png` and `blogHeader.png` assets by default, plus other blog artwork when requested. Use when a user asks to watermark Ylang Labs blog images, apply the Ylang Labs logo mark, choose a black or white logo by local contrast, or prepare source/header assets with the brand mark.
---

# Blog Logo Watermark

Use this skill to place the Ylang Labs logo on blog artwork without cropping or resizing the artwork itself.

The bundled script uses:

- `assets/logo-black.png`
- `assets/logo-white.png`
- `scripts/apply-logo-watermark.mjs`

## Defaults

- Target images: watermark both `source-image.png` and `blogHeader.png` when they exist for a blog slug.
- Local backup: before overwriting `source-image.png`, create an unwatermarked sibling backup named `source-image-no-watermark.png` when one does not already exist. This backup is for local recovery only; never stage or commit it unless the user explicitly asks.
- Placement: lower-right.
- Logo choice: `auto`, based on contrast sampled from the image area where the logo will land.
- Logo width: `6.5%` of the image width, clamped for blog artwork.
- Margin: `4.2%` of the image width.
- Opacity: `0.95`.

Use black logos on light local backgrounds and white logos on dark local backgrounds. If the user asks for a specific color, pass `--logo black` or `--logo white`.

## Workflow

1. Identify each target image.

   Default Ylang Labs blog targets are:

   - `public/static/images/blogs/<slug>/source-image.png`
   - `public/static/images/blogs/<slug>/blogHeader.png`

   When the user asks to watermark a blog, a blog slug, blog artwork, or a provided blog source image, apply the watermark to both default targets if both files exist. Do not stop after watermarking only one of them unless the user explicitly asks for a single file.

   Source images are uncropped. Blog headers are already cropped. Do not crop, resize, or reframe either one when applying the watermark.

2. Create the local source-image backup.

   If `source-image.png` will be overwritten, first preserve the unwatermarked version as:

   - `public/static/images/blogs/<slug>/source-image-no-watermark.png`

   If the working `source-image.png` is already watermarked, recover the unwatermarked source from the last clean source available, such as git history, another source artwork file, or a user-provided original. If no clean source is available, tell the user instead of creating a backup that still contains the watermark.

   Keep this backup untracked and out of commits. It exists only for local rollback and future crop/watermark adjustments.

3. Inspect the target image when composition matters.

   Prefer a clean corner where the logo does not cover a face, diagram label, important object, or dense text. Use lower-right unless the user or existing art direction calls for a different corner.

   If the image already has a Ylang Labs logo, do not add a duplicate mark unless the user explicitly asks for a second placement or replacement.

4. Run the script.

   ```bash
   node .agents/skills/blog-logo-watermark/scripts/apply-logo-watermark.mjs \
     --input public/static/images/blogs/<slug>/source-image.png \
     --output public/static/images/blogs/<slug>/source-image.png \
     --corner lower-right \
     --logo auto
   ```

   For a non-destructive preview, write to a temp output path instead of overwriting the input.

5. Repeat for `blogHeader.png`.

   ```bash
   node .agents/skills/blog-logo-watermark/scripts/apply-logo-watermark.mjs \
     --input public/static/images/blogs/<slug>/blogHeader.png \
     --output public/static/images/blogs/<slug>/blogHeader.png \
     --corner lower-right \
     --logo auto
   ```

6. Verify the outputs.

   - Confirm dimensions stayed unchanged.
   - Visually inspect both images.
   - Confirm the chosen black/white logo has readable contrast.
   - Re-run with `--logo black`, `--logo white`, a different `--corner`, or a smaller `--scale` if the automatic result covers important content.
   - Confirm `source-image-no-watermark.png` exists locally when `source-image.png` was overwritten, and confirm it is not staged.

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
- The logo is in the requested corner, lower-right by default.
- The logo does not cover important subject matter or readable text.
- The selected logo color is visibly legible against the local background.
- Only the intended blog image files are changed.
- `source-image-no-watermark.png` is present as an untracked local backup when source-image was overwritten.
