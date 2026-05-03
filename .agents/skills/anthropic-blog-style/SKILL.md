---
name: anthropic-blog-style
description: "Write, revise, or critique Ylang Labs blog posts in an Anthropic-like voice: calm, precise, evidence-led, research-lab prose with clear claims, plain-language technical explanation, concrete examples, caveats, limitations, safety or values framing, and practical next steps. Use when asked to write in Anthropic's style, make a draft more Anthropic-like, create an Anthropic-style prompt/template, or turn AI engineering, product, research, or policy notes into a measured blog post."
---

# Anthropic Blog Style

Use this skill as a writing-style layer for Ylang Labs blog work. Pair it with `.agents/skills/blog-authoring/SKILL.md` when creating MDX files, and with `.agents/skills/end-to-end-blog-creation/SKILL.md` when the user wants the full post, images, social copy, validation, and PR flow.

Do not claim the post is written by Anthropic or affiliated with Anthropic. Use the observed style as inspiration: calm, clear, evidence-led, and transparent about limits. Do not copy Anthropic passages except for short attributed quotes when the user explicitly needs quotation.

## Core Voice

Write like a thoughtful research lead explaining something important to an intelligent generalist.

- Sound confident, but cautious.
- Be technical, but not academic.
- Be mission-driven, but grounded in concrete mechanisms.
- Use plain sentences for important claims.
- Prefer evidence, examples, and limitations over hype.
- Connect technical choices to helpfulness, trust, safety, reliability, user value, or operational clarity when the connection is real.

Avoid:

- Hype without evidence.
- Clever marketing language.
- Buzzword stacking.
- Dense academic phrasing.
- Unsupported certainty.
- Long adjective chains.
- Vague claims like "revolutionary", "unprecedented", "game-changing", or "seamless" unless quoting someone else.

## Structure Patterns

Choose one pattern based on the post type.

### Research Or Technical Explainer

Use this for interpretability, agents, evaluations, RAG, ML infrastructure, or technical lessons.

1. Open with the big question, mystery, or tension.
2. Explain why it matters now.
3. Define the key concept in simple language.
4. Show the approach or method in enough detail that the reader understands what was actually done.
5. Present 3 to 5 findings with evidence, examples, or concrete observations.
6. Explain what the findings suggest.
7. State what the work does not prove.
8. End with implications and next steps.

Useful section headings:

- `The problem`
- `Our approach`
- `What we found`
- `What this means`
- `Limitations`
- `What comes next`

### Product Or Model Announcement

Use this for releases, tools, demos, or project announcements.

1. Open with a clear positioning claim.
2. Explain the broader shift or user need.
3. Describe what is new.
4. Provide evidence: benchmarks, examples, customer/user scenarios, demos, or internal evaluation results.
5. Discuss safety, reliability, failure modes, or constraints.
6. Explain how to use it: availability, setup, docs, pricing, API names, migration notes, or repo links.
7. Recommend who should adopt it and why.

Strong claims require a proof surface. If there are no benchmarks or examples, weaken the claim.

### Policy Or Values Post

Use this for company principles, product boundaries, trust, safety, or platform decisions.

1. Open with a clear moral or product stance.
2. Acknowledge why a reasonable person might choose differently.
3. State the principle behind the decision.
4. Show a concrete example of the tradeoff.
5. Explain the policy or decision.
6. End with what will still be supported or explored.

## Complexity Sequence

When explaining a hard idea, sequence the reader through it.

1. Start with a human question.
2. Give the plain-language explanation.
3. Introduce the technical term.
4. Give a concrete example.
5. Explain the method or mechanism.
6. State what changed or what was observed.
7. State what it means.
8. State what it does not prove.

Use transition phrases sparingly:

- `At a high level,`
- `Put another way,`
- `In practice,`
- `Consider a concrete example.`
- `This suggests`
- `One limitation is`
- `We still do not know`

## Sentence And Paragraph Style

- Use medium-length paragraphs, usually 2 to 5 sentences.
- Start sections with simple topic sentences.
- Use questions as transitions when they genuinely frame the next idea.
- Put concrete examples after abstractions.
- Prefer careful verbs: `suggests`, `indicates`, `we found`, `we observed`, `we believe`, `might`, `could`, `we expect`.
- Reserve stronger verbs for benchmark-backed or directly demonstrated claims.
- Use bullets for findings, caveats, availability details, or reader actions.

## Evidence Rules

For each major claim, include at least one of:

- A concrete example.
- A benchmark or measurement.
- A system behavior observed in testing.
- A user or customer scenario.
- A code path, architecture detail, or implementation mechanism.
- A citation to a primary source.

If evidence is weak, say so directly. Prefer "This suggests..." over "This proves..." unless the evidence actually proves the point.

## Caveat Rules

Every substantial post should include a real limitations section or caveat paragraph.

Good caveats name the boundary:

- What the method does not measure.
- What the example does not generalize to.
- What could be an artifact of the setup.
- What failure modes remain.
- What depends on future validation.
- What tradeoffs the team is accepting.

Do not add decorative humility. The caveat should change how the reader interprets the claim.

## Rewrite Pattern

When making a draft more Anthropic-like:

1. Replace broad claims with specific problems.
2. Replace hype with mechanisms.
3. Move from abstraction to example.
4. Add evidence before impact claims.
5. Add a limitation after the strongest claim.
6. End with what readers can do, use, test, or watch next.

Less Anthropic-like:

```text
Our revolutionary agent framework unlocks unprecedented productivity through autonomous reasoning and real-time orchestration.
```

More Anthropic-like:

```text
AI agents are beginning to do useful work across software, research, and operations. But building reliable agents remains difficult: they need to plan over long tasks, use tools safely, and recover when their assumptions are wrong. In this post, we explain how our agent framework approaches these problems, what it does well today, and where it still falls short.
```

## Draft Template

Use this when the user asks for a new Anthropic-style blog draft.

```markdown
# [Clear title about the core idea]

[Start with the central question, claim, or tension.]

[Explain why this matters now.]

[Define the key concept in simple terms.]

## The problem

[Describe the real problem. Use one concrete example.]

## Our approach

[Explain what was built, studied, tested, or observed. Use plain language before technical terms.]

## What we found

[Finding 1: explain simply, then give evidence.]

[Finding 2: explain simply, then give evidence.]

[Finding 3: explain simply, then give evidence.]

## What this means

[Explain the implication without overclaiming.]

## Limitations

[State what this does not prove, where the work is incomplete, or what could go wrong.]

## What comes next

[Explain next steps, availability, future research, or how readers can use it.]
```

## Quality Checklist

Before finalizing, check that:

- The opening starts with a question, claim, or tension rather than generic context.
- The reader knows why the topic matters by the end of the first two paragraphs.
- Technical terms are introduced after plain-language explanations.
- Concrete examples appear before or immediately after abstract claims.
- Strong claims have evidence.
- The post includes real caveats or limitations.
- The ending gives implications, availability, next steps, or a practical recommendation.
- The voice stays calm, precise, and transparent.
- The draft still fits Ylang Labs' practical AI engineering audience.
