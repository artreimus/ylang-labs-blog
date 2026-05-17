---
name: blog-social-copy
description: Generate exciting social launch copy for Ylang Labs blog posts and projects. Use this skill when asked to create a LinkedIn post, tweet, launch post, or other social media content for a blog or project. It produces 2-3 distinct variations with a sharp hook, concrete technical stakes, and clear call-to-action.
---

# Blog Social Copy

Use this skill to create exciting, specific social media variations for blogs or project updates.

The default output should feel like a strong founder or technical-builder post: clear thesis, concrete stakes, practical implication, and a direct pointer to the article. Do not make the copy sound like a generic announcement, SEO snippet, or press release.

## Core Mandates

- **Structure:** Each post MUST contain:
  1. A sharp, stand-alone hook that makes a claim.
  2. A concrete explanation of what changed, why it matters, or what the reader can now build.
  3. At least one practical implication, such as latency, privacy, cost, deployment, reliability, evaluation, or developer workflow.
  4. A clear CTA with `[URL]` unless the final URL is known.
- **Persistence:** Always write the final variations into a markdown file within the `/posts/` directory (e.g., `/posts/social-media-[topic].md`).
- **Length:** Match the platform:
  - LinkedIn: 500-900 characters by default, with short paragraphs and no filler.
  - X/Twitter: 240-280 characters when a short variant is requested.
  - Generic social launch copy: 400-700 characters.
- **Tone:** Engaging, conversational, technically credible, and platform-appropriate.
- **Specificity:** Name the model, paper, product, technique, benchmark, or architecture when it is central to the post. Avoid vague claims like "game changer," "major upgrade," and "unlocking the future" unless the copy immediately proves the claim with specifics.
- **Excitement:** Create momentum through stakes and implications, not through hype words or excessive punctuation.
- **Variations:** Always provide 2-3 distinct variations.
- **Formatting:** Prefer 3-5 short paragraphs for LinkedIn. Avoid hashtags by default. Use emojis only when the user asks for a playful tone or the post clearly benefits from one.

## Examples

**Example 1:**
Input: Blog about Docling from IBM Research for PDF conversion.
Output:
📄 When documents don’t just convert, they make sense.

Docling is an open source toolkit from IBM Research that was designed to unlock data buried in enterprise PDFs and reports for generative AI applications.

I wrote a blog post explaining what Docling from IBM is and how it works: 🔗 [URL]

**Example 2:**
Input: Project update on a new AI agent feature.
Output:
🤖 Agents just got a major upgrade!

We've integrated new memory capabilities that allow our AI agents to remember long-term context across sessions. No more repeating yourself!

Check out the full project update here: 🔗 [URL]

**Example 3:**
Input: Blog about Google DeepMind's Gemma models and edge AI workflows.
Output:
Open models are changing where AI can run.

With Google DeepMind's Gemma models, AI workflows do not need to be locked inside cloud APIs. They can run on everyday devices like phones, laptops, desktops, and servers.

That means lower latency, more privacy, and new ways to build edge agents that work closer to the user.

We explored what this unlocks in our latest blog: [URL]

## Instructions

1.  Analyze the provided blog content or project summary.
2.  Extract the key value proposition or most interesting insight.
3.  Draft 3 variations:
    - **Variation 1: LinkedIn Narrative**: 500-900 characters. Lead with a thesis, explain the technical shift, name practical implications, then close with a CTA.
    - **Variation 2: Punchy Short Post**: 240-280 characters. Compress the strongest claim into a short X/Twitter-ready post.
    - **Variation 3: Curiosity Hook**: 400-700 characters. Start with a question or tension, then explain what the post resolves.
4.  Make the LinkedIn variation the strongest default option, not merely the longest option.
5.  Include placeholders like `[URL]` for links unless the final URL is provided.
6.  Save the variations into a markdown file in the `/posts/` directory (e.g., `/posts/social-media-[topic].md`).

## Quality Checklist

Before finalizing, verify:

- The first line can stand alone as an interesting social hook.
- The post says what changed, not just what the article is about.
- The implications are concrete enough that a technical reader understands why to click.
- The CTA feels natural and specific to the post.
- The LinkedIn version is not constrained by tweet-length rules.
