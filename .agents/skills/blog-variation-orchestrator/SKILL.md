---
name: blog-variation-orchestrator
description: 'Default Ylang Labs blog creation and drafting skill. Use this skill first when the user asks to create, write, draft, ideate, or turn an idea into a new Ylang Labs blog post, especially when no final direction has been selected yet. Orchestrates a five-subagent blog variation workflow by having subagents produce five distinct article variants with cover and inline image specs, then coordinates selection or synthesis into a final MDX-ready draft. The main agent assigns repo blog writing, MDX, image, cropper, factuality review, cleanup, and publishing skills to subagents rather than doing that specialist work itself. Also use when the user explicitly asks for multiple blog variations, five or more subagents/agents, parallel writing agents, or a main agent to coordinate different writing styles and image directions. If the user only asks to package, prepare, or publish an already selected final draft, use blog-publishing-workflow instead.'
---

# Blog Variation Orchestrator

Use this skill to coordinate five independent writer subagents and turn their outputs into a stronger Ylang Labs blog direction. The main agent orchestrates: it builds the shared brief, spawns subagents, assigns skills and responsibilities, compares outputs, integrates the selected direction, and reports validation. The subagents use the specialist blog, image, cleanup, and review skills to do the work.

The goal is not five shallow rewrites. Each subagent should explore a genuinely different editorial strategy, structure, opening, technical emphasis, and visual direction.

This is the default create-blog workflow for this repo. When the user says "create a blog," "write a blog," "draft a post," or "turn this idea into a post," use this orchestrator first unless they explicitly request another workflow. If the user asks only to package, prepare, or publish an already selected final draft, use `blog-publishing-workflow`.

## Operating Rules

- Spawn at least five writer subagents when multi-agent tooling is available for a Ylang Labs blog creation request, because the repo owner has made this the default create-blog workflow.
- Do not count the main agent as one of the five writer subagents.
- Do not count optional reviewer, image-review, research, or cleanup subagents toward the five writer subagents.
- If multi-agent tooling is unavailable or platform policy blocks subagent use, report the blocker or ask before continuing. Do not pretend local passes were subagents.
- Keep the five writer tasks independent and non-overlapping.
- By default, writer subagents return drafts and image specs to the main agent without editing files.
- If the user asks to save every variant, assign each writer a unique output path under `posts/variants/<slug>/<variant-id>.md`.
- If the user asks to generate full image files for every variant, assign each variant a unique asset folder such as `public/static/images/blogs/<slug>-variant-<variant-id>/`.
- Preserve unrelated work. Run `git status --short --untracked-files=all` before repo writes and do not touch unrelated dirty files.
- Do not commit unless the user explicitly asks.

## Orchestrator Role

The main agent should stay out of specialist execution when subagents can do it. Its job is to:

- Inspect the repo enough to create an accurate shared brief.
- Decide which subagent role owns each specialist skill.
- Spawn the writer, asset, cleanup, and review subagents with clear prompts.
- Compare outputs and choose or synthesize the final direction.
- Apply only the final integration edits that cannot be cleanly delegated.
- Verify that subagent outputs satisfy the repo contract.

The main agent may read specialist skills to write accurate prompts, but the subagents should be told to load and apply those skills themselves.

## Subagent Skill Responsibilities

Assign specialist skills to subagents explicitly:

### Writer Subagents

Every writer subagent must load:

- `.agents/skills/blog-writing-guide/SKILL.md` for Ylang Labs voice, structure, title quality, banned language, and the 5-minute default.

Use role-specific additions:

- **Engineering deep dive writer**: also load `.agents/skills/technical-blog-image-generator/SKILL.md` for architecture plates, system maps, and technical figure specs.
- **Practical implementation guide writer**: also load `.agents/skills/blog-mdx-authoring/SKILL.md` for MDX structure, code-friendly post shape, frontmatter expectations, and component conventions.
- **Opinion or strategy essay writer**: also load `.agents/skills/oil-painting-image-generator/SKILL.md` for metaphor-led cover concepts.
- **Research or explainer writer**: also load `.agents/skills/blog-factuality-review/SKILL.md` for claim discipline and source-backed framing, and `.agents/skills/technical-blog-image-generator/SKILL.md` for taxonomy or evaluation visuals.
- **Build story or product narrative writer**: also load `.agents/skills/blog-mdx-authoring/SKILL.md` and `.agents/skills/oil-painting-image-generator/SKILL.md` for production post shape and cover direction.

### Asset Subagents

