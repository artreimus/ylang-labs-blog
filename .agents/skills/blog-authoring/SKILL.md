---
name: blog-authoring
description: Use this skill when the user wants to create a new blog post, start a new article, or write a blog. This skill automates the setup of the MDX file, frontmatter, and asset directories for the ylang-labs-blog project.
---

# Blog Authoring Skill

This skill guides you through creating a new blog post for the `ylang-labs-blog` project, ensuring consistency in frontmatter, image placement, and component usage.

## 1. Prerequisites

- Blog posts are stored in `data/blogs/*.mdx`.
- Static assets (images) are stored in `public/static/images/blogs/[slug]/`.
- Authors are defined in `data/authors/*.mdx`.

## 2. Information Gathering

Before creating the post, ensure you have the following information:

- **Title**: The title of the blog post.
- **Date**: Defaults to today's date (YYYY-MM-DD).
- **Authors**: A list of author slugs (e.g., `arthur-reimus`, `christopher-caysido`, `ezekiel-mariano`, `van-panugan`, `default`).
- **Tags**: A list of tags. Common tags in this project: `AI/ML`, `Agents`, `Generative AI`, `DeepSeek`, `Pydantic`, `Multi-Agent Systems`, `Context Engineering`, `RAG`.
- **Summary**: A short description for the blog list view.
- **TLDR**: A "Too Long; Didn't Read" summary.
- **Bibliography** (Optional): Path to a `.bib` file if references are used.
- **CanonicalUrl** (Optional): Original URL if this is a cross-post.

## 3. Layout Options

The project provides three distinct layouts for blog posts. Choose the one that best fits your content:

- **`PostLayout` (Default)**: A professional two-column layout. The left sidebar displays author details and tags, while the main column contains the content. Ideal for most standard blog posts.
- **`PostSimple`**: A clean, single-column centered layout. It focuses entirely on the text with minimal distractions. Best for short updates or prose-heavy pieces.
- **`PostBanner`**: Features a prominent full-width banner image at the top (uses the first image in the `images` array). It includes a "Key Takeaways" section at the start and is best for deep dives or visually-rich announcements.

## 4. Workflow

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
- Suggest that the user place `cardImage.png` and `blogHeader.png` in the new assets directory.
