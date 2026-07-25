# Managed Agents Source Log

This reference packet supports `data/blogs/managed-agents.mdx`.

Access date for all web sources: 2026-07-25.

## Official Sources

1. **AgentCore harness vs. Runtime**

   - Publisher: Amazon Web Services
   - URL: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness-vs-runtime.html
   - Page update date: Not stated on the page
   - Supports: The distinction between a serverless Runtime where the customer owns the orchestration loop and a managed harness where the loop is configured through the model, instructions, tools, memory, and limits. It also supports the Runtime claims about isolation, scaling, sessions, authentication gating, and observability.

2. **Scale your agents**

   - Publisher: Google Cloud
   - URL: https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale
   - Page update date: 2026-07-23
   - Supports: The current Agent Platform grouping of a fully managed Agent Runtime with Sessions, Memory Bank, evaluation and observability services, Code Execution, and Computer Use sandbox capabilities.

3. **What is Microsoft Foundry Agent Service?**

   - Publisher: Microsoft
   - URL: https://learn.microsoft.com/en-my/Azure/foundry/agents/overview
   - Page update date: 2026-06-02
   - Supports: The distinction between prompt agents configured through instructions, models, and tools and Hosted agents built from customer code. It also supports the managed endpoint, scaling, identity, and observability claims.

4. **Hosted agents in Foundry Agent Service**
   - Publisher: Microsoft
   - URL: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents
   - Page update date: 2026-07-21
   - Supports: Per-session VM-isolated sandboxes, automatic session and compute lifecycle, customer-owned orchestration, platform limits, and billing based on CPU and memory consumed by active sessions.

## Claim Boundaries

- The post treats "managed agent" as a responsibility boundary, not a standardized cross-vendor category.
- "Managed agent harness" is presented as a useful layer label supported by AWS terminology, not a universal standard.
- The vendor examples show that different managed layers exist. They are not used to claim exact feature parity.
- Managed identity, isolation, tracing, and evaluation do not replace application authorization, testing, rollback, recovery, or human escalation.
- The post makes no exact cost-savings, performance, safety, or reliability claims.
- The managed, self-built, and local decision guidance is an engineering recommendation derived from the ownership boundaries explained in the article. It is not presented as a vendor-defined taxonomy.

## Visual Assets

1. **`managed-agent-responsibility-stack.png`**

   - Purpose: Show the model API, managed runtime, and managed harness as increasingly broad provider responsibility boundaries.
   - Accuracy boundary: A conceptual comparison model, not a diagram of one vendor's architecture or a claim of feature parity.

2. **`managed-agent-production-lifecycle.png`**

   - Purpose: Show the path from an application request through a session, agent loop, model, tools, memory, tracing, and human approval.
   - Accuracy boundary: A conceptual production lifecycle. Implementations may combine, omit, or rename components.

3. **`managed-vs-built-vs-local.png`**

   - Purpose: Compare local agents, managed agents, and self-built agent platforms by workload boundary and operating ownership.
   - Accuracy boundary: An engineering decision aid, not a universal maturity model.

4. **`source-artwork.png`, `cardImage.png`, and `blogHeader.png`**

   - Purpose: Editorial cover artwork showing robots operating in a cloud environment.
   - Accuracy boundary: Metaphorical artwork. It does not depict a literal cloud architecture or vendor product.
