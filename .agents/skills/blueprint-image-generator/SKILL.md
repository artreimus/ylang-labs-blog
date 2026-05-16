---
name: blueprint-image-generator
description: Create or prompt raster images in a blueprint, engineering drawing, patent plate, CAD sheet, technical schematic, architectural plan, orthographic drawing, exploded-view diagram, or white-line-on-blue visual style. Use when the user asks for blueprint-style cover art, blog images, product diagrams, technical plates, measurement callouts, construction grids, white linework on cobalt or cyan blue paper, or visual references like engineering schematics. Pair with the imagegen skill for actual image generation. Do not use for exact production CAD, legally precise measurements, logos, or text-heavy diagrams that must be perfectly readable.
---

# Blueprint Image Generator

Use this skill to create refined blueprint-style raster image prompts and images. The output should feel like a technical drawing, patent plate, architectural plan, or exploded engineering schematic rendered as clean white or pale cyan linework on deep blue paper.

This is a style skill, not a precision CAD workflow. For exact claims, labels, dimensions, equations, and citations, put the authoritative text in the surrounding article, caption, or MDX body.

## Core Workflow

1. Identify the subject, target use, and aspect ratio.
2. Choose one blueprint mode:
   - `orthographic specification sheet`
   - `isometric exploded blueprint`
   - `architectural plan and elevation`
   - `patent-style technical plate`
   - `food or object decomposition blueprint`
   - `software architecture blueprint`
3. Decide whether the image should be mostly visual or include a few short labels.
4. Build a prompt with the template below.
5. Use the `imagegen` skill and image generation tool when the user wants an actual image.
6. Inspect the result for line clarity, crop safety, text quality, and unwanted logos or watermarks.
7. Iterate with one focused correction at a time.

## Visual System

Default palette:

- Background: deep blueprint blue, cobalt, navy, or cyanotype blue.
- Linework: white, pale cyan, or slightly aged blueprint ink.
- Secondary marks: faint blue grid, dotted construction lines, translucent guide arcs.
- Optional paper texture: subtle cyanotype grain, folded-paper wear, light drafting smudges.

Line language:

- Use thin, precise linework with consistent stroke weight.
- Use cross-section hatching, contour lines, dashed hidden edges, dimension arrows, leader lines, circular callouts, and registration marks.
- Prefer orthographic, isometric, exploded, or cutaway geometry over painterly rendering.
- Keep perspective deliberate and diagrammatic. Avoid photorealistic 3D.

Typography:

- Use monospace or narrow drafting labels.
- Keep labels short: `INPUT`, `LAYER 02`, `MODEL CORE`, `TOP VIEW`, `SECTION A-A`.
- Avoid long sentences inside the image. Use captions outside the image for exact language.

## Prompt Template

Use this when generating the image:

```text
Create a refined blueprint-style technical image.

Subject: [subject].
Blueprint mode: [orthographic specification sheet | isometric exploded blueprint | architectural plan and elevation | patent-style technical plate | food or object decomposition blueprint | software architecture blueprint].
Canvas: [aspect ratio, target use, and crop constraints].
Composition: [main view, secondary inset views, negative space, label zones].
Linework: crisp white technical drafting lines on deep cobalt blueprint paper, thin strokes, dashed hidden edges, dimension arrows, leader lines, cross-section hatching, faint construction grid.
Details: [components, layers, callouts, exploded parts, measurements, section cuts].
Typography: sparse monospace drafting labels only, large enough to read, no long text blocks.
Texture: subtle cyanotype paper grain, faint fold marks, clean archival blueprint finish.
Quality: high-resolution raster image, precise geometry, balanced spacing, strong silhouette, no clutter.
Avoid: photorealistic rendering, glossy 3D, colorful gradients, messy handwriting, incorrect brand logos, watermarks, signatures, tiny unreadable text.
```

## Mode Recipes

### Orthographic Specification Sheet

Use for manufactured objects, devices, vehicles, bottles, tools, interface modules, or product studies.

Include a large front view, smaller side/top/bottom views, dimension arrows, section labels, and a simple title block. Keep all text generic unless the user supplies final copy.

### Isometric Exploded Blueprint

Use for layered systems, sandwiches, model pipelines, runtime stacks, hardware internals, or product teardown visuals.

Place parts in a vertical or diagonal stack with dashed alignment guides. Use numbered callouts, section hatching, and one clear axis of separation.

### Architectural Plan And Elevation

Use for spaces, buildings, rooms, physical installations, maps, or infrastructure metaphors.

Combine plan view, elevation view, dimension strings, grid coordinates, wall outlines, and small legend marks.

### Patent-Style Technical Plate

Use for invention-like objects, mechanisms, algorithms expressed as machines, or conceptual frameworks.

Use numbered parts, precise outline drawings, multiple views, and minimal annotation. Keep it more archival than decorative.

### Software Architecture Blueprint

Use for AI systems, RAG pipelines, agent loops, service maps, data flows, or deployment diagrams.

Represent services as modules, buses, layers, queues, and ports. Use short labels and arrows, but keep exact API names and long claims in the surrounding text.

## Reference Image Handling

When the user provides reference images, use them for style analysis and composition cues only. Do not reproduce protected logos, brand marks, poster credits, or identifiable proprietary layouts unless the user explicitly owns the rights and asks for a close adaptation.

Local sample reference images live in `references/`. Use these files directly when present:

- `references/toy-figure-orthographic-blueprint.png`
- `references/exploded-sandwich-blueprint.png`
- `references/beverage-bottle-spec-blueprint.png`

If a listed file is missing, ask the user to add it or continue from the written style guidance only.

Extract reusable traits such as:

- Deep blue field with white drafting lines.
- Dense but ordered construction grid.
- Orthographic or exploded decomposition.
- Dimension arrows, cross-sections, title blocks, and small insets.
- Cyanotype paper texture and precise engineering geometry.

## Blog Asset Notes

For Ylang Labs blog visuals:

- Store final raster assets under `public/static/images/blogs/[slug]/`.
- For inline diagrams, use descriptive filenames such as `system-blueprint.png`, `architecture-blueprint.png`, or `runtime-exploded-view.png`.
- For a requested blueprint cover, generate separate portrait and wide compositions when possible, then use `blog-image-cropper` for:
  - `cardImage.png` at `1080x1920`
  - `blogHeader.png` at `1260x700`

Do not force blueprint style for normal blog covers unless the user requests it. The default cover-art path may still be `oil-painting-image-generator`.

## Quality Checks

Before finalizing, verify:

- The image reads as a blueprint immediately.
- The subject is clear at thumbnail size.
- Linework is crisp and not overgrown with random marks.
- Labels are sparse and readable, or omitted if the model mangled text.
- Important content is away from crop edges.
- No unwanted logos, signatures, watermarks, or copied reference-brand marks appear.
- Exact claims and measurements are repeated outside the image if they matter.
