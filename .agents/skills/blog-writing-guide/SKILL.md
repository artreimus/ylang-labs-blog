---
name: blog-writing-guide
description: Write, review, and improve blog posts for the Ylang Labs engineering blog following Ylang Labs' specific writing standards, voice, and quality bar. This is the primary/default writing guide for Ylang Labs blog drafting, rewriting, editing, and review. Use this skill whenever someone asks to write a blog post, draft a technical article, review blog content, improve a draft, write a product announcement, create an engineering deep-dive, or produce any written content destined for the Ylang Labs blog or developer audience. Also trigger when the user mentions "blog post," "blog draft," "write-up," "announcement post," "engineering post," "deep dive," "postmortem," or asks for help with technical writing for Ylang Labs. Even if the user just says "help me write about [feature/topic]" — if it sounds like it could become a Ylang Labs blog post, use this skill.
---

# Ylang Labs Blog Writing Skill

This is the primary Ylang Labs blog writing skill. It enforces Ylang Labs' blog writing standards across every post — whether you're helping an engineer write their first blog post or a marketer draft a product announcement.

**The bar:** Every Ylang Labs blog post should be something a senior engineer would share in their team's Slack, or reference in a technical decision.

What follows are the core principles to internalize and apply to every piece of content.

## Choose The Voice By Post Type

Write calm, connected, precise prose with concrete engineering judgment. An intelligent beginner should be able to follow a technical explainer without losing the details that make it useful to an engineer.

