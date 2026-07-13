# Asset storage operations

Published media is addressed by stable logical IDs such as
`/static/images/blogs/<slug>/blogHeader.webp`. `data/assets-manifest.json` maps migrated IDs to
immutable public Vercel Blob URLs. Source artwork uses a separate private store and is recorded,
without URLs or credentials, in `data/private-assets-inventory.json`.

Normal builds are read-only. CI validates manifests and local fallbacks but never uploads or deletes
objects.

## Provisioning

Create two Vercel Blob stores in the project:

- `ylang-blog-public`: public delivery derivatives only.
- `ylang-blog-sources`: private source artwork and reusable masters only.

Configure `BLOB_PUBLIC_STORE_ID` and `BLOB_SOURCES_STORE_ID` locally. Keep the corresponding
`BLOB_PUBLIC_READ_WRITE_TOKEN` and `BLOB_SOURCES_READ_WRITE_TOKEN` in the operator's local secret
store; do not add either token to preview, production, or CI builds. The publisher verifies that a
token belongs to the selected store before the first API call.

For the application build, configure the exact public origin and immutable namespace:

```dotenv
BLOB_PUBLIC_ORIGIN=https://<store-id>.public.blob.vercel-storage.com
BLOB_PUBLIC_PATH_PREFIX=/public/**
```

The origin is used by `next/image` and the Content Security Policy. Wildcard hosts and a root `/**`
path are rejected.

## Inventory and publishing

Create a deterministic classification report:

```sh
pnpm assets:inventory
```

The report is written below ignored `artifacts/`. Review every `defer` and deletion candidate
manually; the tooling does not remove local or remote files.

Shell logos and `/static/images/social-banner.png` are deliberately `keep-local`. The global social
banner is consumed directly by framework metadata, so it must remain in the deployment bundle until
every metadata surface resolves manifest URLs explicitly.

`data/asset-public-source-allowlist.json` is the temporary boundary for every reusable source master
that still exists below `public/`. Each entry is hash-pinned, owned, and expiring; validation scans
all public files rather than only content references. Unreferenced masters remain `private-blob`
candidates and can be moved with the private publisher. A source that published content still
references remains `keep-local` until that reference is replaced. No source allowance is permission
to add an object to the public delivery manifest.

Publishing defaults to a dry run and requires one store plus one scope:

```sh
pnpm assets:publish -- --slug <slug> --store public --dry-run
pnpm assets:publish -- --path public/static/images/blogs/<slug>/source-artwork.png --store private --dry-run
pnpm assets:publish -- --derived-path artifacts/assets/<slug>/demo.webm --logical-id /static/images/projects/<slug>/demo.webm --role video --store public --dry-run
```

After reviewing the byte size, role, budget, content hash, and target path, repeat with `--apply`.
An apply uploads content-hashed immutable objects with overwrite disabled, appends a crash journal,
and atomically updates the applicable manifest only after all selected uploads succeed.

`--slug` deliberately skips allowlisted legacy GIFs: those remain local rollback files and must not
consume Blob transfer. Transcoded posters, WebM, and MP4 files stay below ignored
`artifacts/assets/` and use the explicit `--derived-path`, `--logical-id`, and `--role` contract, so
replacement binaries never enter Git history.

Run the full local gates after every manifest change:

```sh
pnpm assets:validate
WEB3FORMS_ACCESS_KEY=local-validation pnpm typecheck
WEB3FORMS_ACCESS_KEY=local-validation pnpm build
```

## Staged cutover

1. Publish one representative slug and retain its local files.
2. Deploy with `ASSET_LOCAL_FALLBACK=true` and verify page media, metadata, CSP reports, and CDN
   headers.
3. Drill rollback by reverting the content and manifest changes; do not mutate Blob.
4. After one healthy release, set `ASSET_LOCAL_FALLBACK=false` while local files remain and verify a
   strict build.
5. Remove migrated delivery files only after the strict release is healthy. Keep remote objects
   through the rollback window.

The publisher writes rollback records and journals below ignored `artifacts/assets/`. These contain
object metadata but never tokens. A rollback is a Git/content redeploy, not an automatic remote
delete.

## Hobby-plan guardrails

Vercel Hobby Blob has hard included-usage limits and no paid overage. Recheck the current official
[usage and pricing](https://vercel.com/docs/vercel-blob/usage-and-pricing) immediately before
provisioning. Operational thresholds for this project are:

- Stop new migrations at 70% of included storage until usage is reviewed.
- Stop rollout at 75% of projected monthly Blob transfer.
- Convert large animated GIFs to budgeted WebM/MP4 plus posters before bulk migration.
- Investigate unexpected simple or advanced operation growth before another publish batch.

If transfer approaches the limit, pause migration, keep local fallbacks, optimize the highest-volume
media, and redeploy content to local delivery if required. Never run destructive sync or bulk-delete
commands as a recovery shortcut.
