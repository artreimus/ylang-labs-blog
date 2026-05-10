# HyperFrames Blog Image Prompts

Generated with the built-in OpenAI `image_gen` path through the `technical-diagram-image-gen` workflow.

Generated originals were copied from:

- `/Users/artreimus/.codex/generated_images/019e112e-fcae-7c72-b18a-37d546ec0392/ig_082c2b5091fe0ab4016a0050ddb0a48191aca9f09379422252.png`
- `/Users/artreimus/.codex/generated_images/019e112e-fcae-7c72-b18a-37d546ec0392/ig_082c2b5091fe0ab4016a00518aa440819180afe268abc83ee8.png`

Workspace outputs:

- `public/static/images/blogs/hyperframes-html-video-for-ai-agents/source-diagram-header.png`
- `public/static/images/blogs/hyperframes-html-video-for-ai-agents/source-diagram-card.png`
- `public/static/images/blogs/hyperframes-html-video-for-ai-agents/blogHeader.png`
- `public/static/images/blogs/hyperframes-html-video-for-ai-agents/cardImage.png`

## Header Prompt

```text
Create a refined editorial technical diagram image for a Ylang Labs AI engineering blog.

Use case: infographic-diagram
Asset type: blog header source image for a technical article about HyperFrames turning HTML into deterministic video for AI agents.
Subject: HyperFrames architecture as an HTML-to-video render pipeline.
Diagram mode: process architecture sheet with a slight blueprint teardown feeling.
Canvas: wide blog header composition, approximately 16:9, crop-safe for 1260x700. Leave generous margins and keep important content away from the edges.
Palette: neutral warm paper background #F7F7F2, graphite ink #141414, muted ink #6F6F6A, faint construction grid #DCDCD4, Ylang Labs accents #EFC003 yellow and #75B34A green.
Composition: one clear left-to-right technical pipeline. A stylized browser DOM document on the left flows through compact modules for data attributes, frame adapters, deterministic frame clock, Chrome frame capture, FFmpeg encode, and output video frames on the right. Use ordered lanes, hairline dividers, thin arrows, dotted guide lines, and small circular callouts. Keep the center visually strong and the right side slightly lighter for responsive cropping.
Geometry: precise vector-like linework, thin strokes, orthographic construction, small arrows, bracket markers, timeline ticks, frame stack icons, and a faint grid. No glossy 3D.
Typography: Helvetica/Arial headings and monospace micro labels. If labels appear, keep them short and large enough to read: DOM, DATA, SEEK, FRAME, CHROME, FFMPEG, MP4. Avoid long sentences in the image.
Details: browser document with data-* attribute rows, paused timeline strip, adapter sockets, frame counter, Chrome capture aperture, encoder module, small filmstrip output. The image should communicate deterministic frame-by-frame video rendering for AI agents.
Style: clean technical manual, blueprint plate, product teardown, editorial design poster, restrained and premium.
Quality: high-resolution, crisp linework, balanced spacing, legible structure, no clutter, image-generation friendly labels.
Avoid: photorealistic 3D render, stock illustration, cartoon style, glossy gradients, messy handwriting, misspelled labels, random text, brand logos, watermarks, signatures, Sony or PlayStation branding.
```

## Card Prompt

```text
Create a refined editorial technical diagram image for a Ylang Labs AI engineering blog.

Use case: infographic-diagram
Asset type: portrait blog card source image for a technical article about HyperFrames turning HTML into deterministic video for AI agents.
Subject: HyperFrames as an agent-native HTML video engine.
Diagram mode: exploded technical plate combined with a black spec sheet, but keep it editorial and clean.
Canvas: portrait 9:16 blog card composition, crop-safe for 1080x1920. Strong central vertical structure, generous top and bottom breathing room, important content away from the edges.
Palette: near-black graphite background #0F0F0F with warm paper modules #F7F7F2, primary text #EDEDE8, muted text #8A8A86, Ylang Labs accents #EFC003 yellow and #75B34A green.
Composition: a vertical exploded stack showing an HTML document layer, data-* timing layer, frame adapter layer, deterministic frame clock, Chrome capture layer, FFmpeg encoding layer, and final film frame layer. Use precise vertical construction lines, small circular numbered callouts, bracket markers, timeline ticks, and restrained module labels. Make the central structure readable at card size.
Geometry: precise vector-like linework, thin strokes, orthographic/isometric hybrid construction, dashed guide lines, small arrows, frame stack icons, interface-module spec blocks. No glossy 3D.
Typography: Helvetica/Arial headings and monospace micro labels. If labels appear, keep them short and large enough to read: HTML, DATA, SEEK, FRAME, CHROME, FFMPEG, MP4. Avoid long sentences in the image.
Details: central module stack, tiny AI-agent cursor/controller glyph, paused GSAP-like timeline strip, frame counter, output filmstrip. The visual should communicate deterministic HTML-to-video rendering without relying on exact text.
Style: clean technical manual, blueprint plate, product teardown, editorial design poster, restrained and premium.
Quality: high-resolution, crisp linework, balanced spacing, legible structure, no clutter, image-generation friendly labels.
Avoid: photorealistic 3D render, stock illustration, cartoon style, glossy gradients, messy handwriting, misspelled labels, random text, brand logos, watermarks, signatures, Sony or PlayStation branding.
```

## Notes

The generated images include short diagram labels. Treat those labels as visual aids, not canonical documentation. The MDX article body carries the exact technical claims.
