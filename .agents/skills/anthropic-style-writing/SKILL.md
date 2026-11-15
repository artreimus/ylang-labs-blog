---
name: anthropic-style-writing
description: 'Write, revise, or critique Ylang Labs AI research and technical explainers with calm, connected, evidence-led prose. Pair with blog-writing-guide for progressive explanations, beginner accessibility, original writing, purposeful diagrams, and precise limits. Use for technical explainers by default, explicit Anthropic-style requests, or drafts that feel fragmented, jargon-heavy, or hard to follow.'
---

# Anthropic-Style Technical Writing

Use this companion to `blog-writing-guide` for AI research and technical explainers. The primary guide owns the shared editorial standard; this skill develops the explanatory approach. Use `blog-mdx-authoring` for file and component contracts and `blog-publishing-workflow` for packaging or publication.

Aim for a thoughtful technical author explaining a mechanism to an intelligent generalist. Keep the prose original. Do not copy Anthropic passages, impersonate its authors, imply affiliation, or claim work that Ylang Labs did not perform.

## Establish The Central Question

Open with the question, mechanism, or tension the reader needs to understand. Define the scope and explain its consequence in a few connected paragraphs. An evergreen explanation does not need a trend paragraph or a claim about why everything changed recently.

For example, a guide to model training can organize itself around how different objectives change behavior. It does not need an unrelated pricing problem, fictional customer, or dramatic opening anecdote to provide a story.

Read a user-supplied editorial reference before adapting its approach. Distinguish its explanatory choices from its subject-specific claims: a clear architecture article can guide the structure of a training explainer without supplying evidence about training methods.

## Choose A Structure That Matches The Evidence

### Conceptual Or Process Explainer

Start with the core loop or mechanism. Then introduce its components and advanced variants in the order that makes their dependencies understandable. Show what each stage receives, what it changes, and what the next stage can use. Explain the limits and end with a concrete way to apply or evaluate the idea.

Use a small number of main sections with information-bearing headings. Add subsections when they answer distinct questions. The process supplies the narrative; a particular chapter count, a recurring fictional project, or a heading for every definition is unnecessary.

### Original Research Or Engineering Results

Describe the problem, what was actually done, the observations, the interpretation, and the limits of the evidence. Name the baseline and conditions when comparing results. Use findings sections and first-person research claims only when the author has that work to report.

A synthesis of published papers should name the researchers and explain their methods and results. It should not become an invented "our approach" or "what we found" story.

### Announcement Or Policy Explanation

State the change or position, explain the mechanism or decision behind it, give the relevant evidence, and describe its practical consequences and limits. Include availability, next steps, or a meaningful tradeoff when relevant. Do not force a research-paper template onto an announcement.

## Explain One Dependency At A Time

Move from the reader's question to a plain-language explanation, introduce the technical term, then show how it works and why it matters. Treat this as a teaching sequence, not a rigid paragraph template.

- Introduce the whole system before listing its internal parts.
- Explain a term's role before relying on it. An acronym expansion alone may still leave the concept unexplained.
- Define vocabulary before it appears in takeaways, figures, or captions as well as in body text.
- Use a short example of the actual operation when an abstraction needs grounding: one update, one sequence, one comparison, or one handoff.
- Keep prerequisite explanations in the main text. Use optional panels for depth a reader can safely skip.
- State the missing connection when moving to an advanced method. Explain what problem it addresses that the earlier method leaves open.

Avoid teaching several new terms inside a qualification. If a precise caveat introduces a second technical lesson, explain it separately or narrow the claim so the extra lesson is unnecessary.

For a training guide, for example, distinguishing gradient calculation from the optimizer's update is necessary. A derivation of every optimization variant may be optional. Preserve the mechanism while choosing the level of detail deliberately.

## Write Connected Paragraphs

Use paragraphs of roughly 2–5 sentences. Start with a clear topic sentence, develop the idea, and connect it to the next handoff. Use familiar verbs and concrete objects.

