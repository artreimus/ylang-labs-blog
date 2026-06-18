---
name: blog-mdx-authoring
description: 'Create and structure Ylang Labs blog MDX posts, including slug selection, frontmatter, asset directories, reference packets, and MDX component conventions. Use this skill when the user wants to create a new blog post file, start a Ylang Labs article, set up blog assets, or convert a content brief into repo-ready MDX. Use `blog-writing-guide` as the prose standard and `content-calendar-management` when the post comes from or should create a calendar issue.'
---

# Blog MDX Authoring

This skill guides you through creating a new blog post for the `ylang-labs-blog` project, ensuring consistency in frontmatter, image placement, component usage, and post-type structure.

## 1. Prerequisites

- Blog posts are stored in `data/blogs/*.mdx`.
- Static assets (images) are stored in `public/static/images/blogs/[slug]/`.
- Blog research and source provenance are stored in `refs/[topic]/`, usually with `[topic]` matching the final blog slug.
- Authors are defined in `data/authors/*.mdx`.
- Calendar-tracked posts are represented by GitHub issues and Project items through `.agents/skills/content-calendar-management/SKILL.md`.
- Primary prose and editorial standards are handled through `.agents/skills/blog-writing-guide/SKILL.md`.

## 2. Information Gathering

Before creating the post, ensure you have the following information:

- **Title**: The title of the blog post. Prefer an ambitious, specific title that sells the thesis, tension, or payoff instead of a neutral topic label.
- **Date**: Defaults to today's date (YYYY-MM-DD).
- **Authors**: A list of author slugs (e.g., `arthur-reimus`, `christopher-caysido`, `ezekiel-mariano`, `van-panugan`, `default`).
- **Tags**: A list of tags. Common tags in this project: `AI/ML`, `Agents`, `Generative AI`, `DeepSeek`, `Pydantic`, `Multi-Agent Systems`, `Context Engineering`, `RAG`.
- **Calendar Metadata** (Optional): GitHub issue URL/number, content type, canonical tag keys from `app/blog-tag-data.json`, target date, end date, slug, priority, and description.
- **Summary**: A short description for the blog list view. It should give a concrete reason to click by saying what the reader will understand, build, fix, or decide after reading.
- **TLDR**: Multi-bullet key takeaways for `PostBanner`. Write bullets as useful conclusions, not neutral recaps. Do not duplicate these as a manual "Key Takeaways" section in the body.
- **Style Direction**: Read `.agents/skills/blog-writing-guide/SKILL.md` before drafting or revising blog prose. Use The Pragmatic Engineer-inspired standard by default.
- **Reading Time**: Default to 5 minutes or less unless the user explicitly asks for or approves a longer post.
- **Reference Topic**: A kebab-case folder name under `refs/`. Default to the final blog slug; use a working topic slug while researching if the title is not final.
- **Bibliography** (Optional): Path to a `.bib` file if references are used.
- **CanonicalUrl** (Optional): Original URL if this is a cross-post.

## 3. Layout Options

The project provides three distinct layouts for blog posts. Choose the one that best fits your content:

- **`PostBanner` (Default)**: Features a prominent full-width banner image at the top (uses the first image in the `images` array). It renders `tldr` or `summary` as "Key Takeaways" and is the preferred layout for polished Ylang Labs posts.
- **`PostLayout`**: A professional two-column layout. The left sidebar displays author details and tags, while the main column contains the content. Use when the author/sidebar frame matters more than a banner image.
- **`PostSimple`**: A clean, single-column centered layout. It focuses entirely on the text with minimal distractions. Best for short updates or prose-heavy pieces.

## 4. Workflow

### Step 0: Preserve Calendar Metadata

If the user references a GitHub issue, Project item, target date, end date, or content calendar, read `.agents/skills/content-calendar-management/SKILL.md` before creating the MDX file.

