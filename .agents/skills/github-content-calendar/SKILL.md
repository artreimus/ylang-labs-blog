---
name: github-content-calendar
description: Use this skill whenever the user wants to use GitHub Issues and GitHub Projects as the Ylang Labs content calendar, including creating editorial issues, scheduling blog/project/social content, updating project calendar fields, auditing planned posts, or moving content through idea, drafting, asset, scheduled, and published stages.
---

# GitHub Content Calendar

Use this skill to manage the Ylang Labs editorial calendar with GitHub Issues as content briefs and GitHub Projects as the scheduling board. The issue is the durable content brief and discussion thread; the Project item stores scheduling fields such as stage, content type, tags, target date, end date, channel, slug, and priority.

## Operating Rules

- Keep the repository content files as the publishing source of truth. Calendar issues track intent, status, links, and deadlines; they do not replace `data/blogs/*.mdx`, `data/projects/*.mdx`, image assets, or social-copy files.
- Check live GitHub state before changing issues or project fields. Do not assume project numbers, field IDs, option IDs, labels, or existing issue coverage.
- Preserve unrelated local work. Run `git status --short` before local repo edits, but most calendar work should use `gh` and not touch source files.
- Never commit unless the user explicitly asks.
- If GitHub Projects auth is missing, stop and report the exact refresh command. Do not guess at calendar state from stale issue lists.

## Required Tooling

Use the local GitHub CLI first:

```bash
gh repo view --json owner,name,url,defaultBranchRef
gh auth status
gh project --help
```

GitHub Projects requires project scopes. If project commands fail with missing scope errors, ask the user to authorize or run:

```bash
gh auth refresh -s read:project -s project
```

If the GitHub connector is available, it can help inspect issues and PRs, but prefer `gh project` for Project v2 field reads and mutations.

## Calendar Model

Default project title:

```text
Ylang Labs Content Calendar
```

Default issue title prefixes:

- `[Blog] <working title>`
- `[Project] <project/showcase title>`
- `[Social] <campaign or post title>`
- `[Research] <research theme>`

Default project fields:

- `Stage` single select: `Idea`, `Research`, `Outline`, `Drafting`, `Editing`, `Assets`, `Scheduled`, `Published`, `Parked`
- `Content Type` single select: `Blog`, `Project`, `Newsletter`, `Social`, `Website`, `Research`
- `Tags` text: comma-separated canonical tag slugs from `app/blog-tag-data.json` or `app/project-tag-data.json`
- `Target Date` date: the intended publish date, launch date, or first day of the content window; this is the primary calendar date
- `End Date` date: the final day of the content window, campaign, or completion target; for single-day items, set it equal to `Target Date`
- `Channel` single select: `Website`, `LinkedIn`, `Twitter/X`, `Newsletter`, `GitHub`
- `Slug` text: the expected repo slug, such as `agent-memory-evaluation-patterns`
- `Priority` single select: `High`, `Medium`, `Low`

The GitHub CLI can create projects and fields, but it does not expose a first-class command for creating a visual Calendar view. Set up the `Target Date` field through CLI, then open the Project in the browser and create or verify a Calendar view using `Target Date` when needed:

```bash
gh project view <project-number> --owner <owner> --web
```

## Tag Metadata

Always load tag metadata before creating or updating a calendar item:

```bash
cat app/blog-tag-data.json
cat app/project-tag-data.json
```

Select the tag source from the content type:

- `Blog`, blog-backed `Social`, and `Newsletter` items use `app/blog-tag-data.json`.
- `Project` and project-showcase `Website` items use `app/project-tag-data.json`.
- `Research` items use the tag source that matches the intended downstream artifact. If unclear, record the likely tag source in the issue and ask before creating project metadata.

The JSON keys are slugified tag metadata generated from existing frontmatter by `contentlayer.config.ts`. Use the keys as project metadata values, such as `aiml`, `agents`, or `context-engineering`. When writing a future MDX file, prefer the human-readable tag form already used in content frontmatter, such as `AI/ML`, `Agents`, or `Context Engineering`.

If a requested topic needs a new tag that is absent from the relevant JSON file, do not invent it silently. Note the proposed new tag in the issue description and call out that the repo content/frontmatter will need to introduce it before the generated tag data will include it.

## Discovery Workflow

1. Identify the repo and owner:

   ```bash
   gh repo view --json owner,name,url,defaultBranchRef
   ```

