# Contact form operations

The contact form submits through a Next.js Server Action. The browser never receives the Web3Forms access key and no contact field values are written to application logs.

## Required environment variables

- `WEB3FORMS_ACCESS_KEY`: server-only Web3Forms key. Configure it separately for Vercel Development, Preview, and Production.
- `WEB3FORMS_ENDPOINT`: optional server-only endpoint. Every normal environment is restricted to `https://api.web3forms.com/submit`.
- `E2E_TEST=true`: permits a loopback endpoint for local browser tests. It must never be enabled on Vercel.

After the server-side form has been verified in Production, delete `NEXT_PUBLIC_WEB3_FORMS_ACCESS_KEY` from every Vercel environment and rotate or revoke the previously public key.

## Abuse controls

The application rejects the `company` honeypot before calling Web3Forms. Before production rollout, add Vercel Firewall rate-limit rules and replace every pending value below:

| Surface                     | Environment | Rule ID               | Threshold | Status           |
| --------------------------- | ----------- | --------------------- | --------- | ---------------- |
| Contact Server Action POSTs | Production  | Pending Vercel access | Pending   | Blocking rollout |
| `/api/csp-report`           | Production  | Pending Vercel access | Pending   | Blocking rollout |

Record each rule ID, environment, request threshold, and observation date here after provisioning. Do not replace these rules with process-local counters; serverless instances do not share that state.

## CSP report privacy

The same-origin collector accepts CSP media types only, stops reading streamed bodies after 16 KiB, and logs only sanitized directive, disposition, same-origin route pathname, and blocked origin fields. It discards queries, fragments, referrers, source samples, cookies, user agents, and raw bodies. Configure log retention to seven days or less during the report-only observation window.

The previously deployed CSP remains enforced during this window. The narrower candidate is emitted
separately as `Content-Security-Policy-Report-Only`; promote it to the enforced header only after the
observation window is clean and the production analytics, comments, and media paths are verified.

## Deployment checklist

- Confirm CI uses only `WEB3FORMS_ACCESS_KEY` and contains no public key value.
- Provision `WEB3FORMS_ACCESS_KEY` separately in Vercel Development, Preview, and Production.
- Smoke-test successful and rejected submissions in each Vercel scope.
- Provision and record both firewall rules above before Production traffic reaches the endpoints.
- Remove `NEXT_PUBLIC_WEB3_FORMS_ACCESS_KEY` from every Vercel scope, then rotate or revoke the previously exposed provider key.
- Search the built client output for both the retired variable name and retired key value.
