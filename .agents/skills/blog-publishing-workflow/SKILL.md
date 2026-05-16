---
name: blog-publishing-workflow
description: 'Coordinate the complete Ylang Labs blog publishing workflow from idea or draft through writing guidance, MDX setup, optional artwork or technical visuals, cropped card/header images, social copy, validation, draft PR publication, and optional content-calendar tracking. Use this skill whenever the user asks to create, publish, prepare, or turn a blog idea/draft into a full Ylang Labs blog post, especially when they want writing, assets, social posts, scheduling, GitHub issues/projects, or a PR handled together.'
---

# Blog Publishing Workflow

Use this skill to coordinate the complete Ylang Labs blog workflow. It does not replace the specialized skills; it sequences them and verifies the handoffs between them.

## Required Skills

Read and apply these skills in this order:

1. `blog-topic-research` when the user wants topic ideation before creating the post.
   - Path: `.agents/skills/blog-topic-research/SKILL.md`
   - Purpose: research current technical conversations and produce exactly 5 Ylang Labs topic candidates that can be handed off into this workflow.
2. `content-calendar-management` when the user provides a calendar issue, asks to schedule/track the post, or wants the work represented in GitHub Issues/Projects.
   - Path: `.agents/skills/content-calendar-management/SKILL.md`
   - Purpose: create or update the content-calendar issue and Project item with content type, tags, target date, end date, slug, stage, and description.
3. `blog-writing-guide`
   - Path: `.agents/skills/blog-writing-guide/SKILL.md`
   - Purpose: apply the primary Ylang Labs blog voice, structure, technical quality bar, banned-language rules, title guidance, and review checklist before the MDX draft is finalized.
4. `blog-mdx-authoring`
   - Path: `.agents/skills/blog-mdx-authoring/SKILL.md`
   - Purpose: create the MDX file, frontmatter, slug, asset directory, and content structure.
5. `oil-painting-image-generator` for Ylang Labs blog cover artwork, `cardImage.png`, `blogHeader.png`, and source artwork unless the user explicitly requests a different cover style.
   - Path: `.agents/skills/oil-painting-image-generator/SKILL.md`
   - Purpose: generate the source painting or a refined generation prompt for the blog hero/card image.
6. `technical-blog-image-generator` for inline section images, diagrams, architecture plates, process maps, and other technical figures.
   - Path: `.agents/skills/technical-blog-image-generator/SKILL.md`
   - Purpose: create technical visuals or image-generation prompts for section-level blog assets. Use it for cover/card/header assets only when the user explicitly asks for a technical-diagram cover.
7. `blog-image-cropper` when a source image needs to be cropped into standard card/header assets.
   - Path: `.agents/skills/blog-image-cropper/SKILL.md`
   - Purpose: crop the generated source artwork into `cardImage.png` and `blogHeader.png`.
8. `blog-social-copy`
   - Path: `.agents/skills/blog-social-copy/SKILL.md`
   - Purpose: create 2-3 short social post variations and save them under `posts/`.
9. `github:yeet` when the user wants the workflow published as a PR.
   - Purpose: commit only scoped task files, push the branch, and open a draft PR.

If one of these skills is unavailable, continue with the closest repo-native workflow and clearly state the gap.

## Inputs To Collect

Derive missing details from the provided blog whenever possible instead of blocking on questions.

- Blog title or working title.
- Blog body, outline, notes, or source draft.
- Preferred author slugs. Default to `arthur-reimus` only when the user does not specify and the repo has that author.
- Tags. Use existing tags when possible.
- GitHub content-calendar issue or Project item, if the work is already tracked.
- Target date and end date when the user wants scheduling metadata.
- Publication date. Default to today's date in `YYYY-MM-DD`.
- Draft status. Default to `draft: false` unless the user asks for a draft article.
- Style direction. Default to `blog-writing-guide` for all Ylang Labs blog prose.
- Reading time. Default to 5 minutes or less unless the user explicitly asks for or approves a longer post.
- Any external references or canonical URL.
- Reference topic slug for `refs/<topic>/`. Default to the final blog slug when the user does not provide one.
- Visual direction. Use `oil-painting-image-generator` for normal cover/card/header artwork. Use `technical-blog-image-generator` for section images, architecture visuals, benchmark figures, process maps, and other technical figures. Use a technical-diagram cover only when the user explicitly requests that cover style.
- Target branch or PR base if the user provides one. Otherwise verify the remote default branch before publishing.

## Output Files

The workflow should always produce or update the core article files:

- `data/blogs/<slug>.mdx`
- `refs/<slug>/README.md` when the blog uses external sources, current research, vendor docs, papers, datasets, social trend evidence, or user-provided background material
- `public/static/images/blogs/<slug>/cardImage.png`
- `public/static/images/blogs/<slug>/blogHeader.png`

Add other files only when the post or publishing request needs them:

