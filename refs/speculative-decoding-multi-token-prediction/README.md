# Speculative Decoding Is a Protocol. MTP Can Be Its Draft Engine.

Publication-safe source log for `data/blogs/speculative-decoding-multi-token-prediction.mdx`.

Access date for all web sources: 2026-07-18.

## Sources

- Yaniv Leviathan, Matan Kalman, and Yossi Matias, "Fast Inference from Transformers via Speculative Decoding," arXiv, submitted 2022-11-30 and revised 2023-05-18.
  - URL: https://arxiv.org/abs/2211.17192
  - Supports the propose-and-verify mechanism, preservation of the target distribution, and the reported 2x to 3x T5-XXL acceleration under the paper's setup.
- Charlie Chen et al., "Accelerating Large Language Model Decoding with Speculative Sampling," arXiv, submitted 2023-02-02.
  - URL: https://arxiv.org/abs/2302.01318
  - Supports the modified rejection-sampling mechanism, distribution-preservation qualification, and the reported 2x to 2.5x decoding speedup for distributed Chinchilla 70B.
- Fabian Gloeckle et al., "Better & Faster Large Language Models via Multi-token Prediction," arXiv, submitted 2024-04-30 and published at ICML 2024.
  - URL: https://arxiv.org/abs/2404.19737
  - Supports the shared-trunk architecture with independent future-token heads, the 13B HumanEval and MBPP comparisons, the separate greedy self-speculative 7B speed experiment, and the caveat that natural-language quality gains were not uniform.
  - Publication record: https://proceedings.mlr.press/v235/gloeckle24a.html
- DeepSeek-AI et al., "DeepSeek-V3 Technical Report," arXiv, submitted 2024-12-27 and revised 2025-02-18.
  - URL: https://arxiv.org/abs/2412.19437
  - Supports the claim that DeepSeek-V3 uses a multi-token prediction training objective and retains a model-specific MTP design.
- DeepSeek-AI, "DeepSeek-V3," GitHub repository, publication date not specified.
  - URL: https://github.com/deepseek-ai/DeepSeek-V3
  - Supports the claim that the released weights include MTP modules and that the project positions those modules for speculative-decoding acceleration, while noting that community support is still developing.
- vLLM, "Speculative Decoding," vLLM documentation, updated 2026-07-02.
  - URL: https://docs.vllm.ai/en/stable/features/speculative_decoding/
  - Supports the current production framing around medium-to-low QPS, memory-bound workloads; model, traffic, hardware, and sampling dependence; native MTP support; configuration; and numerical or batching caveats to losslessness.
- vLLM Project, "MTP (Multi-Token Prediction)," Speculators documentation, publication date not specified.
  - URL: https://docs.vllm.ai/projects/speculators/en/latest/user_guide/algorithms/mtp/
  - Supports the runtime relationship in which a native MTP head drafts several tokens and the target model verifies them in one pass. It also shows that MTP integrations can use model-specific recursive heads rather than one universal topology.

## Claim Boundaries

- All speedups are author-reported results under the cited papers' models, hardware, batching, and sampling conditions. The article does not compare them as a single benchmark.
- "Exact" speculative sampling means preservation of the target distribution within numerical limits. It does not guarantee identical random sequences across different decoding implementations.
- The diagrams are conceptual illustrations. They do not encode benchmark values, literal tensor shapes, or one mandatory MTP architecture.