When the workflow needs actual image assets rather than image specs:

- Assign an image subagent to load `.agents/skills/oil-painting-image-generator/SKILL.md` for source artwork.
- Assign a crop subagent to load `.agents/skills/blog-image-cropper/SKILL.md` for `cardImage.png` and `blogHeader.png`.
- Assign a technical image subagent to load `.agents/skills/technical-blog-image-generator/SKILL.md` for inline technical figures.
- Assign an image QA subagent to load `.agents/skills/technical-blog-image-review/SKILL.md` when generated technical visuals carry factual meaning.

### Finalization Subagents

After the user chooses a winning variant:

- Assign an MDX/package subagent to load `.agents/skills/blog-mdx-authoring/SKILL.md` and `.agents/skills/blog-publishing-workflow/SKILL.md` for final repo packaging.
- Assign a cleanup subagent to load `.agents/skills/blog-variation-cleanup/SKILL.md` to audit unselected variant artifacts. It should default to report-only unless the user explicitly approves prune or archive.
- Assign a factuality-review subagent to load `.agents/skills/blog-factuality-review/SKILL.md` before finalizing a new or materially changed repo-backed post.

## Inputs To Establish

Infer missing details from the user request and repo when possible.

- Topic, working title, draft, outline, source notes, or target MDX file.
- Intended audience and desired outcome.
- Whether the user wants five returned variants only, five saved variant files, or a final selected MDX post.
- Whether image output means image concepts only, images for the selected final draft, or full image files for all five variants.
- Author slug, tags, target date, draft status, canonical URL, and source requirements when creating MDX.
- External sources that must be used or verified.

Ask one concise question only if there is no usable topic or draft and no reasonable way to infer one.

## Main-Agent Workflow

### 1. Build The Shared Brief

Before spawning writer subagents:

1. Run `git status --short --untracked-files=all`.
2. Read `AGENTS.md`.
3. Read only enough of the specialist skills to brief subagents accurately; do not perform specialist drafting, image, cleanup, or review work locally when it can be delegated.
4. Inspect the target MDX file, nearby posts, `contentlayer.config.ts`, and matching asset folder when the work is repo-backed.
5. Research current or external factual claims when needed. Prefer primary sources and record source URLs and dates.
6. Create a compact brief for subagents:
   - topic and thesis candidates
   - target reader
   - source facts and must-use evidence
   - claims that must be avoided, softened, or verified
   - expected post type and reading-time limit
   - likely slug, tags, authors, and asset paths if known
   - image constraints and whether images are concepts or actual files

Do not let subagents invent repo conventions, unsupported metrics, dates, product claims, citations, or asset paths.

### 2. Spawn Five Writer Subagents

Spawn one writer for each profile. Give all writers the shared brief, the same source constraints, and a distinct style assignment.

1. **Engineering deep dive**
   - Emphasis: mechanism, architecture, tradeoffs, failure modes, implementation details.
   - Visual direction: architecture plate, system map, or cover metaphor grounded in the central mechanism.
2. **Practical implementation guide**
   - Emphasis: concrete steps, code or pseudo-code shape, checklists, validation path, common mistakes.
   - Visual direction: process map, blueprint teardown, or step-by-step diagram.
3. **Opinion or strategy essay**
   - Emphasis: sharp claim, tension, principle, consequences, examples, closing stance.
   - Visual direction: metaphor-led cover plus one simple conceptual figure.
4. **Research or explainer**
   - Emphasis: definition, why now, how it works, evaluation, limitations, practical guidance.
   - Visual direction: exploded technical plate, evaluation loop, or taxonomy diagram.
5. **Build story or product narrative**
   - Emphasis: outcome, constraints, old approach, build or migration design, validation, hindsight.
   - Visual direction: before/after diagram, workflow narrative, or product-system storyboard.

Each writer must produce a different title, opening, section structure, argument path, and image plan.

### 3. Writer Prompt Template

Use or adapt this prompt for each subagent:

