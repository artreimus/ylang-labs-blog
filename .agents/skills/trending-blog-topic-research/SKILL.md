---
name: trending-blog-topic-research
description: Autonomously research current technical conversations across Hacker News, Twitter/X, Reddit, and supporting web sources, then propose exactly 5 strong Ylang Labs blog topic candidates. Use this skill whenever the user asks for trending blog ideas, topic research, what to write about next, Hacker News/Twitter/Reddit trend scans, content ideation from social signals, or a shortlist of possible posts.
---

# Trending Blog Topic Research

Use this skill to autonomously turn current technical discourse into five blog ideas that fit the Ylang Labs publication: practical AI engineering, agents, LLM systems, RAG, evaluation, ML infrastructure, developer tooling, and implementation lessons.

The goal is not to list what is viral. The goal is to find topics with enough current momentum, technical depth, and durable writing value to become credible Ylang Labs articles.

## Autonomous Behavior

Do the research yourself. Do not ask the user to provide links, screenshots, keywords, or source lists unless the requested niche is impossible to infer.

Default assumptions:

- Focus on AI engineering and developer-facing implementation topics unless the user specifies another niche.
- Use the current date and an explicit research window.
- Scan Hacker News, Twitter/X or credible proxies, Reddit, and supporting web sources.
- Return exactly 5 blog topic candidates, ranked strongest to weakest.
- Include source links, dates or recency notes, and source limitations.
- Prefer practical article angles that can later hand off to `blog-authoring` or `end-to-end-blog-creation`.

If a platform is inaccessible, continue with the best available public substitutes and clearly label the limitation. Never fabricate unavailable social posts, engagement counts, authors, or quotes.

## Source Strategy

Use the best available tools in the current environment. If a tool supports live web access, use it; do not rely on memory for trend research.

- Hacker News:
  - Prefer HN search, Algolia HN search, front page, `new`, `best`, `show`, and relevant comment threads.
  - Look for repeated terms, high-comment stories, and debates with implementation substance.
- Twitter/X:
  - Use available web search, social search, or connector access if present.
  - If direct Twitter/X access is unavailable or login-gated, say so and use indexed tweets, public trend pages, newsletters, GitHub releases, and web mentions as proxies.
  - Never invent tweet contents, authors, counts, or screenshots.
- Reddit:
  - Check relevant subreddits such as `r/LocalLLaMA`, `r/MachineLearning`, `r/artificial`, `r/OpenAI`, `r/ClaudeAI`, `r/ChatGPTCoding`, `r/programming`, `r/webdev`, `r/devops`, `r/selfhosted`, and niche communities implied by the request.
  - Prefer posts with meaningful comments over low-context link drops.
- Supporting web:
  - Use official docs, release notes, GitHub repositories, papers, company blogs, benchmark posts, or primary announcements to verify technical facts.
  - Use Context7 for library/framework details when a candidate depends on implementation APIs.
  - Use web search when Context7 is insufficient or the topic is not a library/framework.

Use recency filters when available. For trend research, default to the last 7-14 days; widen to 30 days if the signal is sparse. If the user asks for "today" or "latest", verify the current date before searching and prioritize the freshest sources.

## Research Workflow

1. Define the research frame.

   - Infer the domain from the user request.
   - Default domain: AI agents, LLM apps, RAG, evals, inference, ML tooling, and production AI engineering.
   - Record the date range used.

2. Run independent searches.

   - Search each required platform or proxy separately instead of using one broad web query.
   - Use platform-specific queries such as Hacker News AI agents last week, Reddit LocalLLaMA RAG production, and Twitter/X AI coding agents recent discussion.
   - Search supporting primary sources for any product, paper, benchmark, or library that becomes a candidate.

3. Collect candidate signals.

   - Gather at least 12-20 raw signals when tools allow.
   - Include a mix of HN, Twitter/X or proxies, Reddit, and primary web sources.
   - Note title/topic, source, URL, date, rough engagement signal, and why it matters.

4. Cluster and deduplicate.

   - Merge repeated stories across platforms into one theme.
   - Separate product-release noise from engineering questions.
   - Watch for the same announcement being reposted everywhere; it should not count as independent validation unless discussion differs by community.

5. Score each cluster.

   - Momentum: visible discussion across sources or unusually deep discussion in one source.
   - Ylang fit: relevance to AI engineering, agents, LLM systems, RAG, evaluation, ML infra, or developer workflows.
   - Novel angle: a specific thesis beyond "what is X".
   - Implementability: room for code, architecture, diagrams, benchmarks, or operational lessons.
   - Durability: likely to remain useful after the trend cycle fades.

6. Select exactly 5 topics.

   - Prefer topics with cross-platform evidence.
   - Include one contrarian or under-discussed angle if it is defensible.
   - Avoid pure news summaries, celebrity/company gossip, investment takes, culture-war bait, and posts that cannot be verified with primary sources.

7. Prepare next-step handoff.
   - If the user wants to proceed with one topic, hand off to `blog-authoring` or `end-to-end-blog-creation`.
   - If working inside the Ylang Labs blog repo, save the final shortlist to `posts/topic-research-YYYY-MM-DD.md` unless the user asked for chat-only output or the environment is read-only.

## Output Format

Return the result in this structure:

```markdown
# Trending Blog Topic Shortlist - YYYY-MM-DD

Research window: <date range>
Focus: <inferred or user-provided focus>
Source coverage: Hacker News, Twitter/X <or proxy note>, Reddit, supporting web
Source limitations: <state direct access gaps or "None">

## Top 5 Blog Topics

### 1. <Specific working title>

Thesis: <one-sentence argument the article would make>
Why now: <trend signal and timing>
Ylang angle: <why this fits the publication>
Evidence:

- <Source/platform>: <linked title or concise description> (<date or recency>)
- <Source/platform>: <linked title or concise description> (<date or recency>)
  Article shape:
- Opening hook: <specific hook>
- Technical sections: <3-5 concrete sections>
- Demo/diagram idea: <one implementation artifact, diagram, benchmark, or experiment>
  Risk: <what could make this weak, stale, or hard to substantiate>

<!-- repeat through exactly 5 -->

## Recommendation

Pick: <best candidate>
Reason: <why it has the best mix of timeliness, technical depth, and Ylang fit>

## Raw Signals Reviewed

- <brief source list or clusters reviewed>
```

Keep the five topic entries comparable in detail. If source access is limited, include an explicit `Source limitations` note before the Top 5 section.

## Quality Bar

Before finalizing, check that:

- There are exactly 5 proposed blog topics.
- Every topic has a thesis, why-now signal, Ylang angle, evidence, article shape, and risk.
- The list is based on current or explicitly dated sources, not stale memory.
- Technical claims are backed by primary sources when possible.
- Twitter/X evidence is not fabricated when direct access is unavailable.
- The recommended pick is justified by the scoring criteria, not personal taste.
- The output can be used directly as a brief for drafting a Ylang Labs blog post.
