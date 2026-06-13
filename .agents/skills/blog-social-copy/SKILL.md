---
name: blog-social-copy
description: Generate human, thesis-driven social copy for Ylang Labs blog posts and projects. Use this skill when asked to create or revise a LinkedIn post, tweet, launch post, social media post, launch copy, or promotional copy for a blog or project, especially when the user wants it to feel less commercial or more human. It produces 2-3 distinct variations with a sharp first line, concrete technical stakes, practical implications, and a natural link pointer.
---

# Blog Social Copy

Use this skill to create human, specific social media variations for blogs or project updates.

The default social-copy standard is The Pragmatic Engineer by Gergely Orosz as an editorial reference. Do not imitate his exact prose, recurring phrasing, or author persona.

The default output should feel like a capable builder sharing a useful observation, not a brand account pushing a launch. It can still have a clear thesis, concrete stakes, practical implications, and a link pointer, but it should sound like a person who has been thinking about the problem.

Do not make the copy sound like a generic announcement, SEO snippet, newsletter blurb, or press release.

Lead with the problem, mechanism, or shift. Do not merely announce that Ylang Labs wrote something.

If the user says "more human," "less commercial," "sounds like a commercial," or similar, prioritize the human rewrite over the launch-copy pattern:

- Use first-person sparingly when it helps: "I think...", "I keep coming back to...", "I wrote down..."
- Prefer plain link pointers such as "Notes here: [URL]" or "I put the checklist here: [URL]".
- Remove polished launch phrasing like "we wrote about," "read it here," "latest blog," and "what this unlocks."
- Keep one concrete proof point from the article, then stop. Do not stack evidence like an ad.
- Make the rhythm slightly less perfect. Short, direct sentences often sound more human than balanced marketing paragraphs.

## Core Mandates

- **Structure:** Each post MUST contain:
  1. A sharp, stand-alone hook that makes a claim.
  2. A concrete explanation of what changed, why it matters, or what the reader can now build.
  3. At least one practical implication, such as latency, privacy, cost, deployment, reliability, evaluation, or developer workflow.
  4. A natural link pointer with `[URL]` unless the final URL is known.
- **Ambition:** The hook should make a bold, defensible claim about an engineering shift, failure mode, or payoff. Avoid neutral topic summaries.
- **Proof Anchor:** Every ambitious claim needs at least one concrete anchor from the article: a named model, paper, product, framework, architecture, workflow, number, tradeoff, or failure mode.
- **Reader Payoff:** Make clear what the reader will understand, build, fix, avoid, or decide after clicking.
- **Inside-View Signal:** When the article supports it, include a specific operating detail: scale, architecture, migration path, incident pattern, team workflow, evaluation result, or cost/reliability implication.
- **Default LinkedIn Shape:** Prefer the pattern:
  1. One-line thesis or first-person observation.
  2. A short paragraph grounding the point in a model, architecture, workflow, or problem.
  3. A short paragraph naming the practical implication.
  4. A natural link pointer that does not sound like an ad.
- **Persistence:** Always write the final variations into a markdown file within the `/posts/` directory (e.g., `/posts/social-media-[topic].md`).
- **Length:** Match the platform:
  - LinkedIn: 500-900 characters by default, with short paragraphs and no filler.
  - X/Twitter: 240-280 characters when a short variant is requested.
  - Generic social launch copy: 400-700 characters.
- **Tone:** Conversational, technically credible, and platform-appropriate. Aim for "this changes how I think about the problem" energy, not corporate enthusiasm.
- **Specificity:** Name the model, paper, product, technique, benchmark, or architecture when it is central to the post. Avoid vague claims like "game changer," "major upgrade," and "unlocking the future" unless the copy immediately proves the claim with specifics.
- **Momentum:** Create interest through stakes and implications, not through hype words or excessive punctuation.
- **Point of View:** Make the post about the shift, not merely about the fact that Ylang Labs published something. The link pointer can mention the blog, but the first line should usually name the technical idea.
- **Pragmatic Engineer Voice:** Lead with judgment, then support it with implementation detail. Use plain words, short paragraphs, and decisive claims. Do not posture. Do not hide behind vague futurism.
- **Variations:** Always provide 2-3 distinct variations.
- **Formatting:** Prefer 3-5 short paragraphs for LinkedIn. Avoid hashtags by default. Avoid emojis by default unless the user asks for a playful tone or the post clearly benefits from one.
- **Banned Phrases:** Avoid "we're excited to share," "check out," "game changer," "unlock the future," "latest blog," "read it here," "we wrote about," "what this unlocks," and exclamation-mark-driven excitement unless the user explicitly asks for launch-style copy.

## Hook Patterns

Use one of these patterns when drafting the first line:

