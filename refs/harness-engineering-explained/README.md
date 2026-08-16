# Harness Engineering Explained: Source Log

Publication-safe source log for `data/blogs/harness-engineering-explained.mdx`.

Access date for all web sources: **2026-08-15**.

## Sources

### 1. Harness engineering: leveraging Codex in an agent-first world

- URL: https://openai.com/index/harness-engineering/
- Publisher: OpenAI
- Author: Ryan Lopopolo
- Publication date: 2026-02-11
- Supports: Repository-local instructions, progressive disclosure, mechanically enforced constraints, agent-accessible tools and observability, validation loops, and the broader use of “harness engineering” for the environment around coding agents.
- Article use: Supports the explanation that useful agent behavior depends on inspectable context, tools, constraints, and feedback loops. The post does not reuse the source's productivity or code-volume figures.

### 2. Unlocking the Codex harness: how we built the App Server

- URL: https://openai.com/index/unlocking-the-codex-harness/
- Publisher: OpenAI
- Author: Celia Chen
- Publication date: 2026-02-04
- Supports: The core agent loop, thread lifecycle and persistence, configuration and authentication, sandboxed tool execution, extensions, event lifecycles, and approval requests that pause a turn until the client responds.
- Article use: Supports the model-versus-harness boundary, the feedback loop, thread state, sandboxed execution, and the description of interactive approvals.

### 3. Effective harnesses for long-running agents

- URL: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Publisher: Anthropic
- Author: Justin Young
- Publication date: 2025-11-26
- Supports: Context compaction for long-running work, incremental progress, progress files, Git history, feature requirements, and recovery across fresh context windows.
- Article use: Supports the distinction between active context management and durable checkpoints that allow a later session to recover task state.

### 4. OpenAI Agents SDK

- URL: https://openai.github.io/openai-agents-python/
- Publisher: OpenAI
- Author: Not listed in the provided documentation metadata
- Publication date: Current documentation; no single publication date listed
- Supports: Agent loops, function tools with schema validation, guardrails, sessions, human-in-the-loop controls, tracing, and the distinction between a managed runtime and directly owning loop, tool dispatch, and state handling.
- Article use: Supports the framework-neutral description of common runtime responsibilities around model calls.

### 5. Demystifying evals for AI agents

- URL: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- Publisher: Anthropic
- Authors: Mikaela Grace, Jeremy Hadfield, Rodrigo Olivares, and Jiri De Jonghe
- Publication date: 2026-01-09
- Supports: Tasks, trials, graders, and transcripts; code-based, model-based, and human graders; repeated trials; deterministic grading for coding tasks; and calibration of model graders against human judgment.
- Article use: Supports the distinction between traces and evals, the preference for executable checks on objective coding outcomes, and the limits of model-based grading.

### 6. Agent Harness

- URL: https://learn.microsoft.com/en-us/agent-framework/concepts/harness
- Publisher: Microsoft Learn
- Author: Not listed in the provided source metadata
- Publication date: Current documentation; no single publication date listed
- Supports: A vendor-neutral concept page for the runtime services around an agent, including lifecycle, context, tool, policy, state, and observability responsibilities.
- Article use: Corroborates the general definition of a harness. The article does not treat Microsoft's component grouping, or any other vendor grouping, as a universal taxonomy.

## Claim Boundaries

- The article does not claim that harness engineering guarantees reliable, correct, or safe agent behavior.
- The component categories are explanatory, not a universal industry standard.
- Context compaction is described as active-context management, not durable memory.
- Deterministic acceptance checks decide objective outcomes. A model grader does not override a failed executable check.
- The dependency-upgrade scenario is illustrative and is not presented as a measured Ylang Labs production system.
