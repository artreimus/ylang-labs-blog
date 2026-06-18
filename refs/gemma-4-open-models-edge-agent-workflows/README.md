# Gemma 4 Source Log

This reference packet supports the blog post `data/blogs/gemma-4-open-models-edge-agent-workflows.mdx`.

Access date for web sources: 2026-05-03.

## Primary And Near-Primary Sources

1. Google, [Gemma 4: Byte for byte, the most capable open models](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/), 2026-04-02.
   - Supports launch framing, four model sizes, Apache 2.0 licensing, function calling, structured JSON output, long-context windows, multimodal capability, and distribution channels.
2. Google AI for Developers, [Gemma 4 model card](https://ai.google.dev/gemma/docs/core/model_card_4), accessed 2026-05-03.
   - Supports model parameter counts, context windows, supported modalities, sliding-window sizes, MoE expert counts, PLE explanation, benchmark table, and capability boundaries.
3. Google Developers Blog, [Bring state-of-the-art agentic skills to the edge with Gemma 4](https://developers.googleblog.com/bring-state-of-the-art-agentic-skills-to-the-edge-with-gemma-4/), 2026-04-02.
   - Supports edge deployment claims, AI Edge Gallery, Agent Skills, LiteRT-LM, memory-mapped PLE, constrained decoding, dynamic context, and device/runtime examples.
4. Hugging Face, [Welcome Gemma 4: Frontier multimodal intelligence on device](https://huggingface.co/blog/gemma4), 2026-04-02.
   - Supports ecosystem integration, day-zero runtime support, PLE and shared KV-cache explanations, multimodal examples, fine-tuning support, and benchmark context.
5. Hugging Face Transformers, [Gemma4 model documentation](https://huggingface.co/docs/transformers/model_doc/gemma4), accessed 2026-05-03.
   - Supports implementation-level fields for Gemma4 text, vision, and audio configs, including GQA fields, global head dimension, key/value sharing controls, PLE dimensions, image patching, and audio feature extraction.
6. Google Cloud, [Gemma 4 available on Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/gemma-4-available-on-google-cloud), 2026-04-02.
   - Supports Vertex AI, TPU, Sovereign Cloud, and production deployment context.
7. Google DeepMind, [Gemma: Open Models Based on Gemini Research and Technology](https://arxiv.org/abs/2403.08295), arXiv, 2024.
   - Supports original Gemma lineage and open-model family context.
8. Google DeepMind, [Gemma 2: Improving Open Language Models at a Practical Size](https://arxiv.org/abs/2408.00118), arXiv, 2024.
   - Supports the practical-efficiency lineage around local/global attention and grouped-query attention.
9. Google DeepMind, [Gemma 3 Technical Report](https://arxiv.org/abs/2503.19786), arXiv, 2025.
   - Supports Gemma 3 lineage around long context, multimodality, and local/global attention.

## Claim Boundaries

- Treat low-level architecture details as source-sensitive. The Google model card is authoritative for public model sizes, supported modalities, context windows, expert counts, sliding-window sizes, PLE, and high-level attention behavior.
- Treat Hugging Face Transformers docs as implementation evidence for config fields and runtime integration, not as a replacement for the Google model card.
- Avoid overclaiming exact local/global layer ratios or undocumented per-model internal layouts unless Google publishes those details directly.
- Do not describe the E2B/E4B audio encoder as 35M parameters. The Google model card lists approximately 300M audio encoder parameters for both edge models.
- Describe video support as image/frame-based video understanding unless a source specifically claims native temporal video modeling for a given checkpoint.
