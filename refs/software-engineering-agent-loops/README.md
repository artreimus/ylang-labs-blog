# Software Engineering Agent Loops Source Packet

Access date: 2026-06-17

## Sources

1. Addy Osmani, "Loop Engineering"

   - URL: https://addyosmani.com/blog/loop-engineering/
   - Published: 2026-06-07
   - Use: Defines loop engineering as designing the system that prompts agents; quotes Peter Steinberger and Boris Cherny on designing or writing loops.

2. WorkOS, "Boris Cherny: Claude Code & the Future of Engineering | Acquired Unplugged presented by WorkOS"

   - URL: https://www.youtube.com/watch?v=RkQQ7WEor7w
   - Published: 2026-06-02
   - Use: Primary public interview source for Cherny's comments on Claude Code and loops.

3. WorkOS, "Key takeaways from Boris Cherny on building Claude Code"

   - URL: https://workos.com/blog/boris-cherny-claude-code-acquired-interview-takeaways
   - Published: 2026-06-02
   - Use: Secondary WorkOS summary of Cherny's shift from directly prompting Claude to writing automated workflows that prompt Claude.

4. OpenClaw, "VISION.md"

   - URL: https://github.com/openclaw/openclaw/blob/main/VISION.md
   - Use: Primary project source for OpenClaw's stated direction and engineering boundaries.

5. OpenClaw Docs, "Agent loop"

   - URL: https://docs.openclaw.ai/concepts/agent-loop
   - Use: Primary documentation for OpenClaw's agent loop lifecycle, including workspace resolution, prompt assembly, model execution, tool events, persistence, and hook points.

6. Blake Crosley, "Loop Engineering: Loops Win Where Verification Is Cheap"
   - URL: https://blakecrosley.com/blog/loops-win-where-verification-is-cheap
   - Published: 2026-06-09
   - Use: Supporting analysis for starting with bounded software-engineering loops that have low-cost checks.

## Claim Boundaries

- The post treats "loop engineering" as a newly popularized label in June 2026, not a new control-flow concept.
- The post avoids claiming that Boris Cherny or Peter Steinberger invented loops.
- The post uses Cherny and Steinberger as motivation, then focuses on how software engineers can create their own loops.
- The post intentionally does not optimize loop performance, token cost, or multi-agent scale. It focuses on creating the first reliable loop.
