# LLM Wiki

Source packet for `data/blogs/llm-wiki.mdx`.

Access date: 2026-05-15

## Sources Used

### Andrej Karpathy, "LLM Wiki"

- URL: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- Author: Andrej Karpathy
- Published: 2026-04-04, per GitHub gist metadata
- Used for:
  - The three-layer architecture: raw sources, wiki, schema.
  - The operations: ingest, query, lint.
  - The distinction between query-time RAG and a persistent, compounding wiki.
  - The moderate-scale note around `index.md`, roughly 100 sources and hundreds of pages.
  - The optional `qmd` search mention and the Obsidian workflow framing.

### qmd, local hybrid search for Markdown knowledge bases

- URL: https://github.com/tobi/qmd
- Publisher: GitHub repository
- Used for:
  - The claim that `qmd` provides local Markdown search with BM25, vector search, and reranking.
  - The practical note that search can sit under the maintained wiki when `index.md` is no longer enough.

### Vannevar Bush, "As We May Think"

- URL: https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/
- Author: Vannevar Bush
- Publisher: The Atlantic
- Published: 1945-07
- Used for:
  - Background context only. The post references it as a historical ancestor to associative personal knowledge systems through the reference list, not as a main argument.

## Claim Boundaries

- The post treats LLM Wiki as a pattern and idea file, not as a finished Karpathy product.
- The post does not claim that LLM Wiki replaces RAG. It frames RAG as a useful read path and LLM Wiki as a writeback and maintenance layer.
- The post does not rely on secondary summaries for core claims.

## Generated Visuals

Visuals use two durable repo-backed paths:

- **Deterministic SVG source plates rendered to PNG** for the hero/card and architecture image.
- **Built-in OpenAI `imagegen` output copied into the repo** for the three section plates, following
  the `technical-blog-image-generator` workflow.

Committed visual inventory:

| Asset                                                                       | Durable source or prompt record                | Use                                                    |
| --------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------ |
| `public/static/images/blogs/llm-wiki/blogHeader.svg`                        | SVG source in repo                             | Wide hero source                                       |
| `public/static/images/blogs/llm-wiki/blogHeader.png`                        | Rendered from `blogHeader.svg`                 | `images[0]` / post hero                                |
| `public/static/images/blogs/llm-wiki/card-artwork.svg`                      | SVG source in repo                             | Card source                                            |
| `public/static/images/blogs/llm-wiki/cardImage.png`                         | Rendered from `card-artwork.svg`               | Blog listing card                                      |
| `public/static/images/blogs/llm-wiki/source-diagram.svg`                    | SVG source in repo                             | Architecture source                                    |
| `public/static/images/blogs/llm-wiki/llm-wiki-architecture.png`             | Rendered from `source-diagram.svg`             | Architecture image in "compiler for knowledge" section |
| `public/static/images/blogs/llm-wiki/rag-vs-llm-wiki-writeback.png`         | Prompt spec below                              | RAG versus writeback section image                     |
| `public/static/images/blogs/llm-wiki/llm-wiki-operating-contract.png`       | Prompt spec below                              | Operating contract section image                       |
| `public/static/images/blogs/llm-wiki/llm-wiki-failure-modes-guardrails.png` | Prompt spec below plus local label repair note | Failure modes section image                            |

Deterministic SVG plate specs:

1. **Hero/header and card**

   - Mode: editorial technical framework poster.
   - Subject: LLM Wiki as a knowledge compilation pipeline.
   - Palette: Ylang paper, graphite ink, faint grid, Ylang yellow for the agent compiler, Ylang green for maintained wiki artifacts.
   - Structure: raw sources, agent compiler, maintained wiki, schema, answer/writeback.
   - Outputs:
     - `blogHeader.svg` -> `blogHeader.png` at `1260x700`.
     - `card-artwork.svg` -> `cardImage.png` at `1080x1920`.

2. **Architecture source diagram**

   - Mode: process architecture sheet.
   - Subject: raw sources, schema, agent compiler, maintained wiki, answer, and writeback loop.
   - Palette: Ylang paper, graphite ink, faint grid, Ylang yellow for compiler work, Ylang green for persisted wiki artifacts.
   - Output: `source-diagram.svg` -> `llm-wiki-architecture.png` at `1600x900`.

Prompt specs:

1. **RAG vs LLM Wiki writeback**

   - Mode: process architecture sheet.
   - Subject: query-time RAG read path versus LLM Wiki compile and writeback path.
   - Palette: neutral paper, graphite ink, faint grid, Ylang yellow for writeback, Ylang green for maintained wiki artifacts.
   - Required labels: `RAG`, `retrieve`, `answer`, `LLM Wiki`, `compile`, `writeback`, `index`, `log`.

2. **LLM Wiki operating contract**

   - Mode: blueprint teardown.
   - Subject: three operator workflows for an agent-maintained wiki: ingest, query, lint.
   - Palette: neutral paper, graphite ink, faint grid, Ylang yellow for agent work, Ylang green for verified artifacts.
   - Required labels: `ingest`, `query`, `lint`, `source id`, `citations`, `diff`, `log`, `review`.

3. **Failure modes and guardrails**
   - Mode: process architecture sheet.
   - Subject: hallucination propagation, stale confidence, permission collapse, and wiki sprawl paired with source IDs, verification dates, access labels, and lint health.
   - Palette: neutral paper, graphite ink, faint grid, amber warnings, green verification, muted red risk markers.
   - Required labels: `hallucination`, `stale`, `permissions`, `sprawl`, `source id`, `verified date`, `access labels`, `lint health`.
   - Note: the generated raster had a spelling error in the `permissions` heading; a narrow local raster overlay corrected that label without changing the rest of the diagram.
