# Source log: The Fastest LLM Inference Engine Does Not Exist. xLLM Shows Why.

Access date for all web sources: 2026-07-11.

## xLLM primary sources

### 1. xLLM repository

- URL: https://github.com/xLLM-AI/xllm
- Publisher/author: xLLM-AI contributors
- Date: Continuously updated; repository reviewed 2026-07-11
- Supports: Project scope, Apache-2.0 license, hardware emphasis, repository news, OpenAtom hosting statement, and links to official documentation.

### 2. xLLM v0.10.0 release notes

- URL: https://github.com/xLLM-AI/xllm/releases/tag/v0.10.0
- Publisher/author: xLLM-AI contributors
- Date: 2026-07-01
- Supports: Current release identifier and release date used in the article.

### 3. xLLM Technical Report

- URL: https://arxiv.org/abs/2510.14686
- Publisher/author: Tongxuan Liu et al.; arXiv
- Date: Submitted 2025-10-16; v2 revised 2026-03-03
- Supports: Service-engine architecture, one-device-per-process design, RPC and collective communication, dynamic PD and multimodal EPD, xTensor, adaptive graph execution, multi-stream execution, EPLB, and the benchmark configurations and results.

### 4. xLLM feature overview

- URL: https://docs.xllm-ai.com/en/features/overview/
- Publisher/author: xLLM-AI documentation contributors
- Date: Continuously updated; reviewed 2026-07-11
- Supports: Project motivation, domestic-accelerator focus, xTensor summary, continuous and chunked scheduling, ETCD-backed global metadata, global KV routing, and speculative inference.

### 5. xLLM-Service overview

- URL: https://docs.xllm-ai.com/en/features/xllm_service_overview/
- Publisher/author: xLLM-AI documentation contributors
- Date: Continuously updated; reviewed 2026-07-11
- Supports: ETCD cluster, global scheduler, global KV cache manager, instance manager, event plane, planner, and the responsibilities of the service layer.

### 6. xLLM disaggregated PD documentation

- URL: https://docs.xllm-ai.com/en/features/disagg_pd/
- Publisher/author: xLLM-AI documentation contributors
- Date: Continuously updated; reviewed 2026-07-11
- Supports: Prefill-decode separation architecture, roles of ETCD, xLLM-Service, prefill instances, decode instances, and KV transfer configuration.

### 7. xLLM Global KV Cache documentation

- URL: https://docs.xllm-ai.com/en/features/global_kvcache/
- Publisher/author: xLLM-AI documentation contributors
- Date: Continuously updated; reviewed 2026-07-11
- Supports: ETCD metadata, service routing, global cache state, offload and prefetch design, and the current instruction that Global KV Cache requires `--enable_disagg_pd=false` because PD separation is not yet supported with it.

### 8. xLLM Graph Mode design

- URL: https://docs.xllm-ai.com/en/design/graph_mode_design/
- Publisher/author: xLLM-AI documentation contributors
- Date: Continuously updated; reviewed 2026-07-11
- Supports: Shape bucketing, dynamic dimension parameterization, Piecewise Graphs, persistent virtual addresses, and VMM-backed physical memory reuse that changes multi-shape memory growth from `sum(shape)` toward `max(shape)`.

### 9. xLLM model support matrix

- URL: https://docs.xllm-ai.com/en/supported_models/
- Publisher/author: xLLM-AI documentation contributors
- Date: Last updated 2026-06-22
- Supports: Model and accelerator combinations across LLM, VLM, reranking, diffusion, and recommendation categories; reinforces that support must be checked per model and hardware backend.

### 10. OpenAtom Foundation xLLM announcement

- URL: https://www.openatom.org/journalism/detail/nACUwDkcHx6W
- Publisher/author: OpenAtom Foundation
- Date: 2026-06-25 announcement listed on the official news page; reviewed 2026-07-11
- Supports: xLLM's donation signing and inclusion in the OpenAtom Foundation incubation system. The xLLM repository separately announced the donation on 2026-07-06.

