---
name: blog-review
description: 'Review, critique, fact-check, and validate Ylang Labs blog drafts or published posts. Use this skill when the user asks to review a blog, check factual accuracy, assess MDX/frontmatter/assets/citations, find unsupported claims, or provide editorial feedback before publishing. Pair with `anthropic-blog-style` when the requested review includes Anthropic-like tone, evidence-led prose, caveats, or research-lab style.'
---

# Blog Review

Use this skill to review Ylang Labs blog posts with a factuality-first standard. The goal is to identify material problems, unsupported claims, repo-contract issues, and practical improvements without fabricating certainty.

## Operating Rules

- Treat the live repo and cited sources as the source of truth. Do not rely on memory for current facts, library APIs, model names, dates, benchmark numbers, or vendor behavior.
- Preserve unrelated work. Run `git status --short` before local edits, and do not modify files unless the user explicitly asks for fixes.
- Be explicit about evidence. Separate source-backed findings from editorial judgment, inference, and unresolved uncertainty.
- Never invent citations, quotes, author names, dates, benchmark results, product capabilities, source conclusions, or repo behavior.
- Prefer primary sources for fact checks: official docs, release notes, papers, repositories, standards, or the project's own source files.
- For library/framework/API details, use Context7 when available. If Context7 is unavailable or insufficient, use web search and cite the sources used.
- For current or time-sensitive claims, use live web verification. Include exact dates when timing matters.
- If a claim cannot be verified, say so and recommend either removing it, weakening it, or adding a source.
- Do not claim the review proves the post is "100% accurate." State the verification surface and residual risk.

## Inputs To Identify

Derive these from the request and repo when possible:

- Blog target: `data/blogs/<slug>.mdx`, a draft file, a PR diff, a rendered URL, or pasted content.
- Review mode: factual accuracy, editorial quality, technical correctness, repo/MDX compliance, citation audit, publication readiness, or all of the above.
- Intended audience and style direction. If the user asks for Anthropic-like, measured, evidence-led, caveat-heavy, or research-lab prose, read `.agents/skills/anthropic-blog-style/SKILL.md`.
- Whether the user wants a read-only review or wants fixes applied after the review.

Ask one concise question only if there is no review target and no reasonable way to infer it.

## Skills And Files To Load

Always inspect:

- `AGENTS.md` for current repo instructions.
- `contentlayer.config.ts` for the current Blog schema.
- The target MDX file or supplied draft.
- The matching asset directory under `public/static/images/blogs/<slug>/`, when the post is repo-backed.
- The matching reference packet under `refs/<slug>/`, when the post uses external sources, user-provided research, vendor docs, papers, datasets, or trend evidence.

Load related skills only when relevant:

- `.agents/skills/blog-authoring/SKILL.md` for frontmatter, citations, asset paths, MDX component conventions, and publishing contracts.
- `.agents/skills/anthropic-blog-style/SKILL.md` for prose and evidence-style review.
- `.agents/skills/blog-image-creator/SKILL.md` when reviewing cover/header assets or dimensions.
- `.agents/skills/trending-blog-topic-research/SKILL.md` when reviewing claims based on current technical discourse.

## Review Workflow

### 1. Establish Scope

- Run `git status --short` and note unrelated dirty files.
- Locate the blog source and determine whether it is a full MDX post, partial draft, PR diff, or published page.
- Read nearby posts when useful to compare local conventions, but do not treat old posts as authoritative if `AGENTS.md` or `contentlayer.config.ts` says otherwise.
- Decide whether external verification is needed. It is required for current facts, vendor/library/API behavior, benchmark numbers, dates, claims about releases, comparisons, legal/security statements, and anything not directly proven by the repo or provided sources.

### 2. Check Repo And MDX Contracts

For repo-backed MDX posts, verify:

- Frontmatter uses only fields declared in `contentlayer.config.ts`.
- Required fields are present: `title`, `date`, useful `tags`, `draft`, `summary`, `tldr`, `authors`, `cardImage`, `images`, and `layout` when the selected layout expects them.
- `authors` values exist under `data/authors/`.
- Tags match existing editorial taxonomy when possible.
- `cardImage` and `images[0]` point to existing files under `public/static/images/blogs/<slug>/`.
- `cardImage.png` is `1080x1920` and `blogHeader.png` is `1260x700` when generated/cropped blog art is expected.
- MDX components used in the post are registered in `components/MDXComponents.tsx`.
- Image paths are absolute public paths such as `/static/images/blogs/<slug>/diagram.png`.
- Links, code blocks, tables, Mermaid diagrams, and citations render under the current Contentlayer pipeline.

Run `pnpm build` when feasible for publication-readiness reviews or when MDX/frontmatter/components changed. Run `pnpm lint` when reviewing code or component changes.

### 3. Audit Sources And Claims

