---
name: blog-logo-watermark
description: Add Ylang Labs black or white logo watermarks to blog source artwork and derived cover assets. Use when a user asks to watermark Ylang Labs blog images, apply the Ylang Labs logo mark, choose a black or white logo by local contrast, or prepare source, header, and card assets with the brand mark.
---

# Blog Logo Watermark

Use this skill to place the Ylang Labs logo on blog artwork without cropping or resizing the artwork itself.

The bundled script uses:

- `assets/logo-black.png`
- `assets/logo-white.png`
- `scripts/apply-logo-watermark.mjs`

## Defaults

- Target images: watermark the square source master (`source-artwork.png` when present, otherwise `source-image.png`) and each requested derived cover asset. For a complete cover package, verify `blogHeader.png` and `cardImage.png` each contain exactly one mark after cropping.
- Local backup: before overwriting a source master, create an unwatermarked sibling backup named `<source-stem>-no-watermark.png` when one does not already exist. This backup is for local recovery only; never stage or commit it unless the user explicitly asks.
- Placement: lower-left.
- Logo choice: `auto`, based on contrast sampled from the image area where the logo will land.
- Logo width: `6.5%` of the image width, clamped for blog artwork.
- Margin: `2%` of the image width, with the script's minimum edge-safe padding.
- Opacity: `0.95`.

Use black logos on light local backgrounds and white logos on dark local backgrounds. If the user asks for a specific color, pass `--logo black` or `--logo white`.

## Workflow

1. Identify each target image.

   Default Ylang Labs blog targets are:

   - `public/static/images/blogs/<slug>/source-artwork.png` (preferred when present), or `source-image.png`
   - `public/static/images/blogs/<slug>/blogHeader.png`
   - `public/static/images/blogs/<slug>/cardImage.png` when preparing a complete cover package

   When the user asks to watermark a blog, a blog slug, blog artwork, or a provided blog source image, apply the watermark to the source master and requested derivatives. A crop near the edge can remove the source watermark, so inspect each derivative and add one lower-left watermark pass only when needed. Never leave duplicate marks.

   Source images are uncropped. Blog headers are already cropped. Do not crop, resize, or reframe either one when applying the watermark.

2. Create the local source-master backup.

   If the source master will be overwritten, first preserve the unwatermarked version as:

   - `public/static/images/blogs/<slug>/source-artwork-no-watermark.png`, or
   - `public/static/images/blogs/<slug>/source-image-no-watermark.png`

   If the working source master is already watermarked, recover the unwatermarked source from the last clean source available, such as git history, another source artwork file, or a user-provided original. If no clean source is available, tell the user instead of creating a backup that still contains the watermark.

   Keep this backup untracked and out of commits. It exists only for local rollback and future crop/watermark adjustments.

3. Inspect the target image when composition matters.

   Prefer a clean corner where the logo does not cover a face, diagram label, important object, or dense text. Use the lower-left edge by default unless the user or existing art direction calls for a different corner.

   If the image already has a Ylang Labs logo, do not add a duplicate mark unless the user explicitly asks for a second placement or replacement.

4. Run the script.

   ```bash
   node .agents/skills/blog-logo-watermark/scripts/apply-logo-watermark.mjs \
     --input public/static/images/blogs/<slug>/source-artwork.png \
     --output public/static/images/blogs/<slug>/source-artwork.png \
     --corner lower-left \
     --logo auto
   ```

   For a non-destructive preview, write to a temp output path instead of overwriting the input.

5. Repeat for derived cover assets that do not retain the source mark.

   ```bash
   node .agents/skills/blog-logo-watermark/scripts/apply-logo-watermark.mjs \
     --input public/static/images/blogs/<slug>/blogHeader.png \
     --output public/static/images/blogs/<slug>/blogHeader.png \
     --corner lower-left \
     --logo auto
   ```

   Use the same command for `cardImage.png` when the card crop excludes the source watermark. Inspect first and never add a second mark to a derivative that already contains one.

6. Verify the outputs.

   - Confirm dimensions stayed unchanged.
   - Visually inspect both images.
   - Confirm the chosen black/white logo has readable contrast.
   - Re-run with `--logo black`, `--logo white`, a different `--corner`, or a smaller `--scale` if the automatic result covers important content.
   - Confirm the matching `<source-stem>-no-watermark.png` exists locally when a source master was overwritten, and confirm it is not staged.

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
- The matching `<source-stem>-no-watermark.png` is present as an untracked local backup when a source master was overwritten.
