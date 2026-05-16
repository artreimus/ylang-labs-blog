---
name: scientific-blueprint-poster-image-generator
description: Create or prompt raster images in the style of white-on-blue scientific blueprint posters like planetary atlas sheets, particle-accelerator diagrams, technical graph-paper boards, measurement-heavy educational posters, engineering-map plates, and cyanotype science infographics. Use when the user provides or requests images similar to deep cobalt graph-paper posters with crisp white linework, large titles, framed borders, inset maps, cross-sections, title blocks, legends, tables, leader lines, and sparse drafting labels. Pair with the imagegen skill for actual image generation. Do not use for exact production CAD, legally precise measurements, logos, or text-heavy diagrams that must be perfectly readable.
---

# Scientific Blueprint Poster Image Generator

Use this skill to create raster images or image-generation prompts in the specific style of dense scientific blueprint posters: deep cobalt graph paper, crisp white technical linework, framed layout, inset diagrams, measurement arrows, and short drafting labels.

This is a style and composition skill, not a precision CAD or factual diagramming workflow. Put exact numbers, citations, equations, and long labels in the surrounding article text, caption, or MDX body unless the user provides final short values and accepts image-text risk.

## Core Workflow

1. Identify the subject, target use, and aspect ratio.
2. Choose one poster mode:
   - `planetary atlas sheet`
   - `particle accelerator map`
   - `scientific infrastructure board`
   - `technical specimen plate`
   - `system topology poster`
   - `engineering education chart`
3. Decide the visual hierarchy: one dominant subject plus supporting insets.
4. Keep text sparse. Use short labels only; move exact claims outside the image.
5. Build a prompt with the template below.
6. Use the `imagegen` skill and image generation tool when the user wants an actual image.
7. Inspect the result for line clarity, crop safety, label quality, and unwanted logos or watermarks.
8. Iterate with one focused correction at a time.

## Reference Style

The target style is defined by the bundled sample images:

- Planetary atlas reference: `references/earth-atlas-blueprint.png`
- Infrastructure map reference: `references/large-hadron-collider-blueprint.png`

If additional samples are added later, use the same folder with clear kebab-case names and prefer the complete local reference set over memory of a chat attachment.

Analyze the reference files for these traits:

- Deep saturated cobalt or cyanotype-blue background.
- Dense graph-paper grid with lighter minor subdivisions and heavier major grid lines.
- Thin white or pale-cyan technical linework, with no full-color rendering.
- Large outer border frame and smaller title blocks or specification tables.
- One dominant technical subject, such as a globe, loop, facility, specimen, network, or system map.
- Supporting insets: cross-sections, maps, small charts, exploded details, legends, route diagrams, or data panels.
- Drafting marks: dimension arrows, leader lines, registration ticks, coordinate marks, contour lines, hatching, and dashed construction lines.
- Typography: uppercase poster title, narrow sans or monospace labels, compact table text, sparse numeric callouts.
- Mood: archival, rational, technical, educational, information-dense, and diagrammatic.

Use these traits as style cues only. Do not copy protected logos, exact poster layouts, or identifiable third-party branding from references.

## Prompt Template

Use this when generating the image:

```text
Create a white-on-cobalt scientific blueprint poster image.

Subject: [subject].
Poster mode: [planetary atlas sheet | particle accelerator map | scientific infrastructure board | technical specimen plate | system topology poster | engineering education chart].
Canvas: [aspect ratio, target use, and crop constraints].
Composition: one dominant central technical subject, framed border, deep blue graph-paper background, supporting inset panels, title block, sparse label zones, balanced negative space.
Linework: crisp white technical drafting lines, thin strokes, faint minor grid, heavier major grid lines, dashed construction guides, leader lines, dimension arrows, cross-section hatching, contour lines, small registration marks.
Details: [maps, cross-sections, loop paths, tables, legends, measurement callouts, exploded details, or data panels].
Typography: sparse uppercase drafting labels and short monospace annotations only, large enough to read, no long text blocks.
Texture: subtle cyanotype paper grain, clean archival blueprint finish, slight drafting-paper wear.
Quality: high-resolution raster image, precise vector-like geometry, strong central silhouette, ordered dense detail, readable at thumbnail size.
Avoid: photorealistic rendering, glossy 3D, colorful gradients, messy handwriting, copied logos, copied third-party marks, watermarks, signatures, tiny unreadable paragraphs, exact numeric claims unless supplied.
```

