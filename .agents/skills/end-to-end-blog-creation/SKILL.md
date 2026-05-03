---
name: end-to-end-blog-creation
description: "Orchestrate complete Ylang Labs blog creation from a user-provided blog idea or draft through generated oil-painting artwork, MDX post setup, cropped card/header images, LinkedIn/social copy, validation, draft PR publication, and optional GitHub content-calendar tracking. Use this skill whenever the user asks to create, publish, prepare, or turn a blog idea/draft into a full Ylang Labs blog post, especially when they want artwork, blog assets, social posts, scheduling, GitHub issues/projects, a PR, or a specific editorial style such as Anthropic-like prose handled together."
---

# End-to-End Blog Creation

Use this skill to coordinate the complete Ylang Labs blog workflow. It does not replace the specialized skills; it sequences them and verifies the handoffs between them.

## Required Skills

Read and apply these skills in this order:

1. `trending-blog-topic-research` when the user wants topic ideation before creating the post.
   - Path: `.agents/skills/trending-blog-topic-research/SKILL.md`
   - Purpose: research current technical conversations and produce exactly 5 Ylang Labs topic candidates that can be handed off into this workflow.
2. `github-content-calendar` when the user provides a calendar issue, asks to schedule/track the post, or wants the work represented in GitHub Issues/Projects.
   - Path: `.agents/skills/github-content-calendar/SKILL.md`
   - Purpose: create or update the content-calendar issue and Project item with content type, tags, target date, end date, slug, stage, and description.
3. `anthropic-blog-style` when the user asks for Anthropic-like, research-lab, measured, evidence-led, or caveat-heavy prose.
   - Path: `.agents/skills/anthropic-blog-style/SKILL.md`
   - Purpose: shape the blog's central question, evidence, caveats, limitations, and next steps before the MDX draft is finalized.
4. `beautiful-oil-painting-image-gen`
   - Path: `.agents/skills/beautiful-oil-painting-image-gen/SKILL.md`
   - Purpose: generate the source artwork or a refined generation prompt for the blog hero image.
5. `blog-authoring`
   - Path: `.agents/skills/blog-authoring/SKILL.md`
   - Purpose: create the MDX file, frontmatter, slug, asset directory, and content structure.
6. `blog-image-creator`
   - Path: `.agents/skills/blog-image-creator/SKILL.md`
   - Purpose: crop the generated source artwork into `cardImage.png` and `blogHeader.png`.
7. `blog-social-post-generator`
   - Path: `.agents/skills/blog-social-post-generator/SKILL.md`
   - Purpose: create 2-3 short social post variations and save them under `posts/`.
8. `github:yeet` when the user wants the workflow published as a PR.
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
- Style direction. If the user asks for Anthropic-like prose, treat that as a writing overlay rather than a separate content pipeline.
- Any external references or canonical URL.
- Artwork direction. If not specified, infer a tasteful oil-painting concept from the article's core technical metaphor.
- Target branch or PR base if the user provides one. Otherwise verify the remote default branch before publishing.

## Output Files

The workflow should produce this minimum file set:

- `data/blogs/<slug>.mdx`
- `public/static/images/blogs/<slug>/source-artwork.png` or another clearly named source artwork file
- `public/static/images/blogs/<slug>/cardImage.png`
- `public/static/images/blogs/<slug>/blogHeader.png`
- `posts/social-media-<slug>.md`

Only add other files when the blog actually needs them, such as extra diagrams, BibTeX entries, or supporting images.

## Workflow

### 1. Inspect The Repo First

Before writing files:

- Run `git status --short` and preserve unrelated changes.
- Inspect `contentlayer.config.ts` for current blog schema fields if frontmatter needs are uncertain.
- Inspect nearby posts in `data/blogs/` for style, frontmatter, tag, reference, and component patterns.
- Read `DESIGN.md` before making visual or layout-sensitive choices.
- Confirm the intended slug does not already exist in `data/blogs/` or `public/static/images/blogs/`.
- If the user references GitHub content-calendar tracking, read `.agents/skills/github-content-calendar/SKILL.md`, inspect the issue/Project item first, and preserve its content type, tags, target date, end date, slug, and description as workflow metadata.

### 2. Research Or Confirm The Topic

If the user asks for trending ideas, topic research, or help deciding what to write before creating the post, use `trending-blog-topic-research` first.

- Read `.agents/skills/trending-blog-topic-research/SKILL.md` and follow its research workflow.
- Produce exactly 5 ranked topic candidates with evidence, risks, and a recommended pick.
- Use the selected topic as the input brief for the rest of this end-to-end workflow.
- If the user already provided a clear topic, draft, or outline, skip this research step and proceed directly to blog structure.

### 3. Prepare The Blog Structure

