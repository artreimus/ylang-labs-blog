# Blog Reference Packets

Use this directory for topic-specific research and source provenance that supports Ylang Labs blog posts.

## Folder Standard

Create one folder per blog topic:

```text
refs/<topic>/
```

Use kebab-case for `<topic>`. Prefer the final blog slug so the reference packet lines up with:

```text
data/blogs/<slug>.mdx
public/static/images/blogs/<slug>/
refs/<slug>/
```

If research starts before the title is final, use a stable working topic slug, then rename the folder or cross-reference it before publishing.

## Required Source Log

Start each topic folder with:

```text
refs/<topic>/README.md
```

Record each source with:

- Title
- URL or local path
- Publisher or author when known
- Publication date when known
- Access date for web sources
- Short note on how the source supports the article

## Supporting Files

Store supporting material under the same topic folder when it is needed to reproduce or audit claims:

```text
refs/<topic>/notes.md
refs/<topic>/sources/
refs/<topic>/screenshots/
refs/<topic>/papers/
refs/<topic>/datasets/
```

Do not copy full copyrighted articles unless the license allows it. Prefer links, summaries, and short excerpts needed for verification.

## Relationship To Blog Citations

`refs/<topic>/` is the research/provenance workspace. Rendered citations still belong in the blog post through one of the site-supported paths:

- Formal citations: `data/references-data.bib` plus `bibliography: references-data.bib` in MDX frontmatter.
- Simpler posts: a manual `## References` section in the MDX file.
