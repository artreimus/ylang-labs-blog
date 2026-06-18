---
name: technical-blog-image-review
description: Review generated technical blog images for Ylang Labs using an independent subagent. Use this skill when the user asks to review, critique, validate, fact-check, QA, or improve generated blog images, technical diagrams, card images, blog headers, architecture plates, process maps, or AI-generated visuals for factuality, technical accuracy, image quality, visual design, beauty, readability, MDX fit, and source-backed correctness.
---

# Technical Blog Image Review

Use this skill to run an independent review of generated Ylang Labs technical blog images before publishing or reusing them. The review should check both truth and presentation: whether the image accurately represents the article's technical claims, whether it is visually strong, and whether it will work in the blog layout.

## Core Rule

Use a subagent for the review when the user explicitly asks for an independent review, subagent review, second pass, or when a workflow says image output needs independent review before finalization.

The subagent should receive only the needed task context:

- Local image path or paths to inspect.
- The associated MDX/blog file path, slug, title, caption, surrounding section, or intended placement.
- The review goal: factuality, technical accuracy, image quality, visual design, readability, and concrete recommendations.
- Any user-specified audience, visual style, target dimensions, or publishing constraints.

Do not pass the original image-generation prompt as the source of truth unless the user specifically asks to compare against it. The MDX article context and primary sources are the truth surface.

## Review Workflow

1. Inspect the local image files visually.
   - Check composition, crop safety, resolution, aspect ratio, contrast, label legibility, typographic quality, artifacts, distorted objects, hallucinated text, watermarks, signatures, and visual hierarchy.
   - For `cardImage.png`, verify portrait readability and safe subject placement.
   - For `blogHeader.png`, verify wide-crop readability and that important details are not near edges.
2. Read the associated MDX/blog context.
   - Check frontmatter image references, title, summary, `tldr`, section headings, captions, figure text, and claims near the image.
   - Identify what the image is supposed to communicate and which details are factual claims versus decorative metaphors.
3. Research factuality with primary sources.
   - Prefer original papers, official vendor docs, standards/specifications, source repositories, official release notes, product docs, or dataset documentation.
   - Use secondary sources only to orient the search or when no primary source exists; label that limitation.
   - Capture source URLs for each factual finding.
4. Compare the image against the article and sources.
   - Flag inaccurate architecture, wrong model names, false data-flow direction, impossible component relationships, misleading scale, invented metrics, unreadable or misspelled labels, and unsupported visual claims.
   - Separate factual blockers from aesthetic preferences.
5. Assess design quality.
   - Judge clarity, beauty, editorial fit, brand consistency, restraint, scanability, mobile/card readability, and whether the image looks like a polished technical blog asset rather than generic AI art.
   - Check light/dark layout fit when relevant, especially transparent or borderless images.
6. Return actionable findings.
   - Give concrete edits: crop changes, prompt corrections, label removals, caption updates, source-backed wording changes, or regeneration guidance.
   - If the image is acceptable, say so and still list any small risks or optional improvements.

## Subagent Prompt Template

Use or adapt this prompt when spawning the reviewer:

```text
You are an independent reviewer for a Ylang Labs technical blog image.

Inspect these local image files:
- [absolute image path]

Read this associated blog context:
- [absolute MDX path or relevant local notes]

Review for:
1. Factuality and technical accuracy against the article context.
2. Accuracy against primary web sources. Prefer official docs, papers, specs, source repos, release notes, and dataset docs.
3. Image quality: artifacts, hallucinated text, distorted details, watermark/signature issues, resolution, crop safety, and readability.
4. Visual design: beauty, hierarchy, brand/editorial fit, clarity, mobile/card usability, and whether it supports the article's argument.

Return concise findings with severity, source URLs, evidence, and concrete recommendations. Separate blocking issues from optional improvements.
```

## Findings Format

Ask the subagent to return findings in this structure:

```markdown
## Verdict

[Approve | Approve with changes | Regenerate | Blocked pending sources]

## Blocking Issues

- Severity: [blocker/high/medium/low]
  Image/path:
  Evidence:
  Source URLs:
  Recommendation:

## Optional Improvements

- Image/path:
  Observation:
  Recommendation:

## Source Notes

- [URL] - [what it verifies]

## Residual Risks

- [Any claim or visual detail that could not be verified]
```

If there are no blocking issues, the report should explicitly say "No blocking issues found."

## Review Standards

Factuality:

- Primary sources outrank summaries, social posts, and generated prompts.
- Exact numbers, labels, architecture names, model names, logos, and benchmarks must be sourced or removed from the image.
- If the image uses a metaphor, confirm it is not visually framed as a literal claim.
- Prefer placing exact technical claims in MDX captions or body text instead of inside generated images.

Visual quality:

- Technical diagrams should have crisp linework, intentional spacing, coherent labels, and no random pseudo-text.
- A beautiful image is not enough if it misleads readers.
- A technically accurate image is not enough if labels are unreadable, the crop is weak, or the design feels generic.
- For dense diagrams, recommend separate wide and portrait compositions instead of forcing one image into both uses.

Response behavior:

- Include source URLs in the final review summary whenever external research was used.
- Clearly mark assumptions and unverified details.
- Prefer specific recommendations that a future image-generation or blog-editing pass can execute.
- Do not edit image files during review unless the user explicitly asks for fixes.
