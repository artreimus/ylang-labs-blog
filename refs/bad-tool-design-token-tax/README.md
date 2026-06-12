# Bad Tool Design Is the New Token Tax

Source packet for `data/blogs/bad-tool-design-token-tax.mdx`.

## Sources

- Anthropic, "Tool search tool," Claude API Docs, accessed 2026-06-12.
  - URL: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool
  - Used for the claims that large tool catalogs create context bloat and tool-selection problems, that tool search loads only relevant tools on demand, and that deferred loading can preserve prompt caching.
- Anthropic, "Manage tool context," Claude API Docs, accessed 2026-06-12.
  - URL: https://platform.claude.com/docs/en/agents-and-tools/tool-use/manage-tool-context
  - Used for the framing that context management in tool-heavy systems needs explicit engineering rather than passive prompt growth.
- Anthropic, "Define tools," Claude API Docs, accessed 2026-06-12.
  - URL: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools
  - Used for guidance on tool descriptions, consolidating related tools, namespacing, and returning high-signal responses with stable identifiers.
- Hacker News, "Bad MCP design costs your agent 5x more tokens," accessed 2026-06-12.
  - URL: https://news.ycombinator.com/item?id=48407391
  - Used as a community signal that practitioners are measuring MCP/tool token overhead. The post does not rely on the HN thread as the sole factual basis for the article.

## Issue Brief

- GitHub issue: https://github.com/artreimus/ylang-labs-blog/issues/94
- Working title: Bad Tool Design Is the New Token Tax
- Slug: `bad-tool-design-token-tax`
- Audience: developers building MCP servers, agent runtimes, and tool-heavy LLM apps.
- Primary takeaway: tool definitions and results should be optimized for the agent's next step, or teams will pay through cost, latency, and lower reliability.

## Generated Assets

- `public/static/images/blogs/bad-tool-design-token-tax/source-artwork.png`
  - Default painterly cover artwork for the post.
- `public/static/images/blogs/bad-tool-design-token-tax/tool-loop-comparison.png`
  - Wide inline technical diagram comparing a wasteful tool loop with a compact tool-search loop.
- `public/static/images/blogs/bad-tool-design-token-tax/payload-shaping-comparison.png`
  - Wide inline technical diagram comparing a raw provider payload with an agent-shaped result.

The inline diagrams intentionally use short labels only. Exact claims and interpretation live in the MDX captions and surrounding prose.