A contrast can stay in the same paragraph when it completes the thought. Avoid automatic breaks at "but" or "however," long runs of single-sentence paragraphs, and dramatic fragments. Use lists for real parallel choices or sequences, not as a substitute for the explanation.

Prefer direct statements for established facts. Qualify interpretations where the evidence requires it; do not weaken every sentence with "might" or "we believe." Use "we observed" only for an observation the author can substantiate.

Use headings to reveal the argument. A title such as **How large language models are trained** can be more useful than an unsupported contrarian claim. Precise explanation does not require a provocative headline, a metric in the opening, or a promotional closing.

## Keep Examples And Sources In Their Proper Roles

Use original, self-contained prose and examples. A brief illustration should make the mechanism easier to understand. Reuse it only while it continues to teach something; remove a running scenario when the reader has to learn a second domain just to follow the main one.

Do not borrow a source video's analogy or reproduce its chapter order as the article's default structure. A user-requested case study can use the source's real example, with attribution and enough explanation to stand alone.

For standalone explainers, place source and inspiration links in the final `## References` section by default. Keep named attribution near claims when it matters and preserve the detailed source-to-claim map in `refs/<slug>/README.md`. Follow explicit inline-citation or bibliography requirements when applicable. Credit an editorial reference as editorial inspiration, not technical evidence for an unrelated topic.

Separate original illustrations, measured results, source-reported findings, and interpretations. Never turn a toy example into evidence of production performance or describe an unexecuted demonstration as tested code.

## Integrate Diagrams With The Narrative

Plan each figure around one question that the prose has made understandable. Introduce its terms first, then place the image beside the mechanism it explains. The article should still make sense through its prose, caption, and alt text.

Use captions to decode relationships and explain important omissions or schematic scale. Keep exact results and their conditions in text or repo-native charts. A conceptual generated image does not establish a measurement or prove correctness.

Check the image at its actual desktop and mobile display widths. Reduce oversized figures that interrupt a short aside, simplify unreadable labels, and provide a full-resolution view when useful. Check the complete reading column for excessive margins as well as overflow. Native image inspection alone does not establish rendered readability.

Follow the image-generation and independent image-review skills for producing and checking assets. Reuse an approved diagram only after checking its fit with the revised explanation and caption.

## Calibrate Claims And Limits

Explain what the method optimizes or measures and why that differs from the outcome the reader ultimately cares about. An objective can encourage better behavior without guaranteeing it on every example or preserving every other skill.

Put a meaningful limit close to the claim it qualifies. Name what was checked, what remains unknown, or what additional evidence is needed. A separate limitations section is useful when it has a distinct job; it is not a mandatory container for scattered caveats.

Do not claim universal or "100%" accuracy. Verify material claims with primary sources, check arithmetic and scope, and report any unresolved factual question. Refer to `blog-factuality-review` for the evidence audit.

## Revise For Comprehension

When a draft is hard to follow, check the causal outline before polishing sentences or generating more images. Find the first undefined concept, unexplained transition, or unnecessary detour. Repair that point and read onward from it.

A simulated beginner review should explain the central mechanism in its own words, trace what moves between stages, distinguish easily confused concepts, state what the evidence cannot prove, and identify a useful next action. It should use only the draft to test comprehension, with source checking performed separately.

Review the revised text, not an earlier approved snapshot. Distinguish source-based factuality, simulated reader comprehension, image accuracy, and browser validation. Do not describe an agent's teach-back as a test with actual human readers.

## References And Local Quality Example

- [Building always-on agents](https://claude.com/resources/articles/building-always-on-agents), William Hu / Anthropic: editorial reference for explaining a core cycle before its primitives, connecting paragraphs, and placing diagrams beside mechanisms. Use the teaching approach without copying prose or importing its agent-specific claims.
- `data/blogs/how-to-train-llms.mdx`: the approved local example of progressive explanation, brief mechanism-level examples, precise limits, and integrated figures. Its length, section count, and topic-specific sequence are not a universal template.