2. Verify project access:

   ```bash
   gh project list --owner <owner> --format json
   ```

3. Find the content calendar project by title, or use the project named by the user:

   ```bash
   gh project list --owner <owner> --format json
   gh project view <project-number> --owner <owner> --format json
   gh project field-list <project-number> --owner <owner> --format json
   ```

4. Check the issue queue before creating new items:

   ```bash
   gh issue list --state all --label blog --limit 100 --json number,title,state,labels,url
   gh issue list --state all --search "<search terms> in:title" --json number,title,state,labels,url
   ```

5. Check existing labels and create only missing labels that are needed for the task:

   ```bash
   gh label list --limit 100 --json name,color,description
   gh label create blog --color fbca04 --description "Blog post"
   ```

   The `blog` label already exists in this repo as of the current setup. Do not rewrite existing label colors or descriptions unless the user asks.

## Bootstrap A Project

Only bootstrap a new project when the user asks to set up the calendar or no suitable calendar project exists and the user clearly wants one created.

```bash
gh project create --owner <owner> --title "Ylang Labs Content Calendar" --format json
gh project field-list <project-number> --owner <owner> --format json
```

Create missing fields, not duplicates:

```bash
gh project field-create <project-number> --owner <owner> --name "Stage" --data-type SINGLE_SELECT --single-select-options "Idea,Research,Outline,Drafting,Editing,Assets,Scheduled,Published,Parked"
gh project field-create <project-number> --owner <owner> --name "Content Type" --data-type SINGLE_SELECT --single-select-options "Blog,Project,Newsletter,Social,Website,Research"
gh project field-create <project-number> --owner <owner> --name "Tags" --data-type TEXT
gh project field-create <project-number> --owner <owner> --name "Target Date" --data-type DATE
gh project field-create <project-number> --owner <owner> --name "End Date" --data-type DATE
gh project field-create <project-number> --owner <owner> --name "Channel" --data-type SINGLE_SELECT --single-select-options "Website,LinkedIn,Twitter/X,Newsletter,GitHub"
gh project field-create <project-number> --owner <owner> --name "Slug" --data-type TEXT
gh project field-create <project-number> --owner <owner> --name "Priority" --data-type SINGLE_SELECT --single-select-options "High,Medium,Low"
```

After bootstrapping, report:

- Project URL
- Fields created or already present
- Whether the calendar view still needs browser setup
- Any auth scope gaps

## Create A Content Calendar Issue

Before creating an issue, dedupe by title, slug, and topic keywords. Also check the repo path if a slug is known:

```bash
gh issue list --state all --search "<working title> in:title" --json number,title,state,labels,url
test -e data/blogs/<slug>.mdx
test -e data/projects/<slug>.mdx
```

Use this issue body structure:

```markdown
## Metadata

- Type:
- Tags:
- Target date:
- End date:
- Channel:
- Working title:
- Slug:
- Owner:
- Priority:

## Description

<Describe the content idea, why it matters, and what should be produced.>

## Content Brief

- Audience:
- Angle:
- Primary takeaway:
- Source links:

## Editorial Plan

- Outline:
- Assets needed:
- References/citations:
- Social copy:
- PR/link when drafted:

## Acceptance Criteria

- [ ] Brief has a clear technical angle and target audience.
- [ ] Draft content exists in the repo when the item moves past Drafting.
- [ ] Required images/assets exist when the item moves past Assets.
- [ ] `pnpm build` passes before publishing.
- [ ] Final post/project URL is linked here before closing.
```

Create the issue:

```bash
gh issue create --title "[Blog] <working title>" --label blog --body-file <body-file>
```

Use existing labels first. For blog posts, prefer the existing `blog` label. Store the canonical metadata tags in the issue body and `Tags` project field, not as GitHub labels by default. Add new GitHub labels only when they improve filtering and the user wants the calendar taxonomy expanded.

## Add Or Update Project Fields

Capture IDs every time from the live project. Field IDs and option IDs are not stable across projects.

