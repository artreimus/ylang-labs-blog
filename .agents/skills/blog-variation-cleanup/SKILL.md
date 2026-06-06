---
name: blog-variation-cleanup
description: 'Clean up Ylang Labs blog variation artifacts after the user selects a winning draft from the blog-variation-orchestrator workflow. Use when the user chooses, approves, selects, or finalizes one blog variant and wants the agent to remove, archive, or reconcile the other subagent-created blog drafts, variant MDX files, image folders, reference packets, social-copy drafts, and temporary variant notes. Audits selected versus unselected artifacts first, preserves unrelated work, and keeps the final selected blog package repo-ready.'
---

# Blog Variation Cleanup

Use this skill after `blog-variation-orchestrator` produces multiple candidate blog variants and the user chooses one direction. The cleanup agent turns that choice into a clean repo state: the selected variant remains or becomes the production blog package, while unselected variants are removed or archived according to the chosen cleanup mode.

This skill is for cleanup of artifacts from the current variation workflow. It is not a general stale-content deleter and must not remove older published posts, unrelated draft posts, or user-owned files just because they look similar.

## Inputs To Establish

Infer these from the conversation, repo files, and orchestrator output where possible:

- Selected variant id, title, slug, or file path.
- The variant set that was produced by the five writer subagents.
- Cleanup mode:
  - `prune`: delete unselected variant artifacts.
  - `archive`: move unselected variants into an explicit archive path such as `posts/variants/<slug>/archive/`.
  - `report-only`: produce a cleanup manifest without changing files.
- Whether the selected variant should become `data/blogs/<slug>.mdx` or stay as a draft artifact.
- Whether selected images should live in `public/static/images/blogs/<slug>/`.
- Whether selected source notes should live in `refs/<slug>/README.md`.

Ask one concise question only if the selected variant cannot be determined. If cleanup mode is not specified, default to `report-only`. Use `prune` or `archive` only when the user explicitly asks to remove, prune, delete, or archive artifacts, or confirms the cleanup manifest.

## Skills To Use

Load these skills as needed:

- `.agents/skills/blog-variation-orchestrator/SKILL.md` to understand the variant workflow and output paths.
- `.agents/skills/blog-mdx-authoring/SKILL.md` when reconciling the selected variant into production MDX, frontmatter, references, and asset paths.
- `.agents/skills/blog-publishing-workflow/SKILL.md` when the selected variant still needs downstream packaging, social copy, validation, or PR preparation.
- `.agents/skills/blog-image-cropper/SKILL.md` when selected cover assets need final dimensions or asset-folder reconciliation.
- `.agents/skills/blog-factuality-review/SKILL.md` before finalizing a selected repo-backed post.

## Cleanup Workflow

### 1. Establish The Current State

Before changing files:

1. Run `git status --short --untracked-files=all`.
2. Read `AGENTS.md`.
3. Inspect the selected variant artifact and the unselected variant artifacts.
4. Inspect the expected production surfaces:
   - `data/blogs/<slug>.mdx`
   - `public/static/images/blogs/<slug>/`
   - `refs/<slug>/`
   - `posts/social-media-<slug>.md`
   - `posts/variants/<slug>/`
5. Identify pre-existing unrelated dirty files and exclude them from the cleanup set.

Never delete or move a file unless you can connect it to the current variation workflow or the user explicitly named it.

### 2. Build A Cleanup Manifest

Create a manifest in the working notes before editing. Do not save a separate manifest file unless the user asks for one.

Use this structure:

```markdown
## Selected Variant
- id:
- source path:
- final slug:
- production MDX:
- production asset folder:

## Keep
- [paths that remain]

## Promote Or Reconcile
- [variant paths that become production paths]

## Remove Or Archive
- [unchosen variant paths]

## Leave Untouched
- [dirty or similar paths outside this cleanup scope]

## Open Questions
- [only blockers]
```

If a path is ambiguous, put it under `Open Questions` or `Leave Untouched`, not `Remove Or Archive`.

### 3. Promote The Selected Variant

If the selected variant is not already the production blog package:

- Convert or merge it into `data/blogs/<slug>.mdx` using `blog-mdx-authoring`.
- Keep production frontmatter aligned with `contentlayer.config.ts`.
- Point `cardImage` to `/static/images/blogs/<slug>/cardImage.png`.
- Point `images[0]` to `/static/images/blogs/<slug>/blogHeader.png`.
- Move or regenerate selected images into `public/static/images/blogs/<slug>/` only when they are clearly selected.
- Move selected source notes into `refs/<slug>/README.md` only when they are publication-safe.
- Keep private scratch notes, prompt transcripts, and unselected source packets out of production refs unless the user explicitly asks to keep them.

Do not promote multiple variants into separate production MDX files unless the user explicitly chooses multiple winners.

### 4. Remove Or Archive Unselected Variants

Only clean artifacts that belong to unselected variants from this workflow. Common paths include:

- `posts/variants/<slug>/<variant-id>.md`
- `posts/variants/<slug>/<variant-id>/`
- `data/blogs/<slug>-variant-*.mdx`
- `data/blogs/<variant-slug>.mdx` when the file was created only for an unselected variant
- `public/static/images/blogs/<slug>-variant-*/`
- `refs/<slug>-variant-*/`
- `posts/social-media-<slug>-variant-*.md`
- temporary comparison notes or candidate files named after unselected variant ids

Use cleanup mode:

- `prune`: remove unselected artifacts.
- `archive`: move them under a single archive folder, preserving names.
- `report-only`: list what would be removed or archived, with no file edits.

Before pruning, confirm:

- The selected variant has a complete production path or the user only requested variant cleanup.
- The unselected file is not referenced by the selected MDX, social copy, source log, or asset frontmatter.
- The unselected file was not present before the current workflow unless the user explicitly approved removing it.

### 5. Reconcile Cross-References

After removal or archiving:

- Search the selected MDX, selected refs, and selected social copy for unselected variant slugs and asset paths.
- Ensure no selected artifact points at deleted image folders or old variant MDX paths.
- Remove stale links to unselected source notes or prompts from publication-safe `refs/<slug>/README.md`.
- If generated tag/search files changed during validation, keep them out of the cleanup result unless the task explicitly owns them.

### 6. Validate

For a selected production blog package:

- Confirm `data/blogs/<slug>.mdx` exists.
- Confirm every referenced image exists.
- Confirm `cardImage.png` is `1080x1920` and `blogHeader.png` is `1260x700` when generated/cropped assets are used.
- Confirm unselected variant paths are gone, archived, or explicitly listed as untouched.
- Run `blog-factuality-review` when the selected MDX is new or materially changed.
- Run `pnpm build` when feasible for MDX, citation, image, or component-visible changes.

For report-only cleanup, validation is the manifest plus reference search.

## Response Behavior

When cleanup is complete, report:

- The selected variant retained or promoted.
- What was removed, archived, or left untouched.
- Any ambiguity that prevented cleanup.
- Which validation ran.
- Any unrelated dirty files that were intentionally preserved.

Do not claim the repo is clean unless `git status --short --untracked-files=all` proves it.
