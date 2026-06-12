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