- `public/static/images/blogs/<slug>/source-artwork.png` for generated cover artwork
- Additional diagrams, benchmark figures, screenshots, or supporting images
- `posts/social-media-<slug>.md` when social launch copy is requested or the task is an end-to-end publishing package
- BibTeX entries or custom MDX components when the post needs formal citations or interactive visuals

## Workflow

### 1. Inspect The Repo First

Before writing files:

- Run `git status --short` and preserve unrelated changes.
- Inspect `contentlayer.config.ts` for current blog schema fields if frontmatter needs are uncertain.
- Inspect nearby posts in `data/blogs/` for style, frontmatter, tag, reference, and component patterns.
- Read `DESIGN.md` before making visual or layout-sensitive choices.
- Confirm the intended slug does not already exist in `data/blogs/` or `public/static/images/blogs/`.
- Confirm whether `refs/<slug>/` already exists for the topic, and preserve or extend it instead of replacing prior research notes.
- If the user references GitHub content-calendar tracking, read `.agents/skills/content-calendar-management/SKILL.md`, inspect the issue/Project item first, and preserve its content type, tags, target date, end date, slug, and description as workflow metadata.

### 2. Research Or Confirm The Topic

If the user asks for trending ideas, topic research, or help deciding what to write before creating the post, use `blog-topic-research` first.

- Read `.agents/skills/blog-topic-research/SKILL.md` and follow its research workflow.
- Produce exactly 5 ranked topic candidates with evidence, risks, and a recommended pick.
- Put source logs, research notes, and provenance for the selected topic under `refs/<topic>/`.
- Use the selected topic as the input brief for the rest of this end-to-end workflow.
- If the user already provided a clear topic, draft, or outline, skip this research step and proceed directly to blog structure.

### 3. Prepare The Blog Structure

Use `blog-mdx-authoring` to:

- Create a kebab-case slug from the final title.
- Create or update `refs/<slug>/README.md` with the source log for external references, current research, user-provided background material, and any sources used to support claims.
- Create `public/static/images/blogs/<slug>/`.
- Create `data/blogs/<slug>.mdx`.
- Use `layout: 'PostBanner'` unless the content clearly needs another existing layout.
- Set:
  - `cardImage: '/static/images/blogs/<slug>/cardImage.png'`
  - `images: ['/static/images/blogs/<slug>/blogHeader.png']`
- Use `summary` for the listing/SEO summary.
- Use `tldr` for concise Key Takeaways.
- Use existing MDX components such as `Callout`, `Image`, `DiagramSubtitle`, and `MermaidDiagram` when they make the article clearer.
- Choose the body scaffold by post type:
  - Engineering deep dive: problem, mechanism, architecture, tradeoffs, failure modes, practical application, references.
  - Migration/build story: outcome metrics, old system, constraints, migration design, validation, results, hindsight.
  - AI research/explainer: definition, why now, how it works, evaluation, limitations, practical guidance, references.
  - Opinion/strategy essay: claim, tension, principle, examples, implications, closing stance.

Keep the article concrete and technical. Prefer implementation details, architecture, tradeoffs, and citations over generic marketing language.

Apply `blog-writing-guide` before finalizing the MDX draft:

- Keep the draft at 5 minutes or less by default unless the user explicitly asked for or approved a longer post.
- Open by stating the problem or conclusion in the first 2-3 sentences.
- Structure the article around the reader's questions: problem, mechanics, tradeoffs, implementation, failed attempts, and known limitations where relevant.
- Make section headings specific and information-bearing.
- Remove generic placeholders such as `Introduction`, `Background`, `Section 1`, and `Conclusion` unless that exact wording is genuinely the clearest heading.
- Do not add a manual "Key Takeaways" section when `layout: 'PostBanner'`; `tldr` already renders as "Key Takeaways".
- Prefer technical mechanisms, concrete examples, working code, numbers, diagrams, and caveats over generic marketing prose.
- Remove banned language, vague superlatives, AI-prose tells, and unsupported hype.
- End with something useful: docs, source code, an implementation path, or a concrete next step.

After the first MDX draft exists, run one revision pass against `blog-writing-guide` before generating images and social copy. Keep the writing pass focused on prose, structure, title, technical quality, and claim calibration; do not let it change frontmatter, asset paths, or repo workflow conventions owned by `blog-mdx-authoring`.

### 4. Create The Visual Assets

Choose the visual workflow based on the post:

- Use real screenshots or product captures when the post is about an interface, workflow, or shipped project.
- Use `oil-painting-image-generator` for normal Ylang Labs blog cover/card/header artwork, including metaphor-led technical covers.
- Use `technical-blog-image-generator` for inline section images, architecture plates, benchmark charts, diagrams, process maps, and implementation-detail figures.
- Use `technical-blog-image-generator` for cover/card/header assets only when the user explicitly requests a technical-diagram cover style.
- Do not create SVG/vector/code-native image sources unless the user explicitly asks for manual vector work.

If using generated cover artwork, the prompt should:

