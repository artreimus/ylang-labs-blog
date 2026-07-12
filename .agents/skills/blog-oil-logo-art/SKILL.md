---
name: blog-oil-logo-art
description: Create Ylang Labs blog cover packages that combine an original museum-quality oil painting with an exact official technology logo. Use this skill whenever a user asks for a source artwork, card image, blog header, cover image, social post image, or blog artwork that should place a real model, framework, product, or company logo over a painterly background. Generate the painting first, fetch the official logo separately, composite it after cropping, add the Ylang watermark, and validate every final asset.
---

# Oil-Painting Technology-Logo Blog Art

Use this skill for a repeatable Ylang Labs cover package with two independent layers:

1. An original oil-painting background that carries the article's metaphor.
2. An exact, separately sourced technology logo composited on top.

The separation matters. Image models are useful for atmosphere and composition, but they routinely distort brand marks and typography. Never ask the image model to invent or redraw the technology logo when an official asset can be sourced.

## Required outputs

For a normal blog cover request, create:

- `public/static/images/blogs/<slug>/source-artwork.png`: square `1:1` master painting, ideally `1536x1536` or larger.
- `public/static/images/blogs/<slug>/cardImage.png`: exactly `1080x1920` portrait crop.
- `public/static/images/blogs/<slug>/blogHeader.png`: exactly `1260x700` wide crop.

When the user asks for a social or square post image, also create:

- `public/static/images/blogs/<slug>/postImage.png`: exactly `1080x1080`.

Keep the official logo as `tech-logo.png` only when the asset is appropriate for repository distribution and the source log records its provenance. Otherwise keep it in an ignored temporary staging directory and commit only the composites.

## First steps

1. Work in the repository's existing checkout and preserve unrelated local changes. Do not create a worktree unless the user explicitly asks for one.
2. Read the target blog frontmatter and confirm the slug and expected `cardImage` and `images[0]` paths.
3. Inspect the current artwork and the closest visual reference with `view_image` before generating anything.
4. Read these supporting skills before acting:
   - `.agents/skills/oil-painting-image-generator/SKILL.md`
   - `.agents/skills/blog-image-cropper/SKILL.md`
   - `.agents/skills/blog-logo-watermark/SKILL.md`
   - the built-in `imagegen` skill for raster generation and save-path handling

If replacing an existing package, inspect the old source and crops first. Keep the old versions recoverable through Git or an explicitly untracked local backup; do not overwrite unrelated assets.

## Source painting

Generate the source artwork with the built-in image-generation tool through the oil-painting workflow.

The prompt should specify:

- The article's central metaphor, not a literal screenshot of the product.
- A clear composition that survives both portrait and landscape crops.
- The subject near the center with generous quiet space for a logo.
- A historically grounded oil-painting direction such as Baroque chiaroscuro, Romantic landscape, Dutch Golden Age interior, Symbolist allegory, or a restrained regional painting tradition.
- Specific lighting, palette, brushwork, materials, and mood.
- An explicit ban on text, logos, letters, numbers, signatures, watermarks, pseudo-text, UI panels, and copied famous compositions.

The square source master should normally remain unbranded. This keeps it reusable and prevents the logo from being cut off in the portrait crop. The logo is added separately to each final crop at a format-appropriate size.

Do not use a generated approximation of the technology logo. Do not ask the painting model to render a brand name.

## Find and validate the official logo

Use the product's official repository, documentation, media kit, or brand-assets page. Prefer a transparent PNG or SVG that can be rasterized cleanly.

Record:

- The exact source URL.
- The repository, organization, or publisher.
- The access/review date.
- Whether the asset is stored in the blog repository or only used as a temporary compositing input.

Validate the downloaded file before compositing:

- It is the intended product or framework mark.
- It has an alpha channel or a clean removable background.
- The aspect ratio and colors match the official asset.
- It contains no unintended browser chrome, screenshot frame, or surrounding page content.

If no official logo can be found, stop and ask the user whether to use a text-free symbolic mark or proceed without a logo. Do not invent a brand mark.

## Crop before logo compositing

Use `blog-image-cropper` to inspect the square master and choose separate crop windows:

- **Card:** crop a strong vertical composition at `1080x1920`. Keep the logo-safe center, the main visual metaphor, and enough context above and below. Avoid cutting important instruments, faces, or architectural edges.
- **Header:** crop a wide composition at `1260x700`. Preserve horizontal context and leave enough central negative space for the wordmark. Do not simply use the card crop resized wide.
- **Post image:** crop a square `1080x1080` composition when requested, usually centered on the logo-safe field and the strongest surrounding context.

Inspect each crop before adding the logo. The crop is the editorial composition; the logo should not be used to hide an accidental crop.

## Composite the technology logo

Use deterministic local raster compositing with `sharp`, ImageMagick, or an equivalent installed tool. Do not use image generation for this step.

For each target:

1. Resize the official logo proportionally. Never stretch it.
2. Place it in the intended focal area, usually centered over the prepared negative space.
3. Preserve comfortable clear space around the mark.
4. Use a subtle shadow or dark/light backing only when needed for contrast; do not add a competing badge or invented text.
5. Inspect at the final display size, especially the portrait card on a narrow screen.

Use different logo widths for different aspect ratios when necessary. A wordmark that fits a wide header may be too wide for a `9:16` card. If the official asset includes a full wordmark and an icon-only variant, choose the version that remains legible without crowding the composition.

The final logo must be visually exact. Check letterforms, spacing, icon geometry, color, and transparency against the downloaded source.

## Add the Ylang watermark

After the technology logo is composited, use `.agents/skills/blog-logo-watermark/scripts/apply-logo-watermark.mjs` for the Ylang mark:

```bash
node .agents/skills/blog-logo-watermark/scripts/apply-logo-watermark.mjs \
  --input public/static/images/blogs/<slug>/blogHeader.png \
  --output public/static/images/blogs/<slug>/blogHeader.png \
  --corner lower-right \
  --logo auto
```

Repeat for `cardImage.png` and the optional `postImage.png`. Do not watermark the square source master unless the user explicitly asks for a branded source master. Keep the Ylang mark subordinate to the technology logo and the painting.

## Provenance and frontmatter

Add the official logo URL and a short note about the generated artwork to `refs/<slug>/README.md` when a source packet exists. Do not store private prompt transcripts or temporary generated-image paths in the public source log.

The blog frontmatter should continue to reference:

```mdx
cardImage: '/static/images/blogs/<slug>/cardImage.png'
images: ['/static/images/blogs/<slug>/blogHeader.png']
```

The optional `postImage.png` is a supporting social asset and does not replace `cardImage.png` or `blogHeader.png`.

## Validation checklist

Before finalizing:

- `source-artwork.png` is square and retains the intended painterly composition.
- `cardImage.png` is exactly `1080x1920`.
- `blogHeader.png` is exactly `1260x700`.
- `postImage.png`, when requested, is exactly `1080x1080`.
- The official logo is not distorted, hallucinated, clipped, or replaced by generated text.
- The logo is legible at the final card/header display sizes.
- The Ylang watermark has contrast and does not cover important content.
- The source artwork contains no accidental text, signatures, or watermarks.
- All referenced image files exist under `public/static/images/blogs/<slug>/`.
- The MDX frontmatter points to the final files.
- `git diff --check` passes.
- Only task-owned assets, source-log entries, and frontmatter/components explicitly needed by the request are staged.

Visually inspect the source, card, header, and optional post image with `view_image`. If any crop or logo placement feels accidental, adjust the crop or composite and inspect again before committing.
