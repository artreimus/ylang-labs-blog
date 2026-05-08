# Gemma 4 Article Fact Check

Access date for web sources: 2026-05-03.

## Editorial Summary

The article's central framing is sound: Gemma 4 is best explained as a deployment ladder rather than a single larger model. The four public variants map cleanly to edge inference, stronger on-device agents, sparse low-latency serving, and dense high-quality experimentation.

The draft needed two material corrections:

1. The audio encoder should not be described as a 35M-parameter conformer. The Google model card lists approximately 300M audio encoder parameters for E2B and E4B.
2. The attention section should avoid unsupported specificity where possible. Google publicly confirms hybrid local/global attention, sliding windows, final global layer behavior, unified Keys and Values, and p-RoPE. Hugging Face documents GQA, global head dimension, key/value tying, and shared KV-cache implementation fields, but the article should present those as implementation knobs rather than overstate every internal ratio.

## Confirmed Model Family

| Model             | Public size                          | Context | Modalities         | Notes                                                                   |
| ----------------- | ------------------------------------ | ------- | ------------------ | ----------------------------------------------------------------------- |
| Gemma 4 E2B       | 2.3B effective, 5.1B with embeddings | 128K    | Text, image, audio | Edge/on-device model with PLE                                           |
| Gemma 4 E4B       | 4.5B effective, 8B with embeddings   | 128K    | Text, image, audio | Larger edge/on-device model with PLE                                    |
| Gemma 4 26B A4B   | 25.2B total, 3.8B active             | 256K    | Text, image        | MoE model with 128 total experts, 8 active experts, and 1 shared expert |
| Gemma 4 31B dense | 30.7B                                | 256K    | Text, image        | Dense quality model                                                     |

Google's launch post also frames all models as useful for images/video, with video understanding handled through frames in the model-card language.

## Architecture Notes

- Hybrid attention is confirmed in the official model card: local sliding-window attention is interleaved with global full-context attention, and the final layer is always global.
- Sliding-window sizes are confirmed: 512 tokens for E2B/E4B and 1,024 tokens for the 26B A4B and 31B models.
- Global layers use unified Keys and Values and Proportional RoPE according to the Google model card.
- Hugging Face Transformers exposes implementation fields for `num_key_value_heads`, `num_global_key_value_heads`, `global_head_dim`, `attention_k_eq_v`, and `num_kv_shared_layers`.
- PLE is confirmed for E2B and E4B. The Google model card describes large lookup tables that give each decoder layer a small embedding for every token. The Transformers config exposes a 256-dimensional `hidden_size_per_layer_input`.
- The Google edge post supports memory-mapped PLE as part of the LiteRT-LM runtime story.

## Multimodal Notes

- Vision encoder sizes are public: approximately 150M parameters for E2B/E4B and approximately 550M for 26B A4B/31B.
- Hugging Face documents 16-by-16 patching, learned 2D positions, vision-specific RoPE, and 3-by-3 pooling.
- Public visual token budgets are 70, 140, 280, 560, and 1,120.
- E2B and E4B include audio. The model card lists approximately 300M audio encoder parameters.
- Hugging Face's audio feature extractor converts 16 kHz raw audio into MEL spectrogram features with 20 ms frames and a 10 ms hop. The public capability target is ASR and speech-to-translated-text.

## Claim Boundaries To Preserve In The Article

- Say Apache 2.0 lowers adoption friction, not that the training data is open.
- Treat leaderboard positions as launch-time claims, because public leaderboards can drift.
- Do not treat open weights as sufficient production safety; keep the evaluation and safeguards warning.
- Treat Hugging Face and Google edge runtime details as ecosystem evidence, not as proof that every deployment path has the same performance profile.