- **AI research and technical explainers:** Pair this guide with `anthropic-style-writing`. Start from the central mechanism, introduce concepts progressively, and explain what the evidence does and does not establish. Use medium-length paragraphs and natural transitions.
- **Build stories, migrations, and postmortems:** Retain [The Pragmatic Engineer](https://www.pragmaticengineer.com/)'s practical specificity: named systems, constraints, measured outcomes, operational tradeoffs, and how the work was validated.
- **Other post types:** Choose the structure and voice that serve the reader's question. The user's explicit direction takes precedence.

Use editorial references for their teaching approach. Keep the article's prose and organization original, without impersonating an author or implying affiliation.

Personality should come from useful judgment and specificity. Use first-person experience, "we found," or "our approach" only when supported by the author's actual work. When explaining published research, attribute its findings to the researchers. Do not invent experiments, customer stories, failure histories, or personal asides to make the voice sound experienced.

Keep these traits across post types:

- **Concrete mechanisms:** Explain how information moves and what each operation changes.
- **Relevant numbers:** Use verified measurements when they help the argument; include units, conditions, and the baseline. An evergreen explainer need not open with a metric or a trend.
- **Named specifics:** Identify actual models, systems, methods, and constraints where the distinction matters.
- **Source-backed claims:** Prefer primary papers, official documentation, inspected code, and observed results. Label interpretation and uncertainty.
- **Practical implications:** Connect choices to reliability, cost, user needs, or implementation when relevant.
- **Tradeoffs:** Explain limitations and alternatives that change the reader's decision.

## Ambition Without Hype

Posts should be pragmatic, but not timid. Sell the strongest credible thesis behind the work.

This applies to the article body and to the packaging around it:

- **Title:** State the strongest defensible question, thesis, or payoff. A direct explanatory title can be the right choice; do not manufacture a contrarian claim.
- **Opening:** Establish the central question, mechanism, or practical stakes in the first 2-3 sentences. Add a "why now" only when timing matters.
- **Summary:** Give a concrete reason to click. Say what the reader will understand, build, fix, or decide after reading.
- **TLDR:** Write bullets as useful conclusions, not neutral recaps.
- **Social copy:** Promote the strongest claim from the post, not the fact that Ylang Labs published a post.

Ambition has to cash out. Every bold claim needs at least one mechanism, example, number, source, tradeoff, or caveat inside the post. If the title is more interesting than the article, revise the article or lower the title.

## Banned Language

Never use these. They are automatic red flags:

- "We're excited/thrilled to announce" — just announce it
- "Best-in-class" / "industry-leading" / "cutting-edge" — show, don't tell
- "Seamless" / "seamlessly" — nothing is seamless
- "Empower" / "leverage" / "unlock" — say what you actually mean
- "Robust" — describe what makes it robust instead
- "At [Company], we believe..." — just state the belief
- "Streamline" — everyone is streamlining, stop
- Filler transitions: "That being said," "It's worth noting that," "At the end of the day," "Without further ado," "As you might know"
- "In this blog post, we will explore..." — be direct, just start

## Verbosity And Example Discipline

Write direct operating sentences. Do not hide the point inside an abstract label followed by a pile of nouns.

### Keep The Post Standalone

Keep the explanation original and self-contained. A reader should understand it without first reading someone else's blog post, watching a video, or learning an unrelated scenario.

- Do not build the explanation around another person's example unless the user explicitly asks to analyze or reference it.
- Prefer a brief example of the mechanism itself: one update, a short sequence, or a single handoff. A recurring illustrative scenario is optional; use it only when it reduces the reader's work.
- Do not import a source's analogy, character, or chapter order merely because it was useful in the source. Build the article around the reader's question.
- Label invented scenarios as illustrative. Do not imply that they describe a production Ylang Labs system, measured result, or real customer.
- Use primary documentation and credible sources to support factual claims, but explain the mechanism in the article's own words and examples.
- If the user explicitly requests an external case study, keep the article understandable without requiring the reader to open the source.
- For standalone explainers, default to source and inspiration links in a final `## References` section. Preserve named attribution near claims when needed, honor explicit inline-citation requirements, and maintain the source-to-claim map in `refs/<slug>/README.md`.

**Avoid abstract label + colon + noun pile.**

- Bad: "The output is a context packet: referenced files, invariants, hazards, examples to preserve, and open questions."
- Good: "Give the agent only what the task needs. Then say what mattered, what was missing, and what still needs a person."

More rewrites:

- Bad: "The output is a build contract: problem, desired behavior, constraints, non-goals, checks, owner, risk tier, and rollback notes."
- Good: "Write down what should change, what must not change, and which checks must pass."
- Bad: "The system improves through reusable machinery: tests, docs, skills, prompts, fixtures, and generators."
- Good: "Turn a missed edge case into a test. Turn a repeated manual fix into a script or skill."

Use this rule while drafting and editing:

- If a sentence names more than three abstract nouns, rewrite it.
- Prefer verbs a person can perform: write, check, run, compare, send back, measure, remove, split, review.
- Use terms like "contract", "packet", "surface", "artifact", "machinery", or "framework" only when the post has defined them and the term makes the sentence clearer.
- Use the smallest example that closes a conceptual gap. Add another only when it teaches something different.
- Do not explain a system by naming seven buckets. Explain the next handoff and why it matters.

## The Opening (First 2-3 Sentences)

The opening must state the problem or conclusion, and it should make the stakes obvious. Never start with background, company history, or hype.

**Good:** "Two weeks before launch, we killed our entire metrics product. Pre-aggregated time-series metrics were fast, but they threw away the debugging context our users needed most."

**Bad:** "At Ylang Labs, we're always looking for ways to improve the developer experience. Today, we're thrilled to share some exciting updates to our metrics product that we think you'll love."

## Structure: Follow the Reader's Questions

Structure every post around what the reader is actually wondering, not your internal narrative:

1. **What problem does this solve?** (1-2 paragraphs max)
2. **How does it actually work?** Not buttons-you-click, but underlying technology. (Bulk of the post — be specific)
3. **What were the trade-offs or alternatives?** (This separates good from great)
4. **How do I use/try/implement this?** (Concrete next steps)

For engineering deep-dives, also address: 5. **What did we try that didn't work?** (Builds trust) 6. **What are the known limitations?** (Shows intellectual honesty)

### Make The Progression Causal

For an explainer, the process itself can supply the story. Establish the core loop before its variants; then show why each later stage is needed and how it uses what came before. The reader should know what enters a stage, what changes, and what comes out.

- Define terms and acronyms before relying on them, including in takeaways, diagrams, and captions. Explain the whole system before listing its internal parts.
- Explain a term's job in plain language. Renaming an abstraction with another abstraction does not teach it.
- Keep prerequisites on the main reading path. Optional panels are for genuinely optional depth, not missing explanations needed by the next section.
- Use a few main sections with distinct jobs and earned subsections. Do not force a source video's chapter count, a numbered section per term, or a findings template onto a process explanation.
- After the outline works, check paragraph handoffs. If the next paragraph needs an idea that has not been explained, add the missing connection before adding more topics.

## Default Reading Time

Default every Ylang Labs blog post to 5 minutes or less unless the user explicitly asks for a longer piece or approves a longer deep dive.

Treat this as a scope constraint, not a reason to make posts shallow:

- Prefer sharper scope over broader coverage.
- Cut repeated setup, generic background, repeated examples, and low-value transitions before cutting technical substance.
- Keep one strong technical argument instead of trying to cover every adjacent idea.
- If the topic genuinely needs more than 5 minutes, ask for approval or clearly confirm the user wants a longer post before drafting past that limit.
- Honor longer-form approval already given in the session. Use the additional space for connected explanation, not extra categories or repeated examples.
- When editing an existing draft that is over 5 minutes and no longer length was requested, shorten it by narrowing scope, moving side paths to follow-up posts, or replacing long exposition with a diagram or compact example.

## Formatting For Connected Reading

Use paragraphs of roughly 2–5 sentences, each developing one idea. Start with a plain topic sentence, explain the mechanism, then connect it to its consequence or the next paragraph. A contrast can belong in the same paragraph; do not break automatically at every "but" or "however."

Reserve one-sentence paragraphs for occasional emphasis. Avoid a page of dramatic fragments, tiny numbered chapters, or disconnected glossary definitions. Use lists for real sequences or comparisons and tables when the reader needs to compare parallel properties.

Choose punctuation that makes the connection clear. Avoid long chains of asides, decorative transitions, and artificial line breaks used only to create drama. Headings and whitespace should expose the argument rather than replace its missing connections.

## SEO for Developer Content

Use the terms readers actually search for in accurate titles, summaries, and headings. Define the central concept naturally where the explanation needs it. Add an FAQ only when real questions remain unanswered; do not force a "What is X?" heading, product pitch, fixed content ratio, or repeated recap into an otherwise complete explainer.

## AI Writing Patterns to Avoid

LLM-generated prose has tells. Flag and rewrite these:

**Staccato dramatic fragments.**

- Bad: "No errors. No warnings. Everything green."
- Good: "There were no errors, no warnings, everything looked fine."

**Bumper-sticker aphorisms.**

- Bad: "You can't fix what you can't see."
- Good: "Without visibility into the full request lifecycle, you're guessing."

**Three-beat reveals.**

- Bad: "Not a config issue. Not a code bug. The deploy was stale."
- Good: "It wasn't a config issue or a code bug. The deploy was stale."

**Smug simplicity.**

- Bad: [code block] "That's it. That's all you need."
- Good: [code block] then explain what the code does, or just move on.

**Parallel structure ad copy.**

- Bad: "Metrics tell you what's broken. Traces tell you why."
- Good: "Metrics show what's broken, but traces are where you'll actually figure out why."

**Invented personal authority.** Do not add anecdotes or first-person asides solely to make a sourced explainer sound human. Let clear judgments, examples, and precise limits carry the voice throughout.

## Section Headings Must Convey Information

**Weak:** "Background," "Architecture," "Results," "Conclusion"

**Strong:** "Why time-series pre-aggregation destroys debugging context," "The scatter-gather approach to distributed GROUP BY," "Where this breaks down: the cardinality wall"

## Technical Quality Standards

**Numbers over adjectives.** If you make a performance claim, include the number.

The phrasing below is illustrative; use verified measurements and their conditions in an actual post.

- Bad: "This significantly reduced our error processing time."
- Good: "This reduced our p99 error processing time from 340ms to 45ms — a 7.5× improvement."

**Code must work.** If a post includes code, test it. Include imports, configuration, and context. Comments should explain _why_, not _what_.

**Diagrams for mechanisms.** Add a diagram when it makes a relationship, handoff, or repeated process easier to understand. Use real service names for actual deployments and clear conceptual labels for general mechanisms.

**Honesty over hype.** Never overstate what a feature does. Acknowledge limitations. If something is in beta, say so. If a competitor does something well, it's okay to note that. Do not claim AI features are more capable than they are — "Seer suggests a likely root cause" ≠ "Seer finds the root cause."

### Integrate Figures Into The Explanation

- Give each diagram one teaching job and place it beside that explanation, after introducing the terms it uses. Explain the mechanism in prose so the image is not the only way to understand it.
- Use concise captions that decode the important relationship and disclose schematic or omitted details. Keep alt text useful; avoid repeated figure-introduction banners or instructions.
- Keep exact quantities, benchmark conditions, and source attribution in text or repo-native charts. Generated conceptual art is not measured evidence. Check arithmetic, arrows, labels, and captions against primary sources.
- Choose display width and aspect ratio for the reading column. Check the actual desktop and mobile rendering, light and dark modes, and full-resolution links where detail requires them. Large square plates should not overwhelm a short aside.
- When the user says a section is hard to follow, identify the missing relationship before adding another illustration. More diagrams do not repair an unexplained transition.

Use `technical-blog-image-generator` and `technical-blog-image-review` for the visual workflow. Keep figure-specific implementation details out of this writing guide.

## Title Guidelines

The title should make the article's value clear and accurately describe what it establishes. Choose a direct explanation, practical payoff, failure mode, or evidence-backed claim that fits the post.

For example, **How large language models are trained** works for a substantial conceptual guide. A measured build story can instead lead with its result. Numbers, tension, and contrarian phrasing are options when supported, not requirements for every title. The illustrative title shapes below do not supply evidence for their claims.

**Strong titles** make a specific claim, expose a hidden failure mode, tell a story, or promise a concrete payoff:

- "The metrics product we built worked. But we killed it and started over anyway"
- "How we reduced release delays by 5% by fixing Salt"
- "Your JavaScript bundle has 47% dead code. Here's how to find it."
- "Agents Don't Need More Memory. They Need Better Forgetting."
- "HTML Is the Most Underrated Agent Output Format"
- "Your AI Agent Is Failing Because Its Context Is a Junk Drawer"

**Weak titles** are vague announcements:

- "Introducing our new metrics product"
- "Performance improvements in Ylang Labs"
- "AI-powered debugging with Seer"
- "Understanding agent memory"
- "A guide to AI-native software development"

Use these title shapes when drafting:

- **Contrarian thesis:** "`[Common belief]` is not the bottleneck. `[Hidden constraint]` is."
- **Failure mode:** "Your `[system]` is failing because `[specific cause]`."
- **Specific payoff:** "How to `[achieve outcome]` without `[costly tradeoff]`."
- **Technical shift:** "`[Technology]` changes where `[workflow]` can happen."
- **Build story:** "We built `[thing]`. The hard part was `[surprising constraint]`."
- **Inside-view deep dive:** "Inside `[system/team/product]`: how `[specific mechanism]` handles `[real constraint]`."
- **Numbers-first story:** "How `[team/product]` handles `[scale number]` with `[specific architecture or tradeoff]`."

If a title claims more than the article establishes, revise the title or gather real supporting evidence. Do not invent findings to justify a stronger hook.

## The Closing

End with something useful: a link to docs, source code, a way to try it, or a call to give feedback. Never end with generic hype ("We can't wait to see what you build!"), recaps of what you just said, or product-page CTAs ("Try Ylang Labs for free. Included on all plans."). Connect back to the story you opened with, or give the reader something concrete to do next.

## Post Types

Here's the quick map by post type:

| Type                  | Goal                                                         | Byline                                                     |
| --------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| Engineering Deep Dive | Explain a technical system/decision so other engineers learn | The engineer(s) who built it. Always.                      |
| Product Launch        | Explain what shipped, why it matters, how to use it          | PM, engineer, or DevEx. Not PMM unless marketing built it. |
| Postmortem            | Transparent failure analysis with timeline and fixes         | Engineering leadership                                     |
| Data / Research       | Original insights from Ylang Labs' unique data position      | Data team, engineering, or research                        |
| Technical Explainer   | Make a mechanism understandable through sourced explanation  | Actual author, with attribution to the source research     |
| Tutorial / Guide      | Help a developer accomplish something specific               | DevEx, engineer, or community contributor                  |

## The Reader Teach-Back

For beginner-facing explainers, ask an independent reviewer to explain the central mechanism in their own words using only the draft. Have them trace the main handoffs and distinguish the concepts the article could easily blur. Ask what the evidence does not establish and what the reader could do next.

Recognition of headings or definitions is insufficient. A reviewer should explain why one step leads to the next; flag the first point where they need outside knowledge, an undefined term, or an unrelated analogy. Fix that passage and recheck the revised draft. Do not reuse approval of a version the user found confusing.

Call agent-based checks simulated comprehension reviews, not evidence from actual beginner readers. Source verification, comprehension, figure accuracy, and rendered usability answer different questions; report the work performed and any unresolved limits. No review proves universal or "100%" accuracy.

The completed `data/blogs/how-to-train-llms.mdx` illustrates the desired connected explanation and figure integration. Use it as a quality reference without copying its section count, length, or topic-specific outline.

## Non-Negotiables (Quick Reference)

1. Never publish without a real person's name on it. No "The Ylang Labs Team" bylines.
2. Never publish code that doesn't work.
3. Never say "we're excited to announce." Just announce it.
4. Use a diagram when it helps explain a system's relationships; give it a specific teaching purpose.
5. If you make a performance claim, include the number.
6. If you discuss a decision, explain what you didn't choose and why.
7. Every post must have a clear "who is this for" in the author's mind before writing.
8. Changelogs belong in the changelog. Blog posts should offer something more.
9. When in doubt, sharpen the scope before adding length. Depth beats breadth, but the default post still stays at 5 minutes or less unless the user approves a longer piece.
10. Write the post you wish existed when you were trying to solve this problem.

## When Reviewing or Editing a Draft

Run through both checklists:

**Technical Review:**

- All technical claims accurate
- Code samples work
- Architecture descriptions match reality
- Numbers and benchmarks correct
- Simplifications preserve the mechanism and state material limits
- Hypothetical examples, actual measurements, source findings, and interpretations are distinguished

**Editorial Review:**

- Opening hooks reader within 2 sentences
- A reader can teach back the mechanism and follow the transitions
- No corporate language, filler, or fluff
- No abstract label-plus-noun-pile sentences
- Examples are original, self-contained, useful, and limited, unless the user explicitly requested an external case study
- Headings convey information
- Terms are defined before use, including in figures and captions
- Paragraphs develop connected ideas; prerequisites are not hidden in optional panels
- Right length: 5 minutes or less by default, unless the user explicitly allowed a longer post
- Title is specific, useful, and defensible
- Summary and TLDR sell the strongest useful takeaway, not just the topic

**Final Check:**

- Author byline is correct (real person's name)
- Sources credited in the appropriate reference format; practical next steps included where useful
- Post doesn't duplicate what's in the changelog

When providing feedback, be specific and constructive. Quote the weak passage, explain why it's weak, and rewrite it to show the standard.
