# The Next API Is for Agents, Not Humans

Source packet for `data/blogs/next-api-for-agents-not-humans.mdx`.

Access date for web sources: 2026-07-10.

## Source Log

1. GitHub Issue #104, "[Blog] The Next API Is for Agents, Not Humans"

   - URL: https://github.com/artreimus/ylang-labs-blog/issues/104
   - Publisher: Ylang Labs content calendar
   - Publication date: 2026-07-09
   - Use: Primary content brief, slug, working title, tags, angle, target audience, and acceptance criteria.

2. Armin Ronacher, "Better Models: Worse Tools"

   - URL: https://lucumr.pocoo.org/2026/7/4/better-models-worse-tools/
   - Publisher: lucumr.pocoo.org
   - Publication date: 2026-07-04
   - Use: Practitioner evidence that model-tool interactions can fail at schema and harness boundaries even when the model produces a semantically correct edit.

3. Simon Willison, "Using DSPy to evaluate and improve Datasette Agent's SQL system prompts"

   - URL: https://simonwillison.net/2026/Jul/2/dspy-datasette-agent-prompts/
   - Publisher: Simon Willison's Weblog
   - Publication date: 2026-07-02
   - Use: Practitioner evidence that prompt/tool interface design can be measured, iterated, and optimized against task outcomes.

4. Simon Willison, "Have your agent record video demos of its work with shot-scraper video"

   - URL: https://simonw.substack.com/p/have-your-agent-record-video-demos
   - Publisher: Simon Willison's Substack
   - Publication date: 2026-07-05
   - Use: Practitioner evidence that CLI affordances and agent-readable workflows matter when agents need to operate software, inspect output, and produce durable evidence.

5. OpenAI Docs, "Function calling"

   - URL: https://developers.openai.com/api/docs/guides/function-calling
   - Publisher: OpenAI
   - Use: Primary documentation for tool definitions, JSON Schema parameters, strict-mode enforcement, and strict-mode schema requirements.

6. Anthropic Docs, "Tool use with Claude"

   - URL: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
   - Publisher: Anthropic
   - Use: Primary documentation for tool names, descriptions, and input schemas as model-facing API contracts.

7. Model Context Protocol, "Tools"
   - URL: https://modelcontextprotocol.io/specification/2025-11-25/server/tools
   - Publisher: Model Context Protocol
   - Specification date: 2025-11-25
   - Use: Primary specification for MCP tool metadata, input schemas, output schemas, annotations, result content, and error signaling.

## Claim Map

- The post's central claim comes from the issue brief: agent-era interface design has moved into tool schemas, parameter names, CLI help, edit primitives, and result payload shapes.
- Armin Ronacher and Simon Willison are used as practitioner evidence streams, not as exhaustive proof.
- OpenAI, Anthropic, and MCP documentation anchor the API-design claims in current tool-calling contracts. OpenAI's strict-mode documentation supports the distinction between declaring a schema and enforcing it.
- The Mermaid diagram is original and compares two interface styles: a human-oriented surface that relies on hidden judgment and an agent-oriented API that carries typed inputs, compact results, stable identifiers, and next actions.

## Cover Artwork

Source artwork generated with the Ylang Labs oil-painting blog artwork workflow.

Prompt summary: a Dutch Golden Age inspired engineering workshop where a human-readable console, command manual, and machine-readable tool schema are being refactored into a clean mechanical interface for an autonomous agent. The generated square source image was saved as `public/static/images/blogs/next-api-for-agents-not-humans/source-artwork.png`, then cropped into `cardImage.png` and `blogHeader.png`.
