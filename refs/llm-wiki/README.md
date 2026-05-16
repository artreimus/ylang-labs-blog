# LLM Wiki

Source packet for `data/blogs/llm-wiki.mdx`.

Access date: 2026-05-16

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
  - The note that current qmd exposes agent-friendly outputs and an MCP server.

### Synthadoc, LLM knowledge compilation engine

- URL: https://github.com/axoviq-ai/synthadoc
- Publisher: GitHub repository
- Accessed: 2026-05-16
- Used for:
  - Candidate staging for low-confidence or not-yet-reviewed wiki pages.
  - Routing, audit trail, source ingest, and linting concepts in larger LLM Wiki-style systems.

### OpenKB, open LLM knowledge base

- URL: https://github.com/VectifyAI/OpenKB
- Publisher: GitHub repository
- Accessed: 2026-05-16
- Used for:
  - The compiled-wiki framing around source summaries, concepts, cross-links, index updates, log updates, and lint loops.
  - The note that a single source can touch many wiki pages during compilation.

### nvk/llm-wiki, topic-isolated LLM Wiki implementation

- URL: https://github.com/nvk/llm-wiki
- Project site: https://llm-wiki.net/
- Publisher: GitHub repository
- Accessed: 2026-05-16
- Used for:
  - Isolated topic wikis under a lightweight hub.
  - The practical recommendation to start with a scoped topic wiki rather than a universal wiki.

### Ss1024sS/LLM-wiki, setup and ingest pipeline

- URL: https://github.com/Ss1024sS/LLM-wiki
- Ingest pipeline reference: https://raw.githubusercontent.com/Ss1024sS/LLM-wiki/main/docs/ingest-pipeline.md
- Publisher: GitHub repository
- Accessed: 2026-05-16
- Used for:
  - Deterministic raw intake before LLM synthesis.
  - Source hashes, duplicate detection, stale reporting, manifest output, and cheap local metadata extraction.

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

Visuals are committed as PNG assets. Earlier SVG source notes were removed because the final tracked asset directory only contains the rendered PNGs.

Committed visual inventory:

| Asset                                                                       | Durable source or prompt record                | Use                                                  |
| --------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------- |
| `public/static/images/blogs/llm-wiki/blogHeader.png`                        | Generated artwork, final PNG                   | `images[0]` / post hero                              |
| `public/static/images/blogs/llm-wiki/cardImage.png`                         | Generated artwork, final PNG                   | Blog listing card at `1080x1920`                     |
| `public/static/images/blogs/llm-wiki/llm-wiki-architecture.png`             | Generated architecture artwork, final PNG      | Architecture image in "build one topic wiki" section |
| `public/static/images/blogs/llm-wiki/rag-vs-llm-wiki-writeback.png`         | Prompt spec below                              | RAG versus writeback section image                   |
| `public/static/images/blogs/llm-wiki/llm-wiki-operating-contract.png`       | Prompt spec below                              | Operating contract section image                     |
| `public/static/images/blogs/llm-wiki/llm-wiki-failure-modes-guardrails.png` | Prompt spec below plus local label repair note | Failure modes section image                          |

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
