# Production dependency audit exceptions

The production audit currently has no accepted high- or critical-severity exceptions.

If an advisory cannot be removed immediately, add one record to
`config/security/dependency-audit-exceptions.json` for every exact affected dependency path:

```json
{
  "advisoryId": "GHSA-xxxx-xxxx-xxxx",
  "package": "package-name",
  "path": ". > direct-package@1.0.0 > package-name@1.0.0",
  "impact": "Why the vulnerable behavior is or is not reachable in production.",
  "mitigation": "The temporary control that reduces risk.",
  "owner": "team-or-person",
  "expiresAt": "YYYY-MM-DD"
}
```

Exceptions are exact and temporary. The CI policy rejects malformed or expired entries and
continues to fail for any high/critical advisory path that does not match all three identity
fields: `advisoryId`, `package`, and `path`.
