# AGENTS.md

## Scope

These instructions apply to the entire `ylang-labs-blog` repository.

This repo is the Ylang Labs content platform: a Next.js App Router site backed by Contentlayer MDX content for AI engineering blogs, project showcases, authors, and company metadata. Treat the live codebase as the source of truth and keep changes scoped to the requested content, component, or configuration surface.

## Required First Steps

- Check relevant local skills before starting. For this repo, prefer:
  - `blog-authoring` for creating or structuring new blog posts.
  - `blog-image-creator` for preparing `cardImage.png` and `blogHeader.png`.
  - `blog-social-post-generator` when asked for social copy tied to a post or project.
  - `beautiful-oil-painting-image-gen` when asked for oil-painting-style generated artwork.
- Research before planning. Inspect the current files, schemas, layouts, and local docs before writing a plan or changing code.
- When a library detail is unclear, use Context7 for current docs. If Context7 is insufficient, use web search and cite external sources in the final answer.
- Never create a git commit unless explicitly asked. If asked to commit, include only task-related files and exclude temporary plans, scratch files, generated support notes, and unrelated dirty files.
- Preserve unrelated work. This repo may have generated or user-owned changes in the worktree; do not revert or stage them unless the user asks.

## Commands

- Install dependencies with `pnpm install`.
- Start local development with `pnpm dev`.
- Build with `pnpm build`.
- Serve a production build with `pnpm serve`.
- Lint with `pnpm lint`.
- Analyze bundle output with `pnpm analyze`.

Use `pnpm` because `package.json` pins `pnpm@9.12.2`. Do not switch package managers or edit lockfiles manually.

## Architecture

- `app/` contains Next.js App Router routes, metadata, sitemap/robots, API routes, and generated tag-count JSON files.
- `components/` contains shared UI, MDX components, hooks, shadcn-style primitives under `components/ui/`, and blog-specific interactive diagrams under `components/blogs/<slug>/`.
- `layouts/` contains page and content templates for blog posts, projects, authors, company pages, and listings.
- `data/` is the Contentlayer content root:
  - `data/blogs/*.mdx` for blog posts.
  - `data/projects/*.mdx` for project showcases.
  - `data/authors/*.mdx` for author profiles.
  - `data/company/*.mdx` for company metadata.
  - `data/siteMetadata.js`, `data/headerNavLinks.ts`, `data/teamMembers.ts`, and `data/references-data.bib` for global site data.
- `public/static/images/` contains all committed static assets:
  - `public/static/images/blogs/<slug>/` for blog artwork and figures.
  - `public/static/images/projects/<slug>/` for project screenshots, demos, and diagrams.
  - `public/static/images/avatars/` for author photos.
- `contentlayer.config.ts` defines the canonical content schemas, computed fields, MDX plugin pipeline, tag JSON generation, and search-index generation.
- `DESIGN.md` documents the Ylang Labs design system. Follow it for colors, typography, dark mode, spacing, cards, and editorial tone.

## Contentlayer Contracts

Content is discovered from `data` via Contentlayer. Update `contentlayer.config.ts` first if a new field is required; do not rely on undeclared frontmatter.

Computed fields common to blogs, projects, authors, and company docs include:

- `readingTime`
- `slug`
- `path`
- `filePath`
- `toc`

The build also writes:

- `app/blog-tag-data.json`
- `app/project-tag-data.json`
- `public/search.json` when kbar search is enabled

These files may change after a build. Treat unrelated pre-existing generated changes carefully.

## Blog Standards

Blog posts live in `data/blogs/<slug>.mdx`. Use kebab-case slugs and match the asset folder name exactly.

Required or strongly expected blog frontmatter:

```mdx
---
title: 'Post Title'
date: 'YYYY-MM-DD'
tags: ['AI/ML', 'Agents']
draft: false
summary: 'Short listing and SEO summary.'
tldr: |
  - Key takeaway one.
  - Key takeaway two.
authors: ['arthur-reimus']
cardImage: '/static/images/blogs/<slug>/cardImage.png'
images: ['/static/images/blogs/<slug>/blogHeader.png']
imageTheme: 'white'
layout: 'PostBanner'
---
```

