# The Next API Must Work for Agents, Not Just Humans

Source packet for `data/blogs/next-api-for-agents-not-humans.mdx`.

Access date for web sources: 2026-07-10.

## Source Log

1. GitHub Issue #104, "[Blog] The Next API Is for Agents, Not Humans"

   - URL: https://github.com/artreimus/ylang-labs-blog/issues/104
   - Publisher: Ylang Labs content calendar
   - Publication date: 2026-07-09
   - Use: Primary content brief, slug, working title, tags, angle, target audience, and acceptance criteria.

2. OpenAI Docs, "Function calling"

   - URL: https://developers.openai.com/api/docs/guides/function-calling
   - Publisher: OpenAI
   - Use: Primary documentation for tool definitions, JSON Schema parameters, strict-mode enforcement, and strict-mode schema requirements.

3. Anthropic Docs, "Define tools"

   - URL: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools
   - Publisher: Anthropic
   - Use: Primary documentation for tool names, descriptions, input schemas, and the tradeoff between fewer consolidated tools and selection ambiguity.

4. Model Context Protocol, "Tools"
   - URL: https://modelcontextprotocol.io/specification/2025-11-25/server/tools
   - Publisher: Model Context Protocol
   - Specification date: 2025-11-25
   - Use: Primary specification for MCP tool metadata, input schemas, output schemas, annotations, result content, and error signaling.

## Claim Map

- The post's central claim comes from the issue brief: agent-era interface design has moved into tool schemas, parameter names, CLI help, edit primitives, and result payload shapes.
- The deployment workflow is an original illustrative example created for the post. It does not describe a production Ylang Labs system or claim measured results.
- OpenAI, Anthropic, and MCP documentation anchor the API-design claims in current tool-calling contracts. OpenAI's strict-mode documentation supports the distinction between declaring a schema and enforcing it.
- The Mermaid diagram is original and compares a generic service update with a task-shaped deployment operation that carries preconditions, stable identifiers, status, and next actions.

## Cover Artwork

Source artwork generated with the Ylang Labs oil-painting blog artwork workflow.

Prompt summary: a Dutch Golden Age inspired engineering workshop where a human-readable console, command manual, and machine-readable tool schema are being refactored into a clean mechanical interface for an autonomous agent. The generated square source image was saved as `public/static/images/blogs/next-api-for-agents-not-humans/source-artwork.png`, then cropped into `cardImage.png` and `blogHeader.png`.
