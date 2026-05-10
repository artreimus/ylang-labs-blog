# Source Packet: Context Engineering Production Claude Agents

## Topic

Working title: Production Agents Need Context Engineering, Not Just Bigger Models

This article is based on a paraphrased, timestamped transcript outline supplied by the user from the Code w/ Claude 2026 session "Getting more out of the Claude Platform." The outline is not a full verbatim transcript.

## Primary Sources

1. User-provided transcript-derived notes

   - Local path: `refs/context-engineering-production-claude-agents/transcript-derived-notes.md`
   - Source video: https://www.youtube.com/watch?v=7oO37GRhwGk
   - Note: YouTube did not expose subtitles or automatic captions through `yt-dlp`; the user supplied a paraphrased timestamped outline.

2. Official session page: "Getting more out of the Claude Platform"
   - URL: https://claude.com/code-with-claude/session/sf-getting-more-out-of-the-claude-platform
   - Publisher: Anthropic / Claude
   - Event date: May 6, 2026
   - Accessed: 2026-05-10
   - Use: Confirms session title, speaker, event, date, and official framing: cut cost, manage context, boost intelligence through prompt caching, tool search, programmatic tool calling, compaction, and advisor strategy.

## Supporting Product Documentation

3. Prompt caching

   - URL: https://platform.claude.com/docs/en/build-with-claude/prompt-caching
   - Publisher: Anthropic
   - Accessed: 2026-05-10
   - Use: Confirms cache behavior, cacheable prefixes, TTLs, pricing multipliers, and usage fields.

4. Tool search tool

   - URL: https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool
   - Publisher: Anthropic
   - Accessed: 2026-05-10
   - Use: Confirms deferred tool loading, search variants, tool-reference expansion, and best-use guidance.

5. Programmatic tool calling

   - URL: https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling
   - Publisher: Anthropic
   - Accessed: 2026-05-10
   - Use: Confirms the pattern where Claude writes code in a code execution container to call tools, aggregate results, and reduce context payloads.

6. Compaction

   - URL: https://platform.claude.com/docs/en/build-with-claude/compaction
   - Publisher: Anthropic
   - Accessed: 2026-05-10
   - Use: Confirms server-side compaction behavior for long-running conversations and agentic workflows, including beta status and beta-header requirements.

7. Advisor tool

   - URL: https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool
   - Publisher: Anthropic
   - Accessed: 2026-05-10
   - Use: Confirms the executor/advisor model pattern, beta status, and intended long-horizon workloads.

8. Workload Identity Federation

   - URL: https://platform.claude.com/docs/en/manage-claude/workload-identity-federation
   - Publisher: Anthropic
   - Accessed: 2026-05-10
   - Use: Confirms the static-secret replacement model for workloads using short-lived access tokens.

9. Claude Code overview
   - URL: https://code.claude.com/docs/en/overview
   - Publisher: Anthropic
   - Accessed: 2026-05-10
   - Use: Confirms current Claude Code positioning as an agentic coding tool available across terminal, IDE, desktop, and browser.

## Image Generation

- Prompt log: `refs/context-engineering-production-claude-agents/image-generation-prompt.md`
- Source artwork: `public/static/images/blogs/context-engineering-production-claude-agents/source-diagram.png`
- Final blog assets:
  - `public/static/images/blogs/context-engineering-production-claude-agents/blogHeader.png` at 1260x700
  - `public/static/images/blogs/context-engineering-production-claude-agents/cardImage.png` at 1080x1920

## Editorial Notes

- Treat the transcript-derived outline as the source for the session narrative, examples, and sequence.
- Treat official docs as the source for current implementation details and avoid claiming that every session feature is generally available without checking beta/availability status.
- Do not publish the article as a verbatim transcript. The user supplied paraphrased notes, and the blog should be an engineering interpretation of the patterns.