```text
You are one of five independent writer subagents for a Ylang Labs blog variation workflow.

Repo: [current repository root from the main agent, preferably the output of `git rev-parse --show-toplevel`]
Assigned variant: [engineering-deep-dive | implementation-guide | opinion-strategy | research-explainer | build-story]

Use the shared brief below and follow the Ylang Labs blog standards in:
- AGENTS.md
- .agents/skills/blog-writing-guide/SKILL.md
- [role-specific skills assigned by the orchestrator]

Do not edit files unless this prompt gives you a unique output path. Do not create shared assets. Do not invent sources, metrics, release dates, product capabilities, or citations.

Required skills for this subagent:
- [list exact `.agents/skills/.../SKILL.md` files assigned for this role]

Shared brief:
[brief]

Return one distinct blog variation in this exact structure:

## Variant
- id:
- title:
- post_type:
- target_reader:
- summary:
- tldr:

## Draft
[A concise draft or detailed article skeleton, depending on the user's requested depth. Use information-bearing H2s.]

## Image Plan
- cover_source_artwork_prompt:
- card_crop_notes:
- header_crop_notes:
- inline_images:
  - filename:
    placement:
    prompt_or_spec:
    caption:

## Source And Claim Notes
- verified_facts:
- claims_to_verify:
- claims_to_avoid:

## Why This Variant Is Different
[Explain the editorial bet in 2-4 bullets.]
```

If the user asked for saved variants, add:

```text
Write your output only to: posts/variants/<slug>/<variant-id>.md
List the file path you changed. Do not touch any other files.
```

### 4. Collect And Compare

Wait until five writer outputs complete. If a writer fails or returns unusable output, spawn a replacement writer with the same profile before finalizing. Do not proceed with fewer than five completed writer variants unless tooling is blocked and the final response clearly says so.

Compare the five variants on:

- factual support and source discipline
- strength of thesis
- specificity for AI engineering readers
- technical depth without bloat
- clarity of opening and H2 structure
- usefulness of image plan
- fit with the 5-minute default
- novelty versus nearby Ylang Labs posts

Return a short comparison matrix when useful, then recommend one of:

- publish one variant mostly intact
- synthesize a final draft from two or more variants
- run another round for a specific weakness
- stop at variant options because source gaps or user choices are blocking

If the user chooses one variant after this comparison, assign a cleanup subagent to use `blog-variation-cleanup` to audit selected and unselected artifacts. Prune or archive only when the user explicitly asks for that cleanup mode or confirms the cleanup manifest.

### 5. Create The Final Blog Package

Only write repo files when the user requested files, a final draft, a complete post, or publication prep.

For the selected or synthesized post, assign subagents rather than doing the specialist work locally:

1. Assign an MDX/package subagent to use `blog-mdx-authoring` for `data/blogs/<slug>.mdx`, frontmatter, references, and asset paths.
2. Assign a writer/editor subagent to use `blog-writing-guide` for the final prose pass.
3. Assign image and crop subagents to use `oil-painting-image-generator` for normal cover artwork, then `blog-image-cropper` for:
   - `public/static/images/blogs/<slug>/cardImage.png` at `1080x1920`
   - `public/static/images/blogs/<slug>/blogHeader.png` at `1260x700`
4. Assign a technical image subagent to use `technical-blog-image-generator` for inline section visuals or technical cover variants.
5. If subagents only produce image prompts, label them as prompts/specs and do not claim files exist.
6. Keep exact labels, numbers, and citations in MDX captions or body text instead of inside generated images unless the user explicitly wants image text.

When the user asks for full image files for all five variants, keep each variant's image files in a separate variant asset folder. Do not point production MDX frontmatter at variant folders unless that variant is selected.

After a selected final package exists, assign a cleanup subagent to use `blog-variation-cleanup` to report on remaining unselected variant MDX files, image folders, reference packets, social-copy drafts, or variant notes. Remove or archive them only with explicit user approval.

### 6. Validate

For any final repo-backed post:

- Confirm frontmatter fields exist in `contentlayer.config.ts`.
- Confirm referenced image files exist.
- Confirm `cardImage.png` and `blogHeader.png` dimensions when generated or cropped.
- Confirm references or citations support the claims.
- Assign an independent `blog-factuality-review` subagent before finalizing a new or materially changed post.
- Assign a `technical-blog-image-review` subagent when technical visuals carry factual meaning.
- Run `pnpm build` when feasible for MDX, citations, images, or component-visible changes.

State validation results and any skipped validation clearly.

## Final Response Shape

When the workflow produces variants only:

- Name the five variants and their editorial bets.
- Recommend the strongest option and explain why.
- Include image directions or prompt summaries for each variant.
- List source gaps or decisions needed before drafting final MDX.

When the workflow writes files:

- List changed files.
- State which variant or synthesis was chosen.
- State which validations ran.
- Mention unrelated dirty files left untouched.
- Mention follow-up work, technical debt, missing validation, and edge cases discovered during the workflow.
