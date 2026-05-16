# Lossless Context Management Blog Source Log

Working slug: `lossless-context-management-lcm-agent-memory`

Access date: 2026-05-10

## Public Sources

1. [LCM: Lossless Context Management](https://www.losslesscontext.ai/)

   - Publisher: Voltropy / LCM project site
   - Use: Primary product explanation and visual direction. The site frames LCM as a replacement for lossy truncation with hierarchical summarization, fresh-tail protection, a summary DAG, and recall tools such as `lcm_describe`, `lcm_grep`, and `lcm_expand_query`.

2. [LCM: Lossless Context Management paper](https://papers.voltropy.com/LCM)

   - Authors: Clint Ehrlich and Theodore Blackman, Voltropy PBC
   - Date: 2026-02-14
   - Use: Technical claims about deterministic context compression, immutable message storage, active context assembly, summary DAGs, retrieval tools, large-file handling, three-level summarization escalation, operator-level recursion, and the reported OOLONG benchmark results.

3. [lossless-claw README](https://github.com/martian-engineering/lossless-claw/blob/main/README.md)

   - Publisher: Martian Engineering
   - Use: OpenClaw plugin positioning, install command, tool names, command surface, configuration defaults, and the implementation claim that raw messages stay in a SQLite database while summaries link back to source messages.

4. [ArgentOS LCM documentation](https://docs.argentos.ai/memory/lcm)
   - Publisher: ArgentOS
   - Use: Cross-check that the architecture is being adopted outside the original paper and plugin, especially the same immutable-store plus summary-DAG framing and configurable fresh-tail/threshold defaults.

## Visual Direction

The user asked for visuals like the LCM website. The generated images intentionally mirror the site's explanatory language: dark technical interface panels, token-budget bars, summary cards, fresh-tail labels, DAG nodes, pointer lines, and recall-tool modules. They do not copy site assets, logos, or exact layouts.

### Hero / Header Prompt

Create a refined editorial technical diagram image for a Ylang Labs AI engineering blog.

Subject: Lossless Context Management for long-running AI agents, showing an active context window, fresh tail, summary DAG, immutable message store, and recall tools as one coherent system. Diagram mode: black spec sheet. Canvas: wide 16:9 blog header source artwork, safe for cropping into 1260x700 and 1080x1920 blog assets. Palette: near-black background #0F0F0F, warm off-white linework #EDEDE8, muted graphite labels #8A8A86, faint construction grid #2A2A26, restrained accent yellow #EFC003 plus small green #75B34A indicators. Composition: central dark terminal-like context window on the left with token budget bar, four stacked compact summary cards, and a highlighted fresh-tail strip; to the right, a clean node-link summary DAG descending into tiny raw message blocks; bottom row has three small recall tool modules connected with thin leader lines. Leave generous negative space, crisp margins, no brand logos. Geometry: precise vector-like linework, thin strokes, orthographic UI panels, dashed guide lines, small arrows, circular numbered callouts, subtle glass-like flat fills only where needed. Typography: Helvetica/Arial headings and monospace technical labels, short readable labels only. Allowed labels: LCM, FRESH, D0, D1, D2, STORE, GREP, DESCRIBE, EXPAND, TOKENS. Avoid long sentences. Details: show old turns compressing into D0 summary nodes, D0 nodes condensing into D1/D2, all nodes retaining fine pointer lines back to raw message blocks. The mood should match a scroll-driven technical website visualization, not a marketing hero. Style: clean technical manual, product teardown, black interface-module spec sheet, editorial and premium. Quality: high-resolution, crisp linework, balanced spacing, legible structure, no clutter, image-generation friendly labels. Avoid: photorealistic 3D render, stock illustration, cartoon style, glossy gradients, messy handwriting, misspelled labels, random text, brand logos, watermarks, signatures, copied website assets.

### Inline Compaction Prompt

Create a refined editorial technical diagram image for a Ylang Labs AI engineering blog.

Subject: the Lossless Context Management compaction cycle, from raw conversation turns to leaf summaries, condensed summaries, and targeted expansion back to source messages. Diagram mode: process architecture sheet with dark technical website styling. Canvas: wide 16:9 inline plate for an MDX article, readable inside a blog body. Palette: near-black background #0F0F0F, warm off-white #EDEDE8, muted gray #8A8A86, faint construction grid #2A2A26, accent yellow #EFC003, small green confirmation dots #75B34A. Composition: five horizontal lanes stacked vertically with hairline dividers. Lane 1: incoming messages and tool results as small terminal cards. Lane 2: protected fresh tail at the right edge. Lane 3: threshold crossing and async compaction. Lane 4: D0 summaries condense into D1 and D2 nodes. Lane 5: retrieval path where GREP, DESCRIBE, and EXPAND trace a highlighted route back to raw source cards. Use numbered circles 01-05, compact callout boxes, and clear left-to-right flow. Geometry: precise vector-like linework, thin strokes, orthographic construction, dashed guide lines, small arrows, tree/DAG nodes, tiny token bars, stable grid alignment. Typography: Helvetica/Arial headings and monospace technical labels, short readable labels only. Allowed labels: RAW, FRESH, THRESHOLD, D0, D1, D2, GREP, DESCRIBE, EXPAND, SOURCE, TOKENS. Avoid long sentences. Details: show a thick highlighted path from a D2 summary through a D1 node and D0 node to specific raw messages; show all non-selected messages faded but still present to communicate lossless storage. Style: clean technical manual, interface process map, restrained and premium, matching a scroll-driven technical explanation website. Quality: high-resolution, crisp linework, balanced spacing, legible structure, no clutter, image-generation friendly labels. Avoid: photorealistic 3D render, stock illustration, cartoon style, glossy gradients, messy handwriting, misspelled labels, random text, brand logos, watermarks, signatures, copied website assets.

### Card Prompt

Create a refined editorial technical diagram image for a Ylang Labs AI engineering blog.

Subject: Lossless Context Management as a vertical memory stack for AI agents, preserving every message while keeping the active context bounded. Diagram mode: black spec sheet, portrait poster. Canvas: portrait 9:16 blog card composition, safe to crop or resize to 1080x1920. Palette: near-black background #0F0F0F, warm off-white linework #EDEDE8, muted graphite labels #8A8A86, faint construction grid #2A2A26, accent yellow #EFC003, small green #75B34A status dots. Composition: a tall central summary DAG rising from many small raw message cards at the bottom into D0, D1, and D2 summary nodes at the top. A protected fresh-tail strip runs vertically along the right edge. A thin token-budget meter sits near the top. Three small recall modules, GREP, DESCRIBE, EXPAND, sit in a compact row near the lower third, connected by fine pointer lines to the highlighted path through the DAG. Leave generous black negative space and clean margins for card use. Geometry: precise vector-like linework, thin strokes, orthographic UI panels, dashed guide lines, small arrows, circular callouts, stable grid alignment. Typography: Helvetica/Arial headings and monospace technical labels, short readable labels only. Allowed labels: LCM, D0, D1, D2, RAW, FRESH, STORE, GREP, EXPAND, TOKENS. Avoid long sentences. Details: make the yellow highlighted path show exact recall from a high-level summary back to a raw message block. Make non-selected nodes faded but still visible. Style: clean technical manual, black interface-module spec sheet, editorial design poster, restrained and premium, matching a scroll-driven technical website visualization without copying it. Quality: high-resolution, crisp linework, balanced spacing, legible structure, no clutter, image-generation friendly labels. Avoid: photorealistic 3D render, stock illustration, cartoon style, glossy gradients, messy handwriting, misspelled labels, random text, brand logos, watermarks, signatures, copied website assets.
