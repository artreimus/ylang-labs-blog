# Social Media: Bad Tool Design Is the New Token Tax

## Variation 1: LinkedIn Narrative

The next expensive part of an agent system is not always the model call.

It is the tool surface around it.

Tool-heavy agents can burn tokens before useful work starts: oversized schemas, overlapping tool catalogs, raw JSON dumps, and missing identifiers that force another repair call. Anthropic's own docs call out a multi-server setup where tool definitions can consume roughly 55k tokens before the task begins.

That makes tool design a systems problem, not a documentation detail.

We wrote about how to design agent-friendly tools: smaller loaded surfaces, deferred tool search, shaped results, and outputs built for the agent's next action.

Read it here: [URL]

## Variation 2: Punchy Short Post

Bad tool design is the new token tax.

Tool-heavy agents do not just pay for prompts. They pay for bloated schemas, noisy results, ambiguous catalogs, and missing IDs that trigger repair calls.

We wrote a practical rubric for fixing the tool loop: [URL]

## Variation 3: Curiosity Hook

What if your agent's biggest cost problem is not the model?

For tool-heavy systems, the hidden tax is often the tool layer: too many definitions loaded by default, descriptions that read like API manuals, raw provider payloads, and results that forget the ID needed for the next step.

That turns every run into a slower, noisier loop.

The fix is not just shorter prompts. It is better tool design: deferred loading, tool search, shaped responses, and result payloads built around continuation.

We broke down the pattern here: [URL]