- **Landscape shift:** "`[Technology]` is changing where/how `[workflow]` can happen."
- **Capability shift:** "The best `[systems]` will not just `[old behavior]`. They will `[new behavior]`."
- **Constraint reversal:** "`[Old constraint]` used to be the default. `[...]` changes that."
- **Builder implication:** "If `[technical shift]` is true, then `[new product/workflow]` becomes possible."
- **Memory/compounding:** "`[System]` gets better when it has somewhere to put what it learns."
- **Hidden bottleneck:** "`[Obvious problem]` is not the bottleneck. `[Less obvious constraint]` is."
- **Failure mode:** "Most `[teams/systems]` do not fail because `[common explanation]`. They fail because `[specific cause]`."
- **Market bet:** "The next generation of `[tool/category]` will be judged by `[technical criterion]`."
- **Inside-view:** "Inside `[system/product/team]`: `[specific mechanism]` is doing more work than it looks like."
- **Numbers-first:** "`[Scale number]` changes the architecture. Here is the part that breaks first."

The hook should be understandable without the rest of the post. If it only works after someone reads paragraph two, rewrite it.

## Examples

**Example 1:**
Input: Blog about Google DeepMind's Gemma models and edge AI workflows.
Output:
I think open models are making edge AI feel practical in a way it did not a year ago.

With Google DeepMind's Gemma models, useful workflows can run closer to the user: phones, laptops, desktops, and servers, not only cloud APIs.

The practical part is not just cost. It is latency, privacy, and what becomes possible when an agent does not need a round trip for every step.

Notes here: https://lnkd.in/gMj-hgaj

**Example 2:**
Input: Blog about building an agent second brain.
Output:
The best agents will not just answer questions. They will learn the project.

An agent second brain gives them somewhere to put that learning.

So when the next session starts, the agent does not have to reconstruct the same context from scratch.

That turns knowledge work from capture into compounding.

I wrote about how to build one: https://lnkd.in/gnixQ3xb

**Example 3:**
Input: Blog about Docling from IBM Research for PDF conversion.
Output:
Enterprise documents are not just files. They are trapped context.

Docling, the open source toolkit from IBM Research, is interesting because it treats conversion as a step toward usable AI context, not just cleaner markdown.

For teams building RAG systems or document-heavy agents, that matters. Tables, page structure, layout, and metadata all affect whether the model can reason over the source.

Notes on where Docling fits: [URL]

**Example 4:**
Input: Project update on a new AI agent memory feature.
Output:
Agent memory should not feel like a transcript search box.

It should preserve the project decisions, recurring constraints, open questions, and implementation details that make the next session faster.

We added a memory workflow for agents that need to carry useful context across sessions without forcing users to repeat themselves.

The project update is here: [URL]

**Example 5:**
Input: Blog about bad AI agent tool design creating token waste.
Output:
I think a lot of agent teams are looking in the wrong place for cost savings.

The model call is easy to blame. But in tool-heavy systems, a surprising amount of waste comes from the stuff around the model: huge tool catalogs, vague descriptions, raw JSON dumps, and results that forget the ID needed for the next step.

Anthropic's docs give a concrete example where tool definitions alone can take roughly 55k tokens before the real task starts.

Notes here: [URL]

## Instructions

1.  Analyze the provided blog content or project summary.
2.  Extract the key value proposition or most interesting insight.
3.  Identify the strongest "what changed" claim before drafting. This is usually more compelling than the topic label.
4.  Identify the proof anchor that makes the strongest claim defensible.
5.  Draft 3 variations:
    - **Variation 1: LinkedIn Narrative**: 500-900 characters. Lead with a thesis or first-person observation, explain the technical shift, name practical implications, then close with a natural link pointer.
    - **Variation 2: Punchy Short Post**: 240-280 characters. Compress the strongest claim into a short X/Twitter-ready post.
    - **Variation 3: Curiosity Hook**: 400-700 characters. Start with a question or tension, then explain what the post resolves.
6.  Make the LinkedIn variation the strongest default option, not merely the longest option.
7.  Include placeholders like `[URL]` for links unless the final URL is provided. If the user provides a real URL, use it exactly. Prefer a plain link pointer over an ad-like CTA.
8.  Save the variations into a markdown file in the `/posts/` directory (e.g., `/posts/social-media-[topic].md`).

## Quality Checklist

Before finalizing, verify:

- The first line can stand alone as an interesting social hook.
- The post says what changed, not just what the article is about.
- The hook is ambitious enough to be worth sharing, but the article gives it a proof anchor.
- The implications are concrete enough that a technical reader understands why to click.
- The link pointer feels natural and specific to the post.
- The LinkedIn version is not constrained by tweet-length rules.
- The copy does not rely on emojis, hashtags, exclamation points, or launch-announcement language to create interest.
- The copy sounds like a person sharing a useful note, not a company selling a post.
