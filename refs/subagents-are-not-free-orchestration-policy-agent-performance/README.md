# Source log: Subagents Are Not Free

Accessed: 2026-06-16

## Content brief

- GitHub issue: https://github.com/artreimus/ylang-labs-blog/issues/100
- Role: User-provided editorial brief with title, slug, audience, angle, target tags, source links, and requested flow diagram.

## Sources

1. GitHub Blog, ["How we made GitHub Copilot CLI more selective about delegation"](https://github.blog/ai-and-ml/how-we-made-github-copilot-cli-more-selective-about-delegation/)

   - Authors: Pingping Lin and Yu Hu
   - Date: 2026-06-12
   - Use: Primary source for the post's core evidence that better delegation policy can reduce orchestration overhead without changing the visible user workflow. The article reports a rollout to 100% of Copilot CLI production traffic and A/B test results including 23% fewer tool failures per session, 27% fewer search tool failures, 18% fewer edit tool failures, 5% lower P95 wait time, 3% lower P75 wait time, and no quality regression.

2. Anthropic, ["A harness for every task: dynamic workflows in Claude Code"](https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code)

   - Authors: Thariq Shihipar and Sid Bidasaria
   - Date: 2026-06-02
   - Use: Source for dynamic workflows in Claude Code, including fan-out-and-synthesize, adversarial verification, tournaments, loops, model routing, and the caveat that workflows are not needed for every task and may use significantly more tokens.

3. Xiaomi MiMo Team, ["MiMo Code: Scaling Coding Agents to Long-Horizon Tasks"](https://mimo.xiaomi.com/blog/mimo-code-long-horizon)

   - Date: 2026-06-10
   - Use: Source for code-based orchestration in long-horizon coding agents. The article describes Dynamic Workflow as moving orchestration logic from prompt text into executable JavaScript, Max Mode improving SWE-Bench Pro by 10-20% at roughly 4-5x token cost, checkpoint-writer subagents, and double-blind testing where MiMo Code's win rate rose above 65% for tasks exceeding 200 execution steps.

4. Databricks Blog, ["Introducing Omnigent: A Meta-Harness to Combine, Control and Share Your Agents"](https://www.databricks.com/blog/introducing-omnigent-meta-harness-combine-control-and-share-your-agents)
   - Authors: Matei Zaharia, Kasey Uhlenhuth, and Corey Zumar
   - Date: 2026-06-13
   - Use: Source for the meta-harness framing: agent work is moving above a single model or harness into composition, control, security policy, cost budgets, collaboration, and interoperable agent sessions.

## Verification notes

- The article treats GitHub's results as product-specific evidence, not as a universal benchmark for every multi-agent runtime.
- The article treats Xiaomi's MiMo claims as vendor-reported results and keeps the scope tied to the company's described evaluation setup.
- The article uses Anthropic and Databricks sources to support the architectural direction, not to claim that any one orchestration design has become the standard.
