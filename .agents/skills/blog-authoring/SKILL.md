---
name: blog-authoring
description: "Use this skill when the user wants to create a new blog post, start a new article, or write a blog. This skill automates the setup of the MDX file, frontmatter, and asset directories for the ylang-labs-blog project. If the post comes from or should create a GitHub content-calendar issue, use `github-content-calendar` to preserve content type, tags, target date, end date, slug, and description metadata. If the user asks for Anthropic-like, research-lab, measured, evidence-led, or caveat-heavy prose, combine this skill with `anthropic-blog-style`."
---

# Blog Authoring Skill

This skill guides you through creating a new blog post for the `ylang-labs-blog` project, ensuring consistency in frontmatter, image placement, and component usage.

## 1. Prerequisites

- Blog posts are stored in `data/blogs/*.mdx`.
- Static assets (images) are stored in `public/static/images/blogs/[slug]/`.
- Authors are defined in `data/authors/*.mdx`.
- Calendar-tracked posts are represented by GitHub issues and Project items through `.agents/skills/github-content-calendar/SKILL.md`.
- Anthropic-style prose requests are handled through `.agents/skills/anthropic-blog-style/SKILL.md`; use it as a writing overlay, not as a replacement for this repo setup workflow.

## 2. Information Gathering

Before creating the post, ensure you have the following information:

- **Title**: The title of the blog post.
- **Date**: Defaults to today's date (YYYY-MM-DD).
- **Authors**: A list of author slugs (e.g., `arthur-reimus`, `christopher-caysido`, `ezekiel-mariano`, `van-panugan`, `default`).
- **Tags**: A list of tags. Common tags in this project: `AI/ML`, `Agents`, `Generative AI`, `DeepSeek`, `Pydantic`, `Multi-Agent Systems`, `Context Engineering`, `RAG`.
- **Calendar Metadata** (Optional): GitHub issue URL/number, content type, canonical tag keys from `app/blog-tag-data.json`, target date, end date, slug, priority, and description.
- **Summary**: A short description for the blog list view.
- **TLDR**: A "Too Long; Didn't Read" summary.
- **Style Direction** (Optional): If the user asks for Anthropic-like, research-lab, measured, evidence-led, or caveat-heavy prose, read `.agents/skills/anthropic-blog-style/SKILL.md` before drafting.
- **Bibliography** (Optional): Path to a `.bib` file if references are used.
- **CanonicalUrl** (Optional): Original URL if this is a cross-post.

## 3. Layout Options

The project provides three distinct layouts for blog posts. Choose the one that best fits your content:

- **`PostLayout` (Default)**: A professional two-column layout. The left sidebar displays author details and tags, while the main column contains the content. Ideal for most standard blog posts.
- **`PostSimple`**: A clean, single-column centered layout. It focuses entirely on the text with minimal distractions. Best for short updates or prose-heavy pieces.
- **`PostBanner`**: Features a prominent full-width banner image at the top (uses the first image in the `images` array). It includes a "Key Takeaways" section at the start and is best for deep dives or visually-rich announcements.

## 4. Workflow

### Step 0: Preserve Calendar Metadata

If the user references a GitHub issue, Project item, target date, end date, or content calendar, read `.agents/skills/github-content-calendar/SKILL.md` before creating the MDX file.

- Use the calendar issue description as the draft brief.
- Use the calendar slug if one is present.
- Convert canonical calendar tag keys to existing human-readable frontmatter tags where possible, such as `aiml` -> `AI/ML`, `agents` -> `Agents`, and `context-engineering` -> `Context Engineering`.
- Do not invent missing schedule dates. If `Target Date` or `End Date` is absent, leave the calendar metadata incomplete and report the gap.

### Step 1: Generate the Slug

Convert the title to a kebab-case slug (e.g., "My New Blog" -> "my-new-blog").

### Step 2: Create Asset Directory

Create a directory for the blog's images:
`mkdir -p public/static/images/blogs/[slug]/`

### Step 3: Static Assets and Naming Conventions

Follow these strict naming conventions for essential blog assets:

- **`cardImage.png`**: The thumbnail used in the blog list and project cards.
- **`blogHeader.png`**: The large banner image displayed at the top of the post.
- **Other Images**: Use descriptive names (e.g., `architecture-flow.png`, `benchmark-results.png`).

Place all images in: `public/static/images/blogs/[slug]/`

### Step 4: Create the MDX File

If the style direction is Anthropic-like, use `.agents/skills/anthropic-blog-style/SKILL.md` before drafting the `summary`, `tldr`, and article body. Keep this skill responsible for file structure, frontmatter, asset paths, and MDX conventions; let `anthropic-blog-style` shape the central question, evidence, caveats, limitations, and next steps.

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

## Introduction

[Your content here...]

## Section 1

[Use custom components like <Image />, <Callout />, etc.]
```

### Step 5: Component Usage Guide

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

### Step 6: References and Citations

The project supports two ways to handle references:

1. **BibTeX (Preferred for Formal Citations)**:

   - Add your citations to `data/references-data.bib`.
   - In the frontmatter, add `bibliography: references-data.bib`.
   - In the text, use `[@citationKey]` (e.g., `[@Nash1950]`).
   - Citations will be automatically rendered at the bottom if the `rehype-citation` plugin is active.

2. **Manual References (Standard Markdown)**:

   - Create a `## References` section at the end of the file.
   - Use a numbered list with links:

     ```mdx
     ## References

     1. [Title](URL)
     2. Author, _Title_, Publisher, Year. [Link](URL)
     ```

## 4. Verification

- Confirm the directory `public/static/images/blogs/[slug]/` exists.
- Confirm the file `data/blogs/[slug].mdx` exists with the correct frontmatter.
- For Anthropic-style requests, confirm the draft opens with a central question/tension, includes concrete evidence, states limitations, and ends with implications or next steps.
- Suggest that the user place `cardImage.png` and `blogHeader.png` in the new assets directory.