- Use the calendar issue description as the draft brief.
- Use the calendar slug if one is present.
- Convert canonical calendar tag keys to existing human-readable frontmatter tags where possible, such as `aiml` -> `AI/ML`, `agents` -> `Agents`, and `context-engineering` -> `Context Engineering`.
- Do not invent missing schedule dates. If `Target Date` or `End Date` is absent, leave the calendar metadata incomplete and report the gap.

### Step 1: Generate the Slug

Convert the title to a kebab-case slug (e.g., "My New Blog" -> "my-new-blog").

### Step 2: Create Reference Directory

Create a source/reference packet for the blog topic when the post relies on external sources, current research, vendor docs, papers, datasets, social trend evidence, or user-provided background material:

```text
refs/[slug]/README.md
```

Use `refs/[working-topic]/README.md` while researching if the final title is unknown, then rename it or clearly cross-reference it once the final slug is chosen. The README should list each source with title, URL or local path, publisher/author when known, publication date when known, access date for web sources, and a short note on how the source supports the article. Keep extracted notes, short quotes, screenshots, PDFs, prompt transcripts, and datasets under the same `refs/[slug]/` folder when they are needed to reproduce the article's claims.

### Step 3: Create Asset Directory

Create a directory for the blog's images:
`mkdir -p public/static/images/blogs/[slug]/`

### Step 4: Static Assets and Naming Conventions

Follow these strict naming conventions for essential blog assets:

- **`cardImage.png`**: The thumbnail used in the blog list and project cards.
- **`blogHeader.png`**: The large banner image displayed at the top of the post.
- **Other Images**: Use descriptive names (e.g., `architecture-flow.png`, `benchmark-results.png`).

Place all images in: `public/static/images/blogs/[slug]/`

Choose the visual that best helps the reader understand or remember the post:

- For systems, migrations, evaluations, and implementation posts, prefer diagrams, architecture visuals, benchmark figures, or real product screenshots when those are more useful than decorative art.
- Use `.agents/skills/oil-painting-image-generator/SKILL.md` when the user asks for painterly artwork or when a metaphor-led cover is clearly better than a technical visual.
- For generated/cropped cover art, keep the standard outputs:
  - `public/static/images/blogs/[slug]/cardImage.png` exactly `1080x1920`
  - `public/static/images/blogs/[slug]/blogHeader.png` exactly `1260x700`

Optional generated-art sequence:

1. Use `oil-painting-image-generator` to create a refined museum-quality oil-painting prompt that expresses the article's central technical metaphor.
2. Save the generated source artwork as `public/static/images/blogs/[slug]/source-artwork.png`.
3. Use `blog-image-cropper` to crop that source artwork into:
   - `public/static/images/blogs/[slug]/cardImage.png` exactly `1080x1920`
   - `public/static/images/blogs/[slug]/blogHeader.png` exactly `1260x700`

### Step 5: Create the MDX File

Use `.agents/skills/blog-writing-guide/SKILL.md` before drafting the `title`, `summary`, `tldr`, and article body. Keep this skill responsible for file structure, frontmatter, asset paths, and MDX conventions; let `blog-writing-guide` shape the Pragmatic Engineer-inspired voice, ambition level, opening, reader-question structure, technical depth, section headings, banned-language cleanup, and editorial review pass.

After the body has a clear thesis, revisit the `title`, `summary`, and `tldr`. These are part of the blog's packaging, not clerical metadata. They should sell the strongest defensible claim in the post.

Create the file `data/blogs/[slug].mdx` with the following frontmatter:

```mdx
---
title: '[Title]'
date: '[YYYY-MM-DD]'
tags: ['Tag1', 'Tag2']
draft: false
summary: '[Summary]'
tldr: '[TLDR]'
authors: ['author-slug']
cardImage: '/static/images/blogs/[slug]/cardImage.png'
images: ['/static/images/blogs/[slug]/blogHeader.png']
layout: 'PostBanner'
---
```

Then choose the body scaffold by post type. These scaffolds define the job of each section, not literal required headings. Replace every placeholder heading with a specific, information-bearing H2.

### Engineering Deep Dive

Use for architecture, implementation, debugging, systems, and agent-infrastructure posts.