Use `blog-authoring` to:

- Create a kebab-case slug from the final title.
- Create `public/static/images/blogs/<slug>/`.
- Create `data/blogs/<slug>.mdx`.
- Use `layout: 'PostBanner'` unless the content clearly needs another existing layout.
- Set:
  - `cardImage: '/static/images/blogs/<slug>/cardImage.png'`
  - `images: ['/static/images/blogs/<slug>/blogHeader.png']`
- Use `summary` for the listing/SEO summary.
- Use `tldr` for concise Key Takeaways.
- Use existing MDX components such as `Callout`, `Image`, `DiagramSubtitle`, and `MermaidDiagram` when they make the article clearer.

Keep the article concrete and technical. Prefer implementation details, architecture, tradeoffs, and citations over generic marketing language.

If the user asked for Anthropic-like prose, apply `anthropic-blog-style` before finalizing the MDX draft:

- Start with a central question, claim, or tension.
- Explain why the problem matters before introducing technical detail.
- Use concrete examples and evidence before broad claims.
- Include caveats or limitations that materially affect interpretation.
- End with implications, availability, or next steps.

After the first MDX draft exists, run one revision pass against `anthropic-blog-style` before generating images and social copy. Keep the style pass focused on prose, structure, and claim calibration; do not let it change frontmatter, asset paths, or repo workflow conventions owned by `blog-authoring`.

### 4. Generate Source Artwork

Use `beautiful-oil-painting-image-gen` to create a museum-quality oil-painting concept for the article.

The artwork prompt should:

- Represent the article's core idea as a clear visual metaphor.
- Avoid text, UI mockups, logos, watermarks, signatures, and copied famous compositions.
- Use an art-historical direction suited to the topic.
- Preserve enough negative space and scene structure to crop into both portrait and wide formats.

Save the original generated image under:

```text
public/static/images/blogs/<slug>/source-artwork.png
```

If the image-generation tool returns a different filename or format, save or convert a stable source image in the blog asset directory before cropping.

### 5. Create Blog Assets

Use `blog-image-creator` with the generated source artwork.

Required outputs:

- `public/static/images/blogs/<slug>/cardImage.png` exactly `1080x1920`
- `public/static/images/blogs/<slug>/blogHeader.png` exactly `1260x700`

Inspect the source artwork visually before cropping. Choose separate crop regions for the card and header when needed. Verify both final dimensions and visually inspect the crops.

### 6. Create Social Posts

Use `blog-social-post-generator` after the MDX content is drafted.

Save variations to:

```text
posts/social-media-<slug>.md
```

Create 2-3 variations. For LinkedIn, prefer a professional and insight-led variation. Keep each post under 300 characters and include a `[URL]` placeholder unless the final URL is known.

If Anthropic-like prose was requested for the article, let the social copy inherit the measured, evidence-led framing without forcing the full blog structure into short-form posts.

### 7. Update The Content Calendar

When the user asked for calendar tracking or the workflow started from a calendar issue, use `github-content-calendar` to update the GitHub issue/Project item after each meaningful handoff:

- Move to `Drafting` once the MDX draft exists.
- Move to `Assets` while source artwork, card image, and header are being produced.
- Move to `Scheduled` when content, assets, social copy, target date, and end date are ready.
- Move to `Published` only after the final public URL is known and linked in the issue.

If Project auth is missing, continue the repo work and report the exact auth blocker from the calendar skill.

### 8. Validate

At minimum:

- Confirm frontmatter fields are declared in `contentlayer.config.ts`.
- Confirm every referenced image path exists.
- Confirm `cardImage.png` is `1080x1920`.
- Confirm `blogHeader.png` is `1260x700`.
- Run `pnpm build` when feasible.

For code or component changes, also run `pnpm lint`.

State exactly what validation ran and any gaps.

### 9. Publish As A Draft PR

When publishing is requested as part of the task:

- Use `github:yeet` for the PR flow.
- Check whether a PR already exists for the branch before creating a new one.
- Commit only scoped files for the blog, image assets, social post file, and any necessary references/components.
- Do not include unrelated generated files, scratch files, plans, or dirty worktree changes.
- Open the PR as a draft unless the user explicitly asks for ready-for-review.

The PR description should include:

```markdown
## Summary

- Added `<title>` as a new Ylang Labs blog post.
- Added generated oil-painting blog artwork and cropped card/header assets.
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
- The generated artwork matches the article's theme and avoids visible text artifacts.
- Anthropic-style requests include a central question/tension, evidence, caveats or limitations, and implications or next steps.
- `cardImage.png` and `blogHeader.png` exist with exact required dimensions.
- Social posts are saved under `posts/` and are included in the PR description when a PR is opened.
- Unrelated worktree changes were not modified, staged, committed, or published.
