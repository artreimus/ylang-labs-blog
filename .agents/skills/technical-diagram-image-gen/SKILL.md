---
name: technical-diagram-image-gen
description: Create beautiful, repeatable image-generation prompts and raster images for Ylang Labs technical blog posts. Use this skill when the user asks for blog images, cover art, card images, headers, inline technical diagrams, exploded views, blueprint diagrams, architecture plates, process maps, system diagrams, product-teardown visuals, spec sheets, or OpenAI image-generation prompts in the clean editorial technical style of the provided reference images. Always pair generation with OpenAI's `imagegen` skill and the latest official GPT Image / ChatGPT image generation path; do not create SVG/vector/code-native diagram sources as part of this skill unless the user explicitly asks for manual vector work.
---

# Technical Diagram Image Generation

Use this skill to create technical diagram imagery for Ylang Labs posts using OpenAI image generation: clean, precise, editorial, and repeatable. The output should feel like a technical manual, blueprint plate, museum catalog, and engineering blog cover had the same design system.

The reference standard comes from the attached images used to author this skill: exploded product diagrams, a blue floppy-disk teardown plate, a black interface-module spec sheet, a restrained brand-process diagram, and a large editorial process poster. Do not copy the Sony/PlayStation branding or any specific protected product marks from the references; reuse only the visual language.

## Core Rule

Use OpenAI image generation as the production path.

- Use OpenAI image generation through the `imagegen` skill with a strict prompt and then inspect the result.
- Keep exact text out of the image when possible. Put exact labels, numbers, citations, and long captions in the MDX body or `DiagramSubtitle`.
- When labels are necessary inside the image, keep them short, large, and redundant with the surrounding caption because image-generation models can still make text and layout mistakes.
- Repeatability comes from a normalized prompt recipe, fixed diagram mode, fixed palette, explicit canvas target, and a saved final prompt, not from generated SVG/vector sources.
- For Ylang Labs blog cover/card assets, generate a high-resolution source image first, then use `blog-image-creator` to produce `cardImage.png` and `blogHeader.png` unless the user explicitly asks for a single target image.

## OpenAI Imagegen Pairing

When this skill uses raster image generation, pair it with the OpenAI `imagegen` skill instead of inventing a separate image-generation workflow.

Default behavior:

- Use the built-in `image_gen` tool through the `imagegen` skill for normal ChatGPT/Codex image generation and editing.
- If the user explicitly asks for direct OpenAI API or CLI model control, check official OpenAI docs first and use the latest listed GPT Image model. As of 2026-05-07, the official OpenAI image generation guide identifies `gpt-image-2` as the latest GPT Image model.
- For Responses API / ChatGPT-style hosted image generation, use a text-capable model that supports the hosted `image_generation` tool; the image generation process itself is handled by GPT Image models.
- Re-check official OpenAI docs before changing model names in durable code or docs when the user asks for "latest" or "current." If local bundled tool defaults conflict with official docs, treat official docs as the source of truth and mention the conflict.
- Do not downgrade to an older GPT Image model unless there is a specific capability reason or the `imagegen` skill requires a fallback for a capability such as native transparency.

OpenAI's GPT Image models are appropriate for polished source plates, style exploration, and blog-ready technical visuals. Since image models can still struggle with exact text placement and precise structured layouts, design prompts so the image communicates the structure visually while the article text carries exact claims.

## Default Visual System

Default palette:

- Paper: `#F7F7F2`
- Ink: `#141414`
- Muted ink: `#6F6F6A`
- Grid: `#DCDCD4`
- Default accent: cobalt blueprint blue `#245BFF`
- Accent fill: use the accent at 12-28% opacity

Color adaptation:

- If the user requests a color, treat that as the accent and rebuild the palette around it.
- Keep the paper, ink, grid, and muted tones neutral unless the user asks for a full theme.
- For dark technical plates, use background `#0F0F0F`, primary text `#EDEDE8`, muted text `#8A8A86`, linework `#4F4F4C`, and the requested accent for highlights.
- For Ylang-branded diagrams, prefer `#EFC003` yellow or `#75B34A` green as accents, but do not force them when the requested concept benefits from another color.

Typography:

- Use Helvetica/Arial for editorial labels and headings.
- Use a monospace face for callouts, figure IDs, dimensions, protocol labels, and small technical annotations.
- Use uppercase sparingly for plate labels such as `FIG_001`, `SYSTEM MAP`, `MODULE 04`, or `TRACE ROUTE`.
- Keep labels short. If a label needs a sentence, put it in a caption outside the image.

Linework:

- Use thin, deliberate lines: 0.75-1.5px for detailed diagrams, 2px only for primary outlines.
- Prefer strokes, dotted construction grids, dashed guide lines, circular numbered callouts, small arrows, and precise leader lines.
- Use subtle flat fills only to separate layers or emphasize one active component.
- Avoid glossy 3D, stock gradients, heavy shadows, noisy textures, skeuomorphic rendering, and decorative glow fields.

Composition:

- Leave generous negative space.
- Make one strong central structure: exploded stack, architecture core, process lane, radial map, or spec module.
- Align labels to an invisible grid. Do not scatter callouts randomly.
- Use large editorial typography only when the image is poster-like; keep inline diagrams quieter.
- Maintain legibility in both wide blog headers and portrait cards. Dense labels usually need separate compositions, not a blind crop.

## Diagram Modes

Pick one mode before generating.

