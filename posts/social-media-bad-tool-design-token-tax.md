# Social Media: Bad Tool Design Is the New Token Tax

## Variation 1: LinkedIn Narrative

I think a lot of agent teams are looking in the wrong place for cost savings.

The model call is easy to blame. But in tool-heavy systems, a surprising amount of waste comes from the stuff around the model: huge tool catalogs, vague descriptions, raw JSON dumps, and results that forget the ID needed for the next step.

Anthropic's docs give a concrete example where tool definitions alone can take roughly 55k tokens before the real task starts.

That changes how I think about MCP and tool design. A good tool is not just callable. It helps the agent choose correctly, return the useful part, and keep moving.

Notes here: [URL]

## Variation 2: Punchy Short Post

Bad tool design is the new token tax.

Not in a dramatic way. In a boring, expensive way: too many tools loaded, vague descriptions, raw payloads, and missing IDs that force another call.

I wrote down the pattern and a practical checklist: [URL]

## Variation 3: Curiosity Hook

What if the expensive part of your agent is not the model?

I keep coming back to this when looking at tool-heavy workflows.

The agent might be doing reasonable work, but every step is surrounded by noise: too many tools loaded by default, descriptions that read like API manuals, raw provider payloads, and results that do not include the thing needed for the next call.

The fix is not only "use fewer tokens." It is designing tools around the next action.

I put the argument and checklist here: [URL]