```mdx
[Open with the problem or conclusion in 2-3 sentences.]

## [Why this problem matters now]

## [How the mechanism actually works]

## [The architecture or implementation path]

## [The tradeoff most teams miss]

## [Where this breaks down]

## [How to apply this in practice]
```

### Migration Or Build Story

Use for migrations, rewrites, scale work, performance projects, and "how we built it" posts.

```mdx
[Open with the outcome, scope, or hard constraint.]

## [The result in numbers]

## [What the old system could not handle]

## [The migration or build design]

## [How we validated it]

## [What changed after launch]

## [What we would do differently]
```

### AI Research Or Explainer

Use for model releases, papers, evaluations, frameworks, and conceptual explainers.

```mdx
[Open with the practical question the reader needs answered.]

## [What this is]

## [Why it matters now]

## [How it works]

## [How it was evaluated]

## [Limitations and failure modes]

## [Practical guidance]
```

### Opinion Or Strategy Essay

Use for founder/operator perspective, product strategy, engineering principles, and market interpretation.

```mdx
[Open with the claim.]

## [The tension]

## [The principle]

## [What this looks like in practice]

## [What this changes]

## [The closing stance]
```

Do not use generic placeholder headings such as `Introduction`, `Background`, `Section 1`, or `Conclusion` unless that exact wording is genuinely the clearest heading for the topic.

### Step 6: Component Usage Guide

Recommend these components within the blog content:

- **Image**: `<Image alt="Description" src="/static/images/blogs/[slug]/image.png" width={800} height={450} className="mx-auto rounded-md bg-white" />`
- **DiagramSubtitle**: `<DiagramSubtitle>Caption for the above image</DiagramSubtitle>`
- **Callout**: `<Callout>Important note</Callout>`
- **MermaidDiagram**: For flowcharts or diagrams.
  ```mdx
  <MermaidDiagram>
    {`
      graph TD;
        A-->B;
        A-->C;
        B-->D;
        C-->D;
    `}
  </MermaidDiagram>
  ```

### Step 7: References and Citations

The project uses `refs/[slug]/` as the source-of-truth workspace for research provenance. Keep source notes there first, then choose one of two rendered citation styles for the MDX post:

1. **BibTeX (Preferred for Formal Citations)**:

   - Keep source notes and retrieval details in `refs/[slug]/README.md`.
   - Add your citations to `data/references-data.bib`.
   - In the frontmatter, add `bibliography: references-data.bib`.
   - In the text, use `[@citationKey]` (e.g., `[@Nash1950]`).
   - Citations will be automatically rendered at the bottom if the `rehype-citation` plugin is active.

2. **Manual References (Standard Markdown)**:

   - Build the list from the source log in `refs/[slug]/README.md`.
   - Create a `## References` section at the end of the file.
   - Use a numbered list with links:

     ```mdx
     ## References

     1. [Title](URL)
     2. Author, _Title_, Publisher, Year. [Link](URL)
     ```

## 5. Verification

- Confirm the directory `public/static/images/blogs/[slug]/` exists.
- Confirm `refs/[slug]/README.md` exists when the post relies on external sources or research.
- Confirm the file `data/blogs/[slug].mdx` exists with the correct frontmatter.
- Confirm rendered citations in `data/references-data.bib` or the MDX `## References` section line up with the source log in `refs/[slug]/README.md`.
- Confirm the draft passes `blog-writing-guide`: it uses the Pragmatic Engineer-inspired voice, opens with the problem or conclusion, stays at 5 minutes or less by default, uses the correct post-type scaffold, has specific headings, includes concrete technical detail, explains tradeoffs or limitations where relevant, avoids banned language, and ends with a useful next step.
- Confirm the `title`, `summary`, and `tldr` are ambitious enough to sell the post while remaining defensible from the article body.
- Confirm `PostBanner` posts do not duplicate the rendered "Key Takeaways" callout with a manual body section.
- Confirm `cardImage.png` and `blogHeader.png` exist when frontmatter references them, or clearly report that the image assets still need to be created.
