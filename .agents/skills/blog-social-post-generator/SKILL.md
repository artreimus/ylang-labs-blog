---
name: blog-social-post-generator
description: Generate concise, engaging social media posts (Twitter, LinkedIn, Instagram) for blog posts and projects. This skill triggers when you are asked to "create a tweet", "write a LinkedIn post", or "generate social media content" for a blog or project. It ensures a captivating hook, a summary, and a clear call-to-action (CTA).
---

# Blog Social Post Generator

Use this skill to create punchy and exciting social media variations for blogs or project updates.

## Core Mandates

- **Structure:** Each post MUST contain:
  1.  A captivating hook.
  2.  A brief summary or teaser.
  3.  A clear CTA (e.g., "Read more: [URL]").
- **Persistence:** Always write the final variations into a markdown file within the `/posts/` directory (e.g., `/posts/social-media-[topic].md`).
- **Length:** Posts must be no longer than 300 characters.
- **Tone:** Engaging, conversational, and platform-appropriate.
- **Variations:** Always provide 2-3 distinct variations.

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

## Instructions

1.  Analyze the provided blog content or project summary.
2.  Extract the key value proposition or most interesting insight.
3.  Draft 3 variations:
    - **Variation 1: Professional & Insightful** (Ideal for LinkedIn)
    - **Variation 2: Punchy & Exciting** (Ideal for Twitter)
    - **Variation 3: Question or Curiosity Hook**
4.  Ensure all variations stay under 300 characters.
5.  Include placeholders like `[URL]` for links.
6.  Save the variations into a markdown file in the `/posts/` directory (e.g., `/posts/social-media-[topic].md`).