Supported blog fields are defined in `contentlayer.config.ts`: `title`, `date`, `tags`, `lastmod`, `draft`, `summary`, `tldr`, `images`, `cardImage`, `imageTheme`, `authors`, `layout`, `bibliography`, and `canonicalUrl`.

Blog layout options:

- `PostBanner` is the default route layout and the preferred layout for polished Ylang Labs articles. It uses `images[0]` as the banner and renders `tldr` or `summary` as "Key Takeaways".
- `PostLayout` is a two-column article layout with author/tag sidebar and a TLDR callout from `summary`.
- `PostSimple` is for simpler, text-focused posts.

Blog asset standards:

- Store assets in `public/static/images/blogs/<slug>/`.
- Use `cardImage.png` for listing/card thumbnails.
- Use `blogHeader.png` for the post banner.
- Use descriptive names for inline images, diagrams, and figures.
- Reference images with absolute public paths such as `/static/images/blogs/<slug>/diagram.png`.
- For generated/cropped blog art, `cardImage.png` should be `1080x1920` and `blogHeader.png` should be `1260x700` unless the user explicitly asks otherwise.

Blog writing standards:

- The publication focuses on AI engineering, agents, LLM systems, RAG, evaluation, ML infrastructure, and practical implementation lessons.
- Prefer concrete technical explanations, architecture diagrams, examples, and citations over generic marketing prose.
- Use the existing editorial pattern: clear intro, technical sections, diagrams or images where useful, and references when relying on external sources.
- For formal references, add entries to `data/references-data.bib`, set `bibliography: references-data.bib`, and cite with `[@citationKey]`.
- Manual `## References` sections are acceptable for simpler posts.
- Keep `summary` concise for listing/search/SEO. Use `tldr` for multi-bullet takeaways in `PostBanner`.

## Project Standards

Project pages live in `data/projects/<slug>.mdx`. Use them for shipped demos, open-source repositories, research apps, and technical showcases.

Expected project frontmatter:

```mdx
---
title: 'Project Name'
date: 'YYYY-MM-DD'
tags: ['AI/ML', 'Agents']
lastmod: 'YYYY-MM-DD'
draft: false
description: 'Short project description for cards, SEO, and layout sidebar.'
image: '/static/images/projects/<slug>/demo.gif'
cardImage: '/static/images/projects/<slug>/main-interface.png'
imageTheme: 'black'
authors: ['arthur-reimus']
layout: 'ProjectLayout'
github: 'https://github.com/Ylang-Labs/project_repo'
demo: 'https://example.com'
---
```

Supported project fields are defined in `contentlayer.config.ts`: `title`, `date`, `tags`, `lastmod`, `draft`, `description`, `image`, `cardImage`, `imageTheme`, `authors`, `layout`, `github`, and `demo`.

Project asset standards:

- Store assets in `public/static/images/projects/<slug>/`.
- Use `image` for the primary hero/demo media shown in `ProjectLayout`.
- Use `cardImage` for project listing cards; if absent, listings fall back to `image`.
- Prefer real product screenshots, demos, architecture images, and concise diagrams over abstract decoration.
- Use descriptive filenames like `main-interface.png`, `architecture.png`, `demo.gif`, or `session.png`.

Project content standards:

- Start with a clear product/project summary and the user-facing value.
- Include app screenshots, architecture, quick start, environment variables, development workflow, deployment notes, and license when relevant.
- Keep repo links in `github` and live links in `demo` so the layout can render standard actions.
- Use `ProjectLayout` unless adding a new project template intentionally.

## Authors, Company, And Team Data

- Authors live in `data/authors/<author-slug>.mdx`.
- Author slugs must match `authors: [...]` values in blog and project frontmatter.
- Author avatar paths should point into `/static/images/avatars/`.
- Company metadata lives in `data/company/default.mdx`.
- Team-member and navigation changes belong in `data/teamMembers.ts` and `data/headerNavLinks.ts`.

## MDX Components

