# HTML vs. Markdown for Agent Output

Source packet for `data/blogs/html-vs-markdown-agent-output.mdx`.

Access date: 2026-05-24

## Sources Used

### Thariq Shihipar, "The unreasonable effectiveness of HTML" examples

- URL: https://thariqs.github.io/html-effectiveness/
- Author: Thariq Shihipar
- Used for:
  - The claim that the companion site collects twenty self-contained `.html` examples.
  - The category map: exploration and planning, code review, design, prototyping, diagrams, decks, research, reports, and custom editors.
  - The practical examples around PR review artifacts, design systems, animation sandboxes, flowcharts, status reports, and custom editors with export buttons.
  - The visual treatment for the embedded React component: masthead, paired Markdown/HTML panes, section/category cards, monospace output labels, and grouped artifact examples. The component adapts the pattern to Ylang Labs' Tailwind tokens rather than copying the source page.

### Simon Willison, "Using Claude Code: The Unreasonable Effectiveness of HTML"

- URL: https://simonwillison.net/2026/May/8/unreasonable-effectiveness-of-html/
- Author: Simon Willison
- Published: 2026-05-08
- Used for:
  - Provenance for the original Thariq Shihipar X post.
  - The framing that HTML can include SVG diagrams, interactive widgets, in-page navigation, and richer explanation surfaces.
  - The note that Simon had historically defaulted to Markdown for token-efficiency reasons and was reconsidering that default for output.

### Thariq Shihipar, "Using Claude Code: The Unreasonable Effectiveness of HTML"

- URL: https://x.com/trq212/status/2052809885763747935
- Author: Thariq Shihipar
- Published: May 2026, corroborated by Simon Willison's May 8, 2026 link post.
- Used for:
  - User-provided primary-source provenance.
  - Not directly quoted because the unauthenticated fetch did not expose the full X post content during drafting.

### CommonMark, "CommonMark Spec 0.31.2"

- URL: https://spec.commonmark.org/0.31.2/
- Author: John MacFarlane
- Published: 2024-01-28
- Used for:
  - The definition of Markdown as a plain text format for structured documents.
  - The readability-first framing of Markdown source.
  - The caveat that Markdown implementations historically diverged, which supports keeping claims about Markdown scoped to source readability rather than universal rendering precision.

### MDN Web Docs, "HTML: HyperText Markup Language"

- URL: https://developer.mozilla.org/en-US/docs/Web/HTML
- Publisher: MDN Web Docs
- Used for:
  - The claim that HTML is the basic building block of the web and defines web content structure.
  - The distinction that CSS handles presentation and JavaScript handles behavior around HTML.

## Visual Assets

The blog artwork uses the provided square raster source image, renamed to `source-image.png`, and cropped into the standard Ylang Labs blog dimensions.

| Asset                                                                       | Source                          | Use                              |
| --------------------------------------------------------------------------- | ------------------------------- | -------------------------------- |
| `public/static/images/blogs/html-vs-markdown-agent-output/source-image.png` | User-provided source image      | Crop source                      |
| `public/static/images/blogs/html-vs-markdown-agent-output/cardImage.png`    | Cropped from `source-image.png` | Blog listing card at `1080x1920` |
| `public/static/images/blogs/html-vs-markdown-agent-output/blogHeader.png`   | Cropped from `source-image.png` | Post banner at `1260x700`        |

## Claim Boundaries

- The post does not claim HTML should replace Markdown universally.
- The post frames HTML as a temporary or task-specific review surface, and Markdown or structured data as the durable record.
- The post does not claim generated HTML is safe by default. It explicitly treats generated HTML as code that should not contain secrets or private data.
