---
name: blog-writing-guide
description: Write, review, and improve blog posts for the Ylang Labs engineering blog following Ylang Labs' specific writing standards, voice, and quality bar. This is the primary/default writing guide for Ylang Labs blog drafting, rewriting, editing, and review. Use this skill whenever someone asks to write a blog post, draft a technical article, review blog content, improve a draft, write a product announcement, create an engineering deep-dive, or produce any written content destined for the Ylang Labs blog or developer audience. Also trigger when the user mentions "blog post," "blog draft," "write-up," "announcement post," "engineering post," "deep dive," "postmortem," or asks for help with technical writing for Ylang Labs. Even if the user just says "help me write about [feature/topic]" — if it sounds like it could become a Ylang Labs blog post, use this skill.
---

# Ylang Labs Blog Writing Skill

This is the primary Ylang Labs blog writing skill. It enforces Ylang Labs' blog writing standards across every post — whether you're helping an engineer write their first blog post or a marketer draft a product announcement.

**The bar:** Every Ylang Labs blog post should be something a senior engineer would share in their team's Slack, or reference in a technical decision.

What follows are the core principles to internalize and apply to every piece of content.

## The Default Voice

The default Ylang Labs blog writing standard is [The Pragmatic Engineer](https://www.pragmaticengineer.com/) by Gergely Orosz.

Use it as the editorial reference, not a prose clone. Do not imitate Gergely Orosz's exact wording, recurring phrasing, personal cadence, or author persona.

**We sound like:** A Pragmatic Engineer-inspired author who has shipped the thing, debugged the failure modes, and is explaining the useful part to another capable builder. Calm, concrete, technically sharp, and direct.

**We don't sound like:** A corporate blog, a press release, a sales deck, a hype thread with no implementation detail, or an AI-generated summary.

Write as someone trying to save a strong engineer time. Make the claim early, say why it matters now, show the mechanism, name the tradeoffs, and give the reader a practical way to use the idea.

Use "we" and "you" when useful. This is a conversation between engineers, not a paper.

Personality should come from judgment, specificity, and useful asides. Prefer dry confidence over banter. Humor is welcome only when it sharpens the point. Do not force jokes or sarcasm.

Use these Pragmatic Engineer-inspired editorial traits:

- **Inside view:** Prefer how the system, team, workflow, or market actually works over generic opinion.
- **Numbers early:** Put scale, cost, latency, adoption, throughput, revenue, failure rate, or time saved near the top when available.
- **Named specifics:** Name the model, product, framework, architecture, team shape, constraint, or migration path.
- **Source-backed claims:** Use interviews, docs, code, benchmarks, issues, release notes, papers, or credible reporting. Label inference clearly.
- **Engineering plus business context:** Explain why the technical choice matters for users, teams, budgets, reliability, hiring, or strategy.
- **Tradeoffs over cheerleading:** Say what worked, what did not, what was chosen instead, and why.
- **Operational detail:** Show how a team would build, deploy, debug, measure, or roll back the idea in practice.

## Ambition Without Hype

Posts should be pragmatic, but not timid. Sell the strongest credible thesis behind the work.

This applies to the article body and to the packaging around it:

- **Title:** Sell the thesis, not the topic label. The title should imply a tension, payoff, or shift.
- **Opening:** State what changed, what became possible, or what mistake the reader can now avoid in the first 2-3 sentences.
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
- Use one useful example, not a catalog of possible examples.
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

## Default Reading Time

Default every Ylang Labs blog post to 5 minutes or less unless the user explicitly asks for a longer piece or approves a longer deep dive.

Treat this as a scope constraint, not a reason to make posts shallow:

- Prefer sharper scope over broader coverage.
- Cut repeated setup, generic background, repeated examples, and low-value transitions before cutting technical substance.
- Keep one strong technical argument instead of trying to cover every adjacent idea.
- If the topic genuinely needs more than 5 minutes, ask for approval or clearly confirm the user wants a longer post before drafting past that limit.
- When editing an existing draft that is over 5 minutes and no longer length was requested, shorten it by narrowing scope, moving side paths to follow-up posts, or replacing long exposition with a diagram or compact example.

## Formatting for Skimmability

People scroll. Shorter paragraphs are almost always better for keeping people reading.

**Break paragraphs at contrast points.** When a sentence introduces a "but," "however," or shifts perspective, start a new paragraph. Don't bury the turn inside a block of text.

**Bad:**

> Traditional monitoring tracks requests and latency. That works for stateless HTTP services. AI agents are different. A single run might involve multiple LLM calls, tool executions, and handoffs.

**Good:**

> Traditional monitoring tracks requests and latency. That works for stateless HTTP services.
>
> AI agents are different. A single run might involve multiple LLM calls, tool executions, and handoffs.

The line break before the contrasting point creates visual emphasis. This is standard in online writing even though it breaks traditional paragraph rules.

**One idea per paragraph.** If a paragraph covers two distinct points, split it. Three-sentence paragraphs are fine. One-sentence paragraphs are fine for emphasis.

**No em dashes.** Use commas, periods, or line breaks instead. Em dashes are fine in print but create visual clutter in blog formatting.

## SEO for Developer Content

When targeting a competitive search query:

**Lead generic, close specific.** The first 50-60% of the post should be tool-agnostic educational content (definitions, concepts, metrics, best practices). Introduce your product as an implementation example in the second half. Google ranks guides higher than product pages for informational queries.

**Put keywords in H2s.** Generic headings are invisible to search. "Key metrics for AI agent monitoring" beats "What to measure." (See **Section Headings** below for good/bad examples.)

**Include a definitional section.** For any head term ("agent observability", "error monitoring"), top-ranking pages almost always have a "What is X?" section. Include one even if it feels basic.

**Add an FAQ.** 3-4 questions targeting long-tail keywords at the bottom of the post. These can win featured snippets and People Also Ask boxes.

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

**Personality only in the bookends.** AI drafts open with a personal anecdote, go impersonal for 80% of the post, then close with a CTA. The author's voice should persist throughout.

- Bad: Personal intro → clinical middle → "Try Ylang Labs for free."
- Good: First-person asides woven through the post: "this is the part that tripped me up" / "I would have blamed the wrong service."

## Section Headings Must Convey Information

**Weak:** "Background," "Architecture," "Results," "Conclusion"

**Strong:** "Why time-series pre-aggregation destroys debugging context," "The scatter-gather approach to distributed GROUP BY," "Where this breaks down: the cardinality wall"

## Technical Quality Standards

**Numbers over adjectives.** If you make a performance claim, include the number.

- Bad: "This significantly reduced our error processing time."
- Good: "This reduced our p99 error processing time from 340ms to 45ms — a 7.5× improvement."

**Code must work.** If a post includes code, test it. Include imports, configuration, and context. Comments should explain _why_, not _what_.

**Diagrams for systems.** If you describe a system with more than two interacting components, include a diagram. Label with real service names, not generic boxes.

**Honesty over hype.** Never overstate what a feature does. Acknowledge limitations. If something is in beta, say so. If a competitor does something well, it's okay to note that. Do not claim AI features are more capable than they are — "Seer suggests a likely root cause" ≠ "Seer finds the root cause."

## Title Guidelines

The title is the highest-leverage sentence in the post. It must stop a developer scrolling through their RSS feed, LinkedIn, or Twitter/X.

Ylang Labs titles should be ambitious and specific. They should make a capable engineer think, "I need to know how they pulled that off," or "I may be making that mistake."

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

Do not sand the title down into a neutral label. If the strongest title feels too bold, make the post prove it.

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
| Tutorial / Guide      | Help a developer accomplish something specific               | DevEx, engineer, or community contributor                  |

## The "Would I Share This?" Test

Before publishing, ask: Would a developer share this post? Does it have a shot at getting on Hacker News? If the answer is no, the post either needs more depth, more original insight, or it belongs in the changelog instead.

Posts worth sharing contain at least one of:

- A technical decision explained with trade-offs
- Original data or research not found elsewhere
- A real-world debugging story with specific details
- An honest accounting of something that went wrong
- A how-to that saves the reader real time

## Non-Negotiables (Quick Reference)

1. Never publish without a real person's name on it. No "The Ylang Labs Team" bylines.
2. Never publish code that doesn't work.
3. Never say "we're excited to announce." Just announce it.
4. If you describe a system, include a diagram.
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
- No oversimplifications that would make an expert cringe

**Editorial Review:**

- Opening hooks reader within 2 sentences
- Passes the "would I share this?" test
- No corporate language, filler, or fluff
- No abstract label-plus-noun-pile sentences
- Examples are useful and limited, not a catalog of everything that could happen
- Headings convey information
- Right length: 5 minutes or less by default, unless the user explicitly allowed a longer post
- Title is specific, ambitious, and still defensible
- Summary and TLDR sell the strongest useful takeaway, not just the topic

**Final Check:**

- Author byline is correct (real person's name)
- Links to docs/getting-started included
- Post doesn't duplicate what's in the changelog

When providing feedback, be specific and constructive. Quote the weak passage, explain why it's weak, and rewrite it to show the standard.