Reusable MDX components are registered in `components/MDXComponents.tsx`. A component must be registered there before using it by name in MDX.

Core components available in MDX include:

- `<Image />`
- `<TOCInline />`
- `<DiagramSubtitle />`
- `<DiagramDisplay />`
- `<Callout />`
- `<MermaidDiagram />`
- tables via `TableWrapper`
- code blocks via `MdxPre`

Blog-specific components live under `components/blogs/<slug>/`. Keep new post-specific interactive diagrams in a slug-named folder and register them in `components/MDXComponents.tsx`. If a diagram is broadly reusable, place it in `components/` with a clear generic name.

## Design And Frontend Standards

- Before working on frontend, layout, styling, visual hierarchy, components, or design-sensitive content, read and follow `DESIGN.md`.
- Use `DESIGN.md` as the design contract for Ylang Labs brand expression, typography, color usage, spacing, component shape, dark mode, and editorial UI tone.
- Follow `tailwind.config.js` for the concrete Tailwind tokens that implement the design system.
- Use the brand palette through Tailwind classes: `primary`, `secondary`, and `gray`.
- Preserve light and dark mode for every new component.
- Use Helvetica/Arial via the existing Tailwind `font-sans` stack.
- Prefer editorial, content-first UI: generous reading space, clear hierarchy, strong real imagery, restrained motion.
- Avoid one-off hex values unless updating the design system itself.
- Prefer existing shared components (`Link`, `Image`, `SectionContainer`, `PageTitle`, `CardTag`, `Tags`, `Callout`) before creating new primitives.
- Keep cards, listing rows, and article content responsive. Check mobile behavior when changing layouts.
- Use `next/image` through the repo's `components/Image.tsx` wrapper unless there is a specific reason not to.
- For icons in new React UI, prefer the icon libraries already installed (`lucide-react`, `react-icons`, `@tabler/icons-react`) instead of hand-written SVGs.

## Routes And Listing Behavior

- Blog routes are under `/blogs` and `/blogs/<slug>`.
- Project routes are under `/projects` and `/projects/<slug>`.
- Draft content is filtered out of listing and detail pages.
- Blog listing pagination currently uses 10 posts per page.
- Project listing pagination currently uses 6 projects per page.
- Search on list pages is client-side and searches title, summary/description, and tags.
- Blog metadata uses `summary`, `images`, authors, and structured data.
- Project metadata uses `description` and `image`.

## Dependencies

- Use `pnpm add <package>` for runtime dependencies.
- Use `pnpm add -D <package>` for dev dependencies.
- Do not manually edit `package.json` or `pnpm-lock.yaml` to add dependencies.
- Prefer the latest stable dependency version unless the user or existing compatibility constraints require a specific version.
- Before adding a dependency, check whether an existing dependency already solves the problem.

## Validation

For content-only changes:

- Confirm frontmatter matches `contentlayer.config.ts`.
- Confirm referenced images exist under `public/static/images/...`.
- Run `pnpm build` when feasible, especially for new MDX, citations, components, or route-visible content.

For code/layout changes:

- Run `pnpm lint`.
- Run `pnpm build`.
- If a local dev server is needed for visual validation, use `pnpm dev` and inspect the affected routes in a browser.

For image work:

- Verify output filenames and dimensions.
- Visually inspect generated or cropped assets.
- Confirm MDX frontmatter references the final public paths.

Always state which validation ran and any validation that could not be run.

## Planning And Documentation

- When the user asks for a plan, inspect the repo first and then create a markdown file named `PLAN_<NAME>.md`.
- Plans must include implementation details: target files, schema changes, component structure, data flow, frontmatter fields, routes, validation, and migration/backfill steps when relevant.
- Mermaid diagrams are encouraged for complex architecture or content-flow changes.
- Do not treat old plan files as authoritative without checking the current code.

## Git Hygiene

- Do not commit unless explicitly asked.
- Do not revert user changes.
- Check `git status --short` before editing and before finalizing.
- Keep generated files, plans, local notes, and temporary outputs out of commits unless explicitly requested.
- If unrelated files are already dirty, mention that they were left untouched.
