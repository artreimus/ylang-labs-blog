# HyperFrames HTML Video For AI Agents Source Log

Access date: 2026-05-10

This folder records the source provenance for `data/blogs/hyperframes-html-video-for-ai-agents.mdx`.

## Sources

1. HyperFrames documentation index
   - URL: https://hyperframes.heygen.com/llms.txt
   - Publisher: HeyGen / HyperFrames
   - Date: not stated on page
   - Used for: documentation map, available concepts, package surfaces, guides, catalog scope, and first-pass source discovery.

2. HyperFrames introduction
   - URL: https://hyperframes.heygen.com/introduction
   - Publisher: HeyGen / HyperFrames
   - Date: not stated on page
   - Used for: core positioning, HTML-to-video framing, deterministic rendering claim, data-attribute composition shape, preview/render workflow, and package descriptions.

3. HyperFrames quickstart
   - URL: https://hyperframes.heygen.com/quickstart
   - Publisher: HeyGen / HyperFrames
   - Date: not stated on page
   - Used for: agent workflow, `npx skills add heygen-com/hyperframes`, Node.js 22+ and FFmpeg prerequisites, CLI commands, minimal composition rules, and render output shape.

4. HyperFrames compositions
   - URL: https://hyperframes.heygen.com/concepts/compositions
   - Publisher: HeyGen / HyperFrames
   - Date: not stated on page
   - Used for: composition definition, root `data-composition-id`, clip types, nested composition model, variables, and the split between declarative HTML primitives and script-driven effects.

5. HyperFrames data attributes
   - URL: https://hyperframes.heygen.com/concepts/data-attributes
   - Publisher: HeyGen / HyperFrames
   - Date: not stated on page
   - Used for: timing attributes, track index behavior, media attributes, `class="clip"`, relative timing, and variable passing semantics.

6. HyperFrames deterministic rendering
   - URL: https://hyperframes.heygen.com/concepts/determinism
   - Publisher: HeyGen / HyperFrames
   - Date: not stated on page
   - Used for: frame-by-frame seek-driven rendering model, `frame / fps` timing, adapter seek behavior, Chrome frame capture, FFmpeg encoding, Docker reproducibility, and preview/render parity caveats.

7. HyperFrames frame adapters
   - URL: https://hyperframes.heygen.com/concepts/frame-adapters
   - Publisher: HeyGen / HyperFrames
   - Date: not stated on page
   - Used for: adapter contract, v0 experimental API caveat, `seekFrame(frame)`, idempotence requirements, deterministic adapter constraints, and supported animation runtimes.

8. HyperFrames HTML-in-Canvas
   - URL: https://hyperframes.heygen.com/guides/html-in-canvas
   - Publisher: HeyGen / HyperFrames
   - Date: not stated on page
   - Used for: DOM-to-canvas/WebGL framing, `drawElementImage`, Chrome flag caveat, GPU/compositor distinction, and fallback guidance.

9. HyperFrames rendering guide
   - URL: https://hyperframes.heygen.com/guides/rendering
   - Publisher: HeyGen / HyperFrames
   - Date: not stated on page
   - Used for: output formats, GPU surfaces, worker/concurrency tradeoffs, transparent MOV/WebM/PNG sequence guidance, and Docker/local render caveats.

10. HyperFrames vs Remotion
    - URL: https://hyperframes.heygen.com/guides/hyperframes-vs-remotion
    - Publisher: HeyGen / HyperFrames
    - Date: not stated on page
    - Used for: comparison against Remotion, React-vs-HTML framing, agent-native and human-editing workflow rationale, Remotion Lambda caveat, and current HyperFrames scale limitation.

## Claim Calibration

- The post calls HyperFrames "revolutionary" only in relation to the source-of-truth shift: HTML as an editable, deterministic video timeline for agents and humans.
- The post does not claim HyperFrames replaces Remotion in all cases. It explicitly notes Remotion's distributed rendering lead.
- The post notes experimental surfaces: the Frame Adapter API is v0, and HTML-in-Canvas relies on an experimental browser feature for live preview.
- The post avoids performance claims not present in the docs. GPU, worker, and concurrency details are described as available options, not as guaranteed speedups for every composition.
