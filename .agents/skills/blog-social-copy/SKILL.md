---
name: blog-social-copy
description: Generate exciting, thesis-driven social launch copy for Ylang Labs blog posts and projects. Use this skill when asked to create a LinkedIn post, tweet, launch post, social media post, launch copy, or promotional copy for a blog or project. It produces 2-3 distinct variations with a sharp first line, concrete technical stakes, practical implications, and a clear call-to-action.
---

# Blog Social Copy

Use this skill to create exciting, specific social media variations for blogs or project updates.

The default output should feel like a strong founder or technical-builder post: clear thesis, concrete stakes, practical implication, and a direct pointer to the article. It should make a reader feel that something in the technical landscape is shifting, then quickly show what the post explains.

Do not make the copy sound like a generic announcement, SEO snippet, newsletter blurb, or press release.

## Core Mandates

- **Structure:** Each post MUST contain:
  1. A sharp, stand-alone hook that makes a claim.
  2. A concrete explanation of what changed, why it matters, or what the reader can now build.
  3. At least one practical implication, such as latency, privacy, cost, deployment, reliability, evaluation, or developer workflow.
  4. A clear CTA with `[URL]` unless the final URL is known.
- **Default LinkedIn Shape:** Prefer the pattern:
  1. One-line thesis.
  2. A short paragraph grounding the thesis in a model, architecture, workflow, or problem.
  3. A short paragraph naming the practical implication.
  4. A natural CTA that says what the article covers.
- **Persistence:** Always write the final variations into a markdown file within the `/posts/` directory (e.g., `/posts/social-media-[topic].md`).
- **Length:** Match the platform:
  - LinkedIn: 500-900 characters by default, with short paragraphs and no filler.
  - X/Twitter: 240-280 characters when a short variant is requested.
  - Generic social launch copy: 400-700 characters.
- **Tone:** Engaging, conversational, technically credible, and platform-appropriate. Aim for "this is worth reading" energy, not corporate enthusiasm.
- **Specificity:** Name the model, paper, product, technique, benchmark, or architecture when it is central to the post. Avoid vague claims like "game changer," "major upgrade," and "unlocking the future" unless the copy immediately proves the claim with specifics.
- **Excitement:** Create momentum through stakes and implications, not through hype words or excessive punctuation.
- **Point of View:** Make the post about the shift, not merely about the fact that Ylang Labs published something. The CTA can mention the blog, but the first line should usually name the technical idea.
- **Variations:** Always provide 2-3 distinct variations.
- **Formatting:** Prefer 3-5 short paragraphs for LinkedIn. Avoid hashtags by default. Avoid emojis by default unless the user asks for a playful tone or the post clearly benefits from one.
- **Voice:** Use plain words, short paragraphs, and decisive claims. Avoid "we're excited to share," "check out," "game changer," "unlock the future," and exclamation-mark-driven excitement.

## Hook Patterns

Use one of these patterns when drafting the first line:

- **Landscape shift:** "`[Technology]` is changing where/how `[workflow]` can happen."
- **Capability shift:** "The best `[systems]` will not just `[old behavior]`. They will `[new behavior]`."
- **Constraint reversal:** "`[Old constraint]` used to be the default. `[...]` changes that."
- **Builder implication:** "If `[technical shift]` is true, then `[new product/workflow]` becomes possible."
- **Memory/compounding:** "`[System]` gets better when it has somewhere to put what it learns."

The hook should be understandable without the rest of the post. If it only works after someone reads paragraph two, rewrite it.

## Examples

**Example 1:**
Input: Blog about Google DeepMind's Gemma models and edge AI workflows.
Output:
Open models are changing where AI can run.

With Google DeepMind's Gemma models, AI workflows do not need to be locked inside cloud APIs. They can run on everyday devices like phones, laptops, desktops, and servers.

That means lower latency, more privacy, and new ways to build edge agents that work closer to the user.

We explored what this unlocks in our latest blog: https://lnkd.in/gMj-hgaj

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

For teams building RAG systems or document-heavy agents, that matters. Tables, page structure, layout, and metadata all affect whether the model can reason over the source material.

We wrote about what Docling does and where it fits: [URL]

**Example 4:**
Input: Project update on a new AI agent memory feature.
Output:
Agent memory should not feel like a transcript search box.

It should preserve the project decisions, recurring constraints, open questions, and implementation details that make the next session faster.

We added a memory workflow for agents that need to carry useful context across sessions without forcing users to repeat themselves.

The project update is here: [URL]

## Instructions

1.  Analyze the provided blog content or project summary.
2.  Extract the key value proposition or most interesting insight.
3.  Identify the strongest "what changed" claim before drafting. This is usually more compelling than the topic label.
4.  Draft 3 variations:
    - **Variation 1: LinkedIn Narrative**: 500-900 characters. Lead with a thesis, explain the technical shift, name practical implications, then close with a CTA.
    - **Variation 2: Punchy Short Post**: 240-280 characters. Compress the strongest claim into a short X/Twitter-ready post.
    - **Variation 3: Curiosity Hook**: 400-700 characters. Start with a question or tension, then explain what the post resolves.
5.  Make the LinkedIn variation the strongest default option, not merely the longest option.
6.  Include placeholders like `[URL]` for links unless the final URL is provided. If the user provides a real URL, use it exactly.
7.  Save the variations into a markdown file in the `/posts/` directory (e.g., `/posts/social-media-[topic].md`).

## Quality Checklist

Before finalizing, verify:

- The first line can stand alone as an interesting social hook.
- The post says what changed, not just what the article is about.
- The implications are concrete enough that a technical reader understands why to click.
- The CTA feels natural and specific to the post.
- The LinkedIn version is not constrained by tweet-length rules.
- The copy does not rely on emojis, hashtags, exclamation points, or launch-announcement language to feel exciting.
