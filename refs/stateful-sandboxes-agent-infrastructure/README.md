# Stateful Sandboxes Agent Infrastructure Source Log

Accessed: 2026-06-16

## Editorial Brief

- GitHub issue: https://github.com/artreimus/ylang-labs-blog/issues/99
- Working title: Checkpoint, Resume, Repeat: Why Stateful Sandboxes Are Becoming Agent Infrastructure
- Slug: `stateful-sandboxes-agent-infrastructure`
- Audience: AI infrastructure engineers, agent platform builders, engineering leaders evaluating runtime architecture.
- Primary takeaway: Stateful, policy-aware execution environments are becoming the substrate that makes long-running agents practical.

## Sources

1. GitHub, "Cloud and local sandboxes for GitHub Copilot now in public preview," June 2, 2026.

   - URL: https://github.blog/changelog/2026-06-02-cloud-and-local-sandboxes-for-github-copilot-now-in-public-preview/
   - Supports: GitHub Copilot local and cloud sandbox release, policy controls, filesystem/network restrictions, cloud session continuity, and the framing that agentic development is interactive, stateful, and parallel.

2. Anthropic, "The evolution of agentic surfaces: building with Claude Managed Agents," June 10, 2026.

   - URL: https://claude.com/blog/building-with-claude-managed-agents
   - Supports: Managed Agents architecture, separation between harness and execution sandbox, persisted sessions, sandbox state, credential vaults/proxying, idle container checkpointing, observability, and self-hosted execution options.

3. Anthropic, "Claude Managed Agents overview," Claude API Docs.

   - URL: https://platform.claude.com/docs/en/managed-agents/overview
   - Supports: Core Managed Agents concepts: agent, environment, session, events, cloud/self-hosted sandboxes, event history, and long-running asynchronous workloads.

4. LangChain, "Give your agent its own computer," June 5, 2026.

   - URL: https://www.langchain.com/blog/give-your-ai-agent-its-own-computer
   - Supports: Agent sandboxes as computer-like environments with filesystem, shell, package manager, persistent state, microVM isolation, snapshots, forks, service URLs, and auth proxying.

5. LangChain, "LangSmith Sandboxes are Generally Available," May 13, 2026.

   - URL: https://www.langchain.com/blog/langsmith-sandboxes-generally-available
   - Supports: GA details for hardware-virtualized microVMs, snapshots, copy-on-write forks, blueprints, creator-private access, service URLs, and auth proxy/domain controls.

6. Simon Willison, "Running Python code in a sandbox with MicroPython and WASM," June 6, 2026.
   - URL: https://simonwillison.net/2026/Jun/6/micropython-in-a-sandbox/
   - Supports: WASM as a constrained execution boundary, MicroPython sandboxing, persistent interpreter state as a hard implementation problem, and limits around CPU/memory enforcement.

## Claim Calibration

- "Stateful sandboxes are becoming infrastructure" is an editorial synthesis across the sources, not a direct vendor claim.
- GitHub supports local and cloud sandboxing for Copilot, but its cloud sandbox language emphasizes ephemeral Linux sessions and policy inheritance. Do not imply GitHub exposes LangSmith-style snapshots or forks.
- Anthropic supports server-side session persistence, sandbox state, outputs, credential separation, checkpointed idle containers, and self-hosted sandboxes. Keep any latency numbers attributed to Anthropic only if used.
- LangChain supports microVM isolation, persistent state, snapshots, forks, service URLs, auth proxying, and access controls. Keep container-isolation claims attributed to LangChain unless independently sourced.
- Simon Willison's WASM work is an alpha package and a practical experiment. Use it as a narrow example of constrained execution, not as proof that WASM is ready for every production agent workload.

## Visual Assets

- `public/static/images/blogs/stateful-sandboxes-agent-infrastructure/source-artwork.png`
  - Generated square source artwork using the oil-painting cover workflow.
  - Prompt theme: isolated agent work chambers around a central checkpoint/resume machine.
- `public/static/images/blogs/stateful-sandboxes-agent-infrastructure/cardImage.png`
  - Cropped from source artwork to `1080x1920`.
- `public/static/images/blogs/stateful-sandboxes-agent-infrastructure/blogHeader.png`
  - Cropped from source artwork to `1260x700`.
- `public/static/images/blogs/stateful-sandboxes-agent-infrastructure/sandbox-architecture-models.png`
  - Generated technical process architecture plate comparing local, cloud, browser, and WASM sandbox boundaries.
- `public/static/images/blogs/stateful-sandboxes-agent-infrastructure/checkpoint-lifecycle.png`
  - Generated technical process architecture plate showing work, snapshot, pause, resume, fork, and rollback as a state lifecycle.
- `public/static/images/blogs/stateful-sandboxes-agent-infrastructure/policy-boundary.png`
  - Generated technical blueprint plate showing the sandbox, credential vault/proxy path, egress policy gate, and audit boundary.
