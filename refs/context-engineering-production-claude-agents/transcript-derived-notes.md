# Transcript-Derived Notes: Getting More Out of the Claude Platform

Source video: https://www.youtube.com/watch?v=7oO37GRhwGk
Official session page: https://claude.com/code-with-claude/session/sf-getting-more-out-of-the-claude-platform
Session: "Getting more out of the Claude Platform"
Speaker: Brad Abrams, Product Management Lead, Claude Platform, Anthropic
Event: Code w/ Claude 2026, San Francisco, May 6, 2026

## Extraction Notes

YouTube did not expose manual subtitles or automatic captions for this video, so the raw source was transcribed from audio locally with yt-dlp, ffmpeg, and mlx-whisper using mlx-community/whisper-small.en-mlx. One advisor-demo section was re-transcribed separately because the first pass repeated a phrase incorrectly.

This is a timestamped, paraphrased transcript outline rather than a full verbatim transcript.

## Timestamped Outline

### 00:00-01:20: Why Production Agents Are Different

The session opens by framing production agents as a different problem from demos and proofs of concept. The practical concerns are cost, reliability, latency, and whether teams can keep those under control once agents run long enough to use many tools and accumulate context.

### 01:20-04:45: Prompt Caching Should Be the Default

Long-running agents repeatedly send many of the same prompt sections back to the model, especially system instructions, tool definitions, and earlier tool-call history. Prompt caching lets developers mark stable sections so they can be reused. The session emphasizes three benefits: lower input-token cost, faster time to first token, and better rate-limit utilization for cache reads on supported models.

The speaker points builders to the Claude Console prompt-cache analytics dashboard and mentions a Claude Code skill that can inspect an app and help improve the cache hit rate.

### 04:45-07:55: Demo Setup: Hero Corp AI

The live demo starts with an intentionally rough executive dashboard, then Claude Code is used to restyle it into a fictional "Hero Corp AI" dashboard. The dashboard shows business objectives, superhero retention, updates, CEO tasks, and a developer console that exposes context usage, tool calls, cache writes, cache hits, and an agent transcript.

The first run has a near-zero cache hit rate. After adding cache-control markers and reorganizing prompt segments, the demo shows cache writes on first use and cache hits on repeated agent-loop turns.

### 07:55-10:35: The Context Problem

Even a very large context window can fill up quickly when tools return bulk data from systems such as Slack, Gong, Salesforce, and other enterprise sources. The speaker defines context engineering as deciding what should actually enter the model context, and warns against abstractions that hide the full transcript from the developer.

### 10:35-13:30: Tool Search

Tool search addresses the problem of large tool declarations. Instead of loading every possible tool definition into the prompt upfront, tools are declared but deferred. The model asks for the capabilities it needs, and only the relevant tool definitions are inserted just in time.

The session uses Lovable as an example customer that reduced token usage and improved model behavior by keeping unnecessary tool definitions out of context.

### 13:30-16:20: Programmatic Tool Calling

Programmatic tool calling addresses the problem of oversized tool results. Rather than forcing every result into the model context, the model can write code to inspect the returned data, understand the schema, and print only the small pieces it needs.

In the demo, the model calls the same tools as before, but their full outputs stay in memory. The model extracts specific fields and snippets from structured data, so only selected evidence enters the context.

### 16:20-20:10: Compaction

Compaction is presented as the blunt but necessary technique for very long-running agents. Once old turns are no longer useful in full detail, the system summarizes them into a compact state that preserves the work thread without carrying every previous tool call and result.

The demo sets a lower compaction threshold than the full context size to show that teams can trade off cost, latency, and intelligence by choosing when to compact.

### 20:10-21:15: Cost Pressure from Premium Models

After prompt caching and context engineering, the demo still costs too much per page load because the agent is using an expensive model for all work. The speaker argues that smaller models can handle much of the tool calling and code-writing work, but may still need help on high-stakes reasoning.

### 21:15-23:00: Advisor Strategy

The advisor strategy pairs a lower-cost executor model with a stronger advisor model. The analogy is a junior engineer getting review from a senior engineer: the senior does not do every task, but reviews difficult cases, design decisions, or high-impact work.

The session describes an executor asking a stronger advisor to review the transcript and provide guidance only when needed. Bolt is mentioned as a customer using this approach to manage cost.

### 23:00-25:10: Advisor Demo

The demo switches from using Opus for everything to using Sonnet as the primary executor with Opus as an advisor. The business case is a Metropolis renewal for Hero Corp AI. The cheaper executor initially thinks the renewal is on track, but the advisor catches a buried requirement involving Cryo-Thing and the mayor's expectations.

The demo then shows an actionable CEO task: lock in Cryo-Thing to improve the odds of winning the Metropolis renewal.

### 25:10-28:15: Wrap-Up and Platform Notes

The session closes with three main recommendations: use prompt caching, practice explicit context engineering, and apply advisor-style on-demand intelligence where expensive reasoning is justified.

The speaker also calls out recent platform work including workload identity federation for API-key risk reduction and the Anthropic CLI, which gives command-line access to many console operations and works well with Claude Code.