## Poster Modes

### Planetary Atlas Sheet

Use for planets, moons, satellites, orbital systems, geospatial data, weather systems, and large scientific objects.

Include a large central globe or object, graticule lines, orbit or radius indicators, small composition panels, surface or atmosphere boxes, a compact title block, and a few leader lines. Keep exact measurements outside the image unless the user supplies them.

### Particle Accelerator Map

Use for accelerators, collider rings, tunnels, beamlines, scientific facilities, transit-like technical systems, and loop-based infrastructure.

Use one large schematic loop or path, labeled nodes, directional arrows, injector lines, station markers, a cross-section inset, a location-map inset, and a lower-corner specification table.

### Scientific Infrastructure Board

Use for data centers, observatories, sensor networks, cloud regions, robotics labs, deployment topology, and physical or digital infrastructure.

Combine a central map or topology with inset cross-sections, route lines, signal arrows, small legends, and title-block metadata.

### Technical Specimen Plate

Use for biological systems, artifacts, machines, chips, molecules, tools, and object studies.

Show a dominant specimen silhouette with contour lines, sectional cuts, magnified details, scale bars, and compact callout panels.

### System Topology Poster

Use for AI systems, agent loops, RAG pipelines, evaluation harnesses, distributed services, and model-serving systems.

Translate software into physical blueprint grammar: nodes, rings, buses, routes, ports, memory panels, trace paths, and cross-section modules. Keep API names and exact metrics in captions unless labels are short and necessary.

### Engineering Education Chart

Use for explanatory posters that teach how a system works.

Arrange the subject into a large central mechanism, side labels, numbered insets, simplified data boxes, and an orderly title block. Prioritize clarity over dense decoration.

## Ylang Labs Blog Asset Notes

For Ylang Labs blog visuals:

- Store final raster assets under `public/static/images/blogs/[slug]/`.
- Use descriptive inline filenames such as `scientific-blueprint-system-map.png`, `accelerator-style-agent-loop.png`, or `planetary-atlas-architecture.png`.
- Treat inline diagrams and cover assets as separate surfaces. Do not update `cardImage.png` or `blogHeader.png` unless the user explicitly asks for cover assets.
- `blogHeader.png` and the first section image do not need to match. Do not reuse, crop, or derive the header from section 1 artwork unless the user explicitly asks for that relationship.

## Reference Image Handling

Before generating or prompting, inspect the relevant bundled reference images when they exist:

- Use `references/earth-atlas-blueprint.png` for globe, atlas, specimen, data-sheet, and dominant-object poster compositions.
- Use `references/large-hadron-collider-blueprint.png` for facility, infrastructure, route-map, topology, and multi-inset system-board compositions.
- Use both when the user asks broadly for this skill's scientific blueprint poster style.

When the user provides additional reference images, analyze style and composition only. Do not reproduce protected logos, brand marks, poster credits, exact titles, or identifiable proprietary layouts unless the user explicitly owns the rights and asks for a close adaptation.

When the user asks for prompt starters or wants the style adapted to AI engineering subjects, read `references/prompt-starters.md`.

## Quality Checks

Before finalizing, verify:

- The result reads immediately as a white-on-blue scientific blueprint poster.
- The central subject is clear at thumbnail size.
- Dense grid detail stays orderly rather than noisy.
- Labels are sparse and readable, or omitted if generated text is poor.
- Important content is away from crop edges.
- No unwanted logos, signatures, watermarks, or copied reference-brand marks appear.
- Exact claims and measurements are repeated outside the image if they matter.