```bash
PROJECT_ID=$(gh project view <project-number> --owner <owner> --format json --jq '.id')
STAGE_FIELD_ID=$(gh project field-list <project-number> --owner <owner> --format json --jq '.fields[] | select(.name == "Stage") | .id')
CONTENT_TYPE_FIELD_ID=$(gh project field-list <project-number> --owner <owner> --format json --jq '.fields[] | select(.name == "Content Type") | .id')
TAGS_FIELD_ID=$(gh project field-list <project-number> --owner <owner> --format json --jq '.fields[] | select(.name == "Tags") | .id')
TARGET_DATE_FIELD_ID=$(gh project field-list <project-number> --owner <owner> --format json --jq '.fields[] | select(.name == "Target Date") | .id')
END_DATE_FIELD_ID=$(gh project field-list <project-number> --owner <owner> --format json --jq '.fields[] | select(.name == "End Date") | .id')
DRAFTING_OPTION_ID=$(gh project field-list <project-number> --owner <owner> --format json --jq '.fields[] | select(.name == "Stage") | .options[] | select(.name == "Drafting") | .id')
BLOG_OPTION_ID=$(gh project field-list <project-number> --owner <owner> --format json --jq '.fields[] | select(.name == "Content Type") | .options[] | select(.name == "Blog") | .id')
```

Add the issue to the project and update fields:

```bash
ITEM_ID=$(gh project item-add <project-number> --owner <owner> --url <issue-url> --format json --jq '.id')
gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" --field-id "$CONTENT_TYPE_FIELD_ID" --single-select-option-id "$BLOG_OPTION_ID"
gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" --field-id "$TAGS_FIELD_ID" --text "aiml,agents"
gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" --field-id "$TARGET_DATE_FIELD_ID" --date YYYY-MM-DD
gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" --field-id "$END_DATE_FIELD_ID" --date YYYY-MM-DD
gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" --field-id "$STAGE_FIELD_ID" --single-select-option-id "$DRAFTING_OPTION_ID"
```

For a project showcase, select the `Project` content-type option and use tags from `app/project-tag-data.json`. For social or newsletter items tied to a blog post, keep `Content Type` as `Social` or `Newsletter` but use the blog tag source so the taxonomy stays aligned with the related post.

For text fields:

```bash
SLUG_FIELD_ID=$(gh project field-list <project-number> --owner <owner> --format json --jq '.fields[] | select(.name == "Slug") | .id')
gh project item-edit --id "$ITEM_ID" --project-id "$PROJECT_ID" --field-id "$SLUG_FIELD_ID" --text "<slug>"
```

For an existing project item, list items and find the matching issue URL or issue number:

```bash
gh project item-list <project-number> --owner <owner> --limit 100 --format json
```

Then edit the matching `ITEM_ID` with the same `gh project item-edit` commands.

## Stage Semantics

- `Idea`: topic exists but needs sharpening.
- `Research`: needs trend, citation, or competitor/source research.
- `Outline`: angle approved, structure not drafted.
- `Drafting`: MDX or project page is being written.
- `Editing`: draft exists and needs review, polish, or citations.
- `Assets`: text direction is stable and images/diagrams/social assets are being prepared.
- `Scheduled`: final content is ready or queued with a publish date.
- `Published`: content is live; issue should link the final URL and related PR.
- `Parked`: intentionally deferred.

When a calendar item becomes active blog production, use the repo skills instead of reimplementing the workflow:

- `trending-blog-topic-research` for topic discovery.
- `end-to-end-blog-creation` for turning an approved idea into a full post with artwork, assets, social copy, validation, and PR publication.
- `blog-authoring` for focused MDX setup when full end-to-end creation is not needed.

## Audit And Reporting

For a calendar audit, list active project items and group them by stage and publish date:

```bash
gh project item-list <project-number> --owner <owner> --limit 100 --format json
```

Report:

- Overdue items: `Target Date` before today and not `Published` or `Parked`.
- Missing dates: items in `Outline`, `Drafting`, `Editing`, `Assets`, or `Scheduled` without `Target Date` or `End Date`.
- Missing tags: items without `Tags`, or with tags that are absent from the relevant `app/blog-tag-data.json` or `app/project-tag-data.json`.
- Missing slugs: website content without `Slug`.
- Broken execution links: items in `Drafting` or later without a repo path, branch, PR, or draft link.
- Published-but-open items: `Published` stage with an open issue and no clear follow-up reason.

Keep the report actionable: include issue links, content type, tags, current stage, target date, end date, and the next concrete action.

## Final Response

When you create or update calendar items, include:

- Issue URL
- Project URL or project number
- Fields changed
- Content type, tags, target date, end date, and description status
- Any scope/auth blockers
- Any manual calendar-view setup still needed

Do not bury blockers. If project mutation failed because of missing auth scopes, say that explicitly and provide the refresh command.
