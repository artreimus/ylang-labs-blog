# vLLM inference engine explained: publication source log

This log records the external sources used by `data/blogs/vllm-inference-engine-explained.mdx`. vLLM documentation under `/en/latest/` is a moving developer-preview snapshot, so the article states the review date instead of presenting these pages as timeless behavior. All web sources below were accessed and reviewed on 2026-07-12.

## Technical sources

### 1. Attention Is All You Need

- Exact URL: https://arxiv.org/abs/1706.03762
- Authors: Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, and Illia Polosukhin
- Publisher: arXiv; presented at NeurIPS 2017
- Publication date: 2017-06-12 (initial arXiv submission)
- Supports: the beginner explanation of Transformer self-attention, positional information, feed-forward layers, and next-token logits.

### 2. Efficient Memory Management for Large Language Model Serving with PagedAttention

- Exact URL: https://arxiv.org/abs/2309.06180
- Authors: Woosuk Kwon, Zhuohan Li, Siyuan Zhuang, Ying Sheng, Lianmin Zheng, Cody Hao Yu, Joseph E. Gonzalez, Hao Zhang, and Ion Stoica
- Publisher: arXiv; SOSP 2023
- Publication date: 2023-09-12 (initial arXiv submission)
- Supports: the historical PagedAttention design, logical-to-physical KV-block mapping, memory-sharing claims, and the paper's scoped 2-4x throughput result at the same latency versus FasterTransformer and Orca in its evaluated configurations. The MDX explicitly does not treat this as a current universal benchmark.

### 3. vLLM source repository

- Exact URL: https://github.com/vllm-project/vllm
- Publisher/author: vLLM Project contributors
- Publication date: ongoing open-source repository; no single publication date
- Supports: project identity, source-code availability, and the practical link for readers who want to inspect or run vLLM.

### 4. Architecture Overview

- Exact URL: https://docs.vllm.ai/en/latest/design/arch_overview/
- Publisher/author: vLLM Project contributors
- Publication date: not stated on the page snapshot
- Supports: the V1 multi-process diagram and responsibilities of API server processes, engine core processes, GPU worker processes, ZMQ communication, and the conditional data-parallel coordinator.

### 5. Quickstart

- Exact URL: https://docs.vllm.ai/en/latest/getting_started/quickstart/
- Publisher/author: vLLM Project contributors
- Page date: 2026-05-27
- Supports: Linux and Python prerequisites, the NVIDIA installation commands, `vllm serve Qwen/Qwen2.5-1.5B-Instruct`, port 8000 examples, the Chat Completions request shape, and the `generation_config.json` caveat. The commands were source-reviewed but not executed in the GPU-less writing environment.

### 6. Optimization and Tuning

- Exact URL: https://docs.vllm.ai/en/latest/configuration/optimization/
- Publisher/author: vLLM Project contributors
- Page date: 2026-07-07
- Supports: V1 chunked prefill being enabled whenever supported, decode-first scheduling, use of remaining `max_num_batched_tokens` capacity for prefill, prefill chunking, CPU-resource considerations, and workload-dependent TTFT/ITL tuning.

### 7. Automatic Prefix Caching

- Exact URL: https://docs.vllm.ai/en/latest/features/automatic_prefix_caching/
- Publisher/author: vLLM Project contributors
- Page date: 2026-04-28
- Supports: reuse of KV state for matching prefixes, long-document and multi-round workloads, and the limitation that prefix caching reduces prefill work but does not reduce new-token decode work.

### 8. Scheduler Configuration API

- Exact URL: https://docs.vllm.ai/en/stable/api/vllm/config/scheduler/
- Publisher/author: vLLM Project contributors
- Publication date: generated API reference; no single publication date stated
- Supports: the current definitions of `max_num_batched_tokens`, `max_num_scheduled_tokens`, `max_num_seqs`, chunked-prefill controls, and FCFS/priority scheduling policy. The article uses the stable URL for the manual reference and describes only the documented budget relationship.

### 9. Parallelism and Scaling

- Exact URL: https://docs.vllm.ai/en/latest/serving/parallelism_scaling/
- Publisher/author: vLLM Project contributors
- Page date: 2026-05-06
- Supports: tensor and pipeline parallel deployment guidance, data-parallel replicas, multi-node communication constraints, and the warning that interconnect behavior can determine whether extra GPUs improve latency or throughput.

### 10. CUDA Graphs

- Exact URL: https://docs.vllm.ai/en/latest/design/cuda_graphs/
- Publisher/author: vLLM Project contributors
- Page date: 2026-06-23
- Supports: V1 full and piecewise CUDA Graph modes, runtime dispatch by batch shape, attention-backend compatibility, capture/replay, warmup, compilation-time, and memory tradeoffs.

### 11. Benchmark CLI

- Exact URL: https://docs.vllm.ai/en/latest/benchmarking/cli/
- Publisher/author: vLLM Project contributors
- Publication date: continuously updated documentation; no single publication date stated
- Access date: 2026-07-19
- Supports: vLLM reporting TTFT, TPOT, and ITL as separate serving-benchmark metrics rather than treating ITL and TPOT as interchangeable.

## Cover artwork and logo provenance

### Official vLLM compact logo

- Asset: `vLLM-Logo.png`
- Exact pinned source URL: https://github.com/vllm-project/media-kit/blob/79b2ea5db25b723f2d81dae203a87c5b9a076722/vLLM-Logo.png
- Official media-kit repository: https://github.com/vllm-project/media-kit
- Publisher/author: vLLM Project
- Publication date: repository asset; no publication date stated
- Repository handling: used only as a temporary compositing input. The standalone logo file is not committed with this post. The final cover composites preserve the official mark's proportions and colors.

The unbranded background is original AI-generated oil-painting artwork created with Codex's built-in image generation tool. The official compact vLLM logo was then composited deterministically onto the square master. A Ylang Labs watermark was placed on the square master inside the header crop-safe area before the header was derived; because the narrower card crop excludes that area, the card received one separate watermark pass. Each final image contains one Ylang mark. The image model was not asked to generate the logo or any text.