## Comparison sources

### 11. vLLM repository and feature summary

- URL: https://github.com/vllm-project/vllm
- Publisher/author: vLLM project contributors
- Date: Continuously updated; reviewed 2026-07-11
- Supports: vLLM's open-source scope, PagedAttention, continuous batching, graph execution, quantization, speculative decoding, chunked prefill, prefix caching, APIs, distributed parallelism, and hardware ecosystem.

### 12. vLLM feature documentation

- URL: https://docs.vllm.ai/en/stable/
- Publisher/author: vLLM project documentation
- Date: Continuously updated; reviewed 2026-07-11
- Supports: Current feature index and documentation for model serving, automatic prefix caching, speculative decoding, quantization, APIs, distributed parallelism, observability, supported models, and hardware paths.

### 13. vLLM V1 scheduler configuration

- URL: https://docs.vllm.ai/en/stable/api/vllm/config/scheduler/
- Publisher/author: vLLM project documentation
- Date: Continuously updated; reviewed 2026-07-11
- Supports: V1 token-budget scheduling concepts, maximum batched tokens, partial prefill controls, encoder budget, and scheduling policies.

### 14. vLLM disaggregated prefilling

- URL: https://docs.vllm.ai/en/stable/features/disagg_prefill/
- Publisher/author: vLLM project documentation
- Date: Continuously updated; reviewed 2026-07-11
- Supports: Separate tuning of TTFT and inter-token latency, KV connector architecture, and the explicit warning that disaggregated prefill does not automatically improve throughput.

### 15. SGLang repository

- URL: https://github.com/sgl-project/sglang
- Publisher/author: SGLang project contributors; LMSYS Org
- Date: Continuously updated; reviewed 2026-07-11
- Supports: RadixAttention, prefix caching, continuous batching, paged attention, structured outputs, speculative decoding, parallelism, multi-LoRA, supported hardware, and RL or post-training integrations.

### 16. TensorRT-LLM architecture and capabilities

- URL: https://nvidia.github.io/TensorRT-LLM/latest/overview.html
- Publisher/author: NVIDIA TensorRT-LLM team
- Date: Last updated 2026-06-27
- Supports: NVIDIA-centered runtime, paged KV cache, in-flight batching, chunked prefill, quantization, supported serving paths, and model-feature matrices.

### 17. TensorRT-LLM disaggregated serving

- URL: https://nvidia.github.io/TensorRT-LLM/latest/features/disagg-serving.html
- Publisher/author: NVIDIA TensorRT-LLM team
- Date: Continuously updated; reviewed 2026-07-11
- Supports: Separation of context and generation instances, KV cache exchange, transfer overhead, and the role of disaggregation in throughput-at-latency tuning.

### 18. Text Generation Inference repository

- URL: https://github.com/huggingface/text-generation-inference
- Publisher/author: Hugging Face
- Date: Continuously updated; reviewed 2026-07-11
- Supports: TGI's maintenance-mode status and the maintainers' recommendation of vLLM, SGLang, and local engines for new deployments.

### 19. Official xLLM logo asset

- URL: https://github.com/xLLM-AI/xllm/blob/main/docs/assets/logo_with_llm.png
- Publisher/author: xLLM project contributors
- Date: Continuously updated; reviewed 2026-07-12
- Supports: Official xLLM wordmark composited into the article's generated cover, header, card, and social post artwork.

## Claim boundaries

- The xLLM benchmark results are author-reported and specific to the paper's model, version, hardware, topology, request lengths, and TPOT constraints.
- vLLM-Ascend 0.10.rc1 is not the same comparison as upstream vLLM on NVIDIA hardware.
- The report does not benchmark SGLang or TensorRT-LLM.
- The CUDA development image and CUDA code path do not establish feature or performance parity with xLLM's domestic-accelerator backends.
- Feature availability does not prove that every feature combination is supported. Global KV Cache and disaggregated PD are a documented current example.