- Represent the article's core idea as a clear visual metaphor or technical scene.
- Avoid text, UI mockups, logos, watermarks, signatures, and copied famous compositions.
- Use a visual direction suited to the topic.
- Preserve enough negative space and scene structure for the requested cover format.
- Keep cover assets separate from inline section diagrams unless the user explicitly asks to reuse an inline diagram as the cover.
- `blogHeader.png` and the first section image do not need to be the same image or use the same source. Do not make them match by default.

Save the original generated cover image under:

```text
public/static/images/blogs/<slug>/source-artwork.png
```

If the image-generation tool returns a different filename or format, save or convert a stable source image in the blog asset directory before cropping.

If using generated section visuals, save each final technical image under a descriptive filename in the same blog asset directory and document the prompt or visual spec in `refs/<slug>/README.md` when reproducibility matters.

When the request is only for inline section visuals, do not update `cardImage.png` or `blogHeader.png`.
Do not derive `blogHeader.png` from the first section visual unless the user explicitly asks for the header to reuse that image.

### 5. Crop Or Finalize Blog Assets

Use `blog-image-cropper` with the selected source image when cropping is needed.

Required outputs:

- `public/static/images/blogs/<slug>/cardImage.png` exactly `1080x1920`
- `public/static/images/blogs/<slug>/blogHeader.png` exactly `1260x700`

Inspect the source image visually before cropping. Choose separate crop regions for the card and header when needed. Verify both final dimensions and visually inspect the crops.

### 6. Create Social Posts

Use `blog-social-copy` after the MDX content is drafted when the user asked for social copy or the task is an end-to-end publishing package.

Save variations to:

```text
posts/social-media-<slug>.md
```

Create 2-3 variations. For LinkedIn, prefer a professional and insight-led variation. Keep each post under 300 characters and include a `[URL]` placeholder unless the final URL is known.

Use `blog-writing-guide` as the baseline voice for social copy: specific, direct, technically useful, and free of generic hype.

### 7. Update The Content Calendar

When the user asked for calendar tracking or the workflow started from a calendar issue, use `content-calendar-management` to update the GitHub issue/Project item after each meaningful handoff:

- Move to `Drafting` once the MDX draft exists.
- Move to `Assets` while the visual source, card image, and header are being produced.
- Move to `Scheduled` when content, assets, social copy, target date, and end date are ready.
- Move to `Published` only after the final public URL is known and linked in the issue.

If Project auth is missing, continue the repo work and report the exact auth blocker from the calendar skill.

### 8. Validate

At minimum:

- Confirm frontmatter fields are declared in `contentlayer.config.ts`.
- Confirm `refs/<slug>/README.md` exists for sourced posts and that MDX citations trace back to it.
- Confirm every referenced image path exists.
- Confirm `cardImage.png` is `1080x1920` when generated or cropped assets are used.
- Confirm `blogHeader.png` is `1260x700` when generated or cropped assets are used.
- Confirm the selected visual approach fits the post type: technical visuals for systems/evaluations/migrations unless a metaphor-led cover is intentional.
- Confirm the draft is 5 minutes or less by default. If it is longer, confirm the user explicitly approved a longer post and state that in the final summary.
- Run `pnpm build` when feasible.

For code or component changes, also run `pnpm lint`.

State exactly what validation ran and any gaps.

### 9. Publish As A Draft PR

When publishing is requested as part of the task:

- Use `github:yeet` for the PR flow.
- Check whether a PR already exists for the branch before creating a new one.
- Commit only scoped files for the blog, `refs/<slug>` source packet, image assets, social post file, and any necessary references/components.
- Do not include unrelated generated files, scratch files, plans, or dirty worktree changes.
- Open the PR as a draft unless the user explicitly asks for ready-for-review.

The PR description should include:

```markdown
## Summary

- Added `<title>` as a new Ylang Labs blog post.
- Added blog visual assets and cropped card/header images.
- Added social post variations for launch copy.

## Social Post Options

### Option 1: LinkedIn

<paste the best LinkedIn variation from posts/social-media-<slug>.md>

### Option 2

<paste another variation>

### Option 3

<paste another variation when available>

## Validation

- <commands and checks run>
```

If a PR cannot be opened because authentication, network, or permissions are unavailable, leave the branch and commit ready and report the exact blocker.

## Quality Checklist

Before finalizing, confirm:

- The MDX post builds against the Contentlayer schema.
- The post uses the correct slug in the MDX path, asset folder, and public image paths.
- Sourced claims have a `refs/<slug>/README.md` source log, and rendered citations line up with that reference packet.
- The selected visuals match the article's theme and avoid visible text artifacts.
- The article passes `blog-writing-guide`: strong opening, correct post-type scaffold, specific headings, concrete technical detail, tradeoffs or limitations where relevant, no duplicate Key Takeaways body section, no banned language, and a useful closing.
- The article stays at 5 minutes or less unless the user explicitly approved a longer post.
- `cardImage.png` and `blogHeader.png` exist with exact required dimensions.
- Social posts are saved under `posts/` and are included in the PR description when requested or when a PR is opened for an end-to-end publishing package.
- Unrelated worktree changes were not modified, staged, committed, or published.
