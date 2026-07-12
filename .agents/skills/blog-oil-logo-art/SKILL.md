---
name: blog-oil-logo-art
description: Create Ylang Labs blog cover packages that combine an original museum-quality oil painting with an exact official technology logo. Use this skill whenever a user asks for a source artwork, card image, blog header, cover image, social post image, or blog artwork that should place a real model, framework, product, or company logo over a painterly background. Generate the painting first, fetch the official logo separately, composite it onto the square source image, derive the crops, add the Ylang watermark, and validate every final asset.
---

# Oil-Painting Technology-Logo Blog Art

Use this skill for a repeatable Ylang Labs cover package with two independent layers:

1. An original oil-painting background that carries the article's metaphor.
2. An exact, separately sourced technology logo composited on top.

The separation matters. Image models are useful for atmosphere and composition, but they routinely distort brand marks and typography. Never ask the image model to invent or redraw the technology logo when an official asset can be sourced.

## Required outputs

For a normal blog cover request, create:

- `public/static/images/blogs/<slug>/source-artwork.png`: square `1:1` master image containing the generated painting **and the exact technology-logo overlay**, ideally `1536x1536` or larger. If the target slug already uses the repository's `source-image.png` convention, use that name consistently instead.
- `public/static/images/blogs/<slug>/cardImage.png`: exactly `1080x1920` portrait crop.
- `public/static/images/blogs/<slug>/blogHeader.png`: exactly `1260x700` wide crop.

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

## Source painting and branded master

Generate an unbranded square painting as a temporary intermediate with the built-in image-generation tool through the oil-painting workflow. Then composite the official technology logo onto that square image and save the result as the committed `source-artwork.png` (or the established `source-image.png`). This branded square is the reusable source image for every downstream crop; there is no separate `postImage.png` output.

The prompt should specify:

- The article's central metaphor, not a literal screenshot of the product.
- A clear composition that survives both portrait and landscape crops.
- The subject near the center with generous quiet space for a logo.
- A historically grounded oil-painting direction such as Baroque chiaroscuro, Romantic landscape, Dutch Golden Age interior, Symbolist allegory, or a restrained regional painting tradition.
- Specific lighting, palette, brushwork, materials, and mood.
- An explicit ban on text, logos, letters, numbers, signatures, watermarks, pseudo-text, UI panels, and copied famous compositions.

The square branded source master must keep the logo inside a crop-safe focal area so it survives both portrait and landscape derivatives. Do not add a second technology-logo overlay to the card or header after cropping unless the source logo would otherwise become illegible; prefer cropping the already-branded source to avoid duplicate or inconsistent marks.

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

Use `blog-image-cropper` to inspect the branded square master and choose separate crop windows:

- **Card:** crop a strong vertical composition at `1080x1920`. Keep the logo-safe center, the main visual metaphor, and enough context above and below. Avoid cutting important instruments, faces, or architectural edges.
- **Header:** crop a wide composition at `1260x700`. Preserve horizontal context and leave enough central negative space for the wordmark. Do not simply use the card crop resized wide.
  Inspect each crop after deriving it. The crop is the editorial composition; the logo should not be used to hide an accidental crop.

## Composite the technology logo

Use deterministic local raster compositing with `sharp`, ImageMagick, or an equivalent installed tool. Do not use image generation for this step.

For the square source image:

1. Resize the official logo proportionally. Never stretch it.
2. Place it in the intended focal area, usually centered over the prepared negative space.
3. Preserve comfortable clear space around the mark.
4. Use a subtle shadow or dark/light backing only when needed for contrast; do not add a competing badge or invented text.
5. Inspect at the final display size, especially the portrait card on a narrow screen.

Use a logo size that remains legible in the source image and survives both downstream crops. If the official asset includes a full wordmark and an icon-only variant, choose the version that remains legible without crowding the composition.

The final logo must be visually exact. Check letterforms, spacing, icon geometry, color, and transparency against the downloaded source.

## Add the Ylang watermark

After the technology logo is composited, use `.agents/skills/blog-logo-watermark/scripts/apply-logo-watermark.mjs` for the Ylang mark on the branded source image:

```bash
node .agents/skills/blog-logo-watermark/scripts/apply-logo-watermark.mjs \
  --input public/static/images/blogs/<slug>/source-artwork.png \
  --output public/static/images/blogs/<slug>/source-artwork.png \
  --corner lower-right \
  --logo auto
```

Then derive `cardImage.png` and `blogHeader.png` from the branded source, preserving the logo and Ylang mark. Do not add another Ylang watermark pass to the crops unless the crop removes the source watermark or the user explicitly requests per-format watermark placement. Keep the Ylang mark subordinate to the technology logo and the painting.

## Provenance and frontmatter

Whenever an official logo is used, create and commit `refs/<slug>/README.md` as the source log, even if the slug did not already have a reference packet. Include the logo's exact source URL, repository/organization or publisher, access/review date, whether the asset is committed or temporary, and a short note about the generated artwork. This makes the provenance of the embedded mark auditable. Do not store private prompt transcripts or temporary generated-image paths in the public source log.

The blog frontmatter should continue to reference:

```mdx
cardImage: '/static/images/blogs/<slug>/cardImage.png'
images: ['/static/images/blogs/<slug>/blogHeader.png']
```

The square source image is the supporting social asset; do not create a redundant `postImage.png` copy.

## Validation checklist

Before finalizing:

- `source-artwork.png` (or the established `source-image.png`) is square, branded with the exact technology logo, and retains the intended painterly composition.
- `cardImage.png` is exactly `1080x1920`.
- `blogHeader.png` is exactly `1260x700`.
- The official logo is not distorted, hallucinated, clipped, or replaced by generated text.
- The logo is legible at the final card/header display sizes.
- The Ylang watermark has contrast and does not cover important content on the branded source and its crops.
- The source artwork contains no accidental text, signatures, or watermarks.
- All referenced image files exist under `public/static/images/blogs/<slug>/`.
- The MDX frontmatter points to the final files.
- `refs/<slug>/README.md` records provenance for every official logo used.
- `git diff --check` passes.
- Only task-owned assets, source-log entries, and frontmatter/components explicitly needed by the request are staged.

Visually inspect the branded source, card, and header with `view_image`. If any crop or logo placement feels accidental, adjust the source composition or crop and inspect again before committing.