Build a working claim map before judging accuracy:

- Repo-internal claims: verify against repository files, docs, routes, config, or source code.
- External technical claims: verify against primary docs, specs, release notes, papers, or repositories.
- Numeric claims: verify exact values, units, dates, benchmark conditions, and whether the comparison is apples-to-apples.
- Time-sensitive claims: verify with current sources and include concrete dates in the review.
- Comparative claims: check whether the comparison names the baseline, scope, and conditions.
- Forward-looking claims: make sure they are framed as plans, expectations, or hypotheses unless backed by evidence.
- Interpretation claims: ensure the source actually supports the conclusion, not just the topic.

Label each material claim as one of:

- `Verified`: supported by the repo, provided material, or cited primary source.
- `Needs source`: plausible but not backed by a source in the post or reference packet.
- `Incorrect`: contradicted by the source or repo.
- `Overstated`: directionally true but stronger than the evidence supports.
- `Outdated`: once true or plausible, but stale against current sources.
- `Unclear`: ambiguous wording or missing context prevents verification.

When a source is weak, prefer a concrete rewrite such as "replace `proves` with `suggests`" or "add a citation to the release notes for this date."

### 4. Review Editorial Quality

Assess whether the post works for Ylang Labs' audience: practical AI engineering, agents, LLM systems, RAG, evaluation, ML infrastructure, and implementation lessons.

Check for:

- A clear thesis or technical question.
- Specific mechanisms, architecture, examples, or implementation detail.
- Evidence before impact claims.
- Accurate caveats and limitations.
- Concrete takeaways in `summary` and `tldr`.
- Claims calibrated to the proof surface.
- No hype language without evidence.
- No unnecessary marketing prose, vague superlatives, or buzzword stacking.
- A conclusion that explains implications, next steps, or practical use.

For Anthropic-like style reviews, apply `.agents/skills/anthropic-blog-style/SKILL.md` as the rubric, but still keep factual accuracy above style.

### 5. Check Citations And References

For sourced posts:

- Confirm `refs/<slug>/README.md` exists and logs each source with title, URL or local path, publisher/author when known, publication date when known, access date for web sources, and a note on how it supports the post.
- Confirm MDX citations or manual references trace back to the source log.
- If using BibTeX citations, confirm `bibliography: references-data.bib` is present and keys used in MDX exist in `data/references-data.bib`.
- Do not accept a citation just because it exists. Check that the cited source supports the sentence attached to it.
- Avoid long copied excerpts. Use short quotes only when needed and preserve attribution.

## Severity Guide

- `P0`: False or unsupported claim that creates major legal, safety, security, reputational, or publishing risk.
- `P1`: Material factual error, broken build, missing primary asset, invalid frontmatter, or citation failure that should block publishing.
- `P2`: Unsupported or overstated claim, missing caveat, unclear technical explanation, non-blocking asset/reference issue, or meaningful editorial weakness.
- `P3`: Polish issue, minor wording improvement, weak transition, small metadata refinement, or optional enhancement.

Lead with findings ordered by severity. Do not bury important factual problems under compliments.

## Report Format

Use this structure for read-only reviews:

```markdown
## Findings

- [P1] <short title>
  Location: `<file>:<line>` or `<section>`
  Issue: <what is wrong and why it matters>
  Evidence: <repo file/source link/source note>
  Recommended fix: <specific correction or rewrite>

## Factuality Notes

- Verified: <high-value claims checked and how>
- Needs source: <claims that remain plausible but unsupported>
- Could not verify: <claims blocked by missing source/tool access>

## Repo/MDX Checks

- Frontmatter: <pass/fail/not checked>
- Assets: <pass/fail/not checked>
- References: <pass/fail/not checked>
- Build/lint: <commands run or why not run>

## Summary

<publication-readiness judgment and the smallest set of next actions>
```

If there are no findings, say that clearly, then state the verification coverage and residual risks.

## Applying Fixes

Only edit files when the user asks for fixes.

When fixing:

- Patch the smallest set of files needed.
- Keep factual corrections traceable to sources.
- Do not add new claims while rewriting unless they are sourced.
- Update `refs/<slug>/README.md`, `data/references-data.bib`, or manual references when adding sources.
- Re-run the relevant validation from the review.
- Report any unrelated dirty files left untouched.

## Quality Checklist

Before finalizing a review, confirm:

- The target blog was identified and read.
- Relevant repo instructions and local skills were checked.
- Factual claims were separated from editorial judgments.
- High-risk claims were verified against primary or current sources.
- Unsupported claims were explicitly marked instead of silently accepted.
- Recommended rewrites are more accurate than the original.
- Repo contracts were checked for MDX/frontmatter/assets/citations when applicable.
- Validation commands and external sources are listed, or gaps are clearly stated.
- The final answer does not overstate certainty beyond the verification performed.