### Exploded Technical Plate

Use for infrastructure layers, agent runtime stacks, hardware metaphors, model pipelines, product internals, and component maps.

Visual traits:

- Isometric or pseudo-isometric exploded layers.
- Thin graphite or cobalt outlines.
- Vertical construction lines connecting layers.
- Numbered callouts around the object.
- One accent-filled active layer.
- Sparse component legend in the lower corner.

### Blueprint Teardown

Use for data flows, protocol internals, storage layouts, model serving paths, and "how it works" diagrams.

Visual traits:

- Off-white paper with a faint dotted grid.
- Cobalt linework by default.
- Monospace labels and arrows.
- Flat geometric parts with one translucent accent fill.
- Figure ID on one edge, rotated side title when useful.

### Black Spec Sheet

Use for dramatic post headers, productized modules, AI-agent systems, interface cards, and launch visuals.

Visual traits:

- Near-black background.
- Large alphanumeric module mark, such as `S7`, `RAG 04`, or `EVAL 01`.
- Ghosted fine-line central object.
- Small spec blocks for inputs, latency, power, memory, protocol, or model.
- Very restrained accent color.

### Process Architecture Sheet

Use for research workflows, brand/process maps, evaluation loops, multi-agent handoffs, and system lifecycle diagrams.

Visual traits:

- White or gray paper.
- Horizontal lanes or stacked sections separated by hairline dividers.
- Circles, boxes, dotted boxes, arrows, and arcs.
- Numbered stages and concise bilingual-style micro labels if requested.
- High orderliness, low decoration.

### Editorial Framework Poster

Use for big conceptual frameworks, double-diamond-like diagrams, matrices, roadmaps, and technical essays that need a hero image.

Visual traits:

- Oversized title typography.
- Large geometric diagram occupying the lower half.
- Thin rules, large arcs, and small labels.
- Muted gray background or clean white canvas.
- Strong hierarchy between title, metadata row, and diagram.

## Prompt Template

Use this with the OpenAI `imagegen` skill when generating a raster image:

```text
Create a refined editorial technical diagram image for a Ylang Labs AI engineering blog.

Subject: [technical subject].
Diagram mode: [exploded technical plate | blueprint teardown | black spec sheet | process architecture sheet | editorial framework poster].
Canvas: [aspect ratio and target use, e.g. 1260x700 blog header, 1080x1920 card, square inline plate].
Palette: neutral paper background, graphite ink, faint construction grid, accent color [requested color or default cobalt #245BFF].
Composition: [central structure, label placement, negative space, hierarchy].
Geometry: precise vector-like linework, thin strokes, isometric or orthographic construction, dashed guide lines, small arrows, circular numbered callouts.
Typography: Helvetica/Arial headings, monospace technical labels, short readable labels only.
Details: [components, layers, data paths, modules, callouts].
Style: clean technical manual, blueprint plate, product teardown, editorial design poster, restrained and premium.
Quality: high-resolution, crisp linework, balanced spacing, legible structure, no clutter, image-generation friendly labels.
Avoid: photorealistic 3D render, stock illustration, cartoon style, glossy gradients, messy handwriting, misspelled labels, random text, brand logos, watermarks, signatures.
```

If the user requests a specific color, replace `default cobalt #245BFF` with that color and adjust fills, arrows, and highlight elements around it.

## Repeatability Pattern

Use this pattern for each requested image so future runs can reproduce the same design direction.

1. Define a compact diagram spec:
   - `title`
   - `subtitle` or `figureId`
   - `mode`
   - `canvas`
   - `palette`
   - `visual structure`
   - `allowed short labels`
   - `avoid list`
   - `assetPath`
2. Convert the spec into the prompt template.
3. Use the `imagegen` skill to generate the raster image.
4. Inspect the output visually for style fit, legibility, label quality, crop safety, and hallucinated marks.
5. Iterate with one targeted prompt correction at a time.
6. Save the final prompt or prompt set in the task response, a plan, or a project note when the user needs reproducibility.

## Blog Asset Workflow

1. Identify the blog slug and image target.
2. Choose the diagram mode and accent color.
3. Generate the source image with OpenAI `imagegen`:
   - `public/static/images/blogs/[slug]/source-diagram.png` for reusable source artwork, or
   - a descriptive inline asset name such as `architecture-teardown.png`.
4. For cover assets, use `blog-image-creator` to create:
   - `public/static/images/blogs/[slug]/cardImage.png` at exactly `1080x1920`
   - `public/static/images/blogs/[slug]/blogHeader.png` at exactly `1260x700`
5. Confirm the MDX frontmatter references:
   - `cardImage: '/static/images/blogs/[slug]/cardImage.png'`
   - `images: ['/static/images/blogs/[slug]/blogHeader.png']`

For dense technical diagrams, prefer generating separate portrait and wide compositions instead of cropping one diagram into both formats.

## Quality Checks

Before finalizing, verify:

- The image follows one selected diagram mode rather than mixing styles randomly.
- The requested or default accent color is used consistently.
- Text is readable at final size, and exact claims are repeated in nearby article text or captions.
- Lines are crisp and intentional.
- Important content is not near crop edges.
- The design feels like an editorial technical plate, not a SaaS marketing illustration.
- Final blog assets have exact required dimensions when `cardImage.png` or `blogHeader.png` are produced.

State any limitation clearly, especially if image generation produced imperfect text or if a source image is too dense for a single blog-card crop.
