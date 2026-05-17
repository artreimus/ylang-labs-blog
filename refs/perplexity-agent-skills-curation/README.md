# Perplexity Agent Skills Curation

Source packet for `data/blogs/perplexity-agent-skills-curation.mdx`.

## Sources

### Perplexity Research

- Title: Designing, Refining, and Maintaining Agent Skills at Perplexity
- URL: https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity
- Publisher: Perplexity Research
- Date: 2026-05-01
- Accessed: 2026-05-17
- Used for:
  - Skill framing as directory, format, invocable object, and progressive context system.
  - Context cost tiers in Perplexity Computer: index, loaded body, and runtime files.
  - Guidance that descriptions are routing triggers, not documentation.
  - Guidance to start with evals, use positive and negative examples, preserve description stability, and grow gotchas append-mostly.

### Agent Skills documentation

- Title: Agent Skills Overview
- URL: https://agentskills.io/home
- Publisher: Agent Skills
- Accessed: 2026-05-17
- Used for:
  - Baseline description of Agent Skills as a folder format with `SKILL.md`, optional `scripts/`, `references/`, and `assets/`.
  - Progressive disclosure framing: discovery, activation, execution.

### SkillsBench

- Title: SkillsBench: Benchmarking How Well Agent Skills Work Across Diverse Tasks
- URL: https://arxiv.org/abs/2602.12670
- Authors: Xiangyi Li, Wenbo Chen, Yimin Liu, Shenghan Zheng, Xiaokun Chen, Yifeng He, Yubo Li, Bingran You, Haotian Shen, Jiankai Sun, Shuyi Wang, Binxu Li, Qunhong Zeng, Di Wang, Xuandong Zhao, Yuanli Wang, Roey Ben Chaim, Zonglin Di, Yipeng Gao, Junwei He, Yizhuo He, Liqiang Jing, Luyang Kong, Xin Lan, Jiachen Li, Songlin Li, Yijiang Li, Yueqian Lin, Xinyi Liu, Xuanqing Liu, Haoran Lyu, Ze Ma, Bowei Wang, Runhui Wang, Tianyu Wang, Wengao Ye, Yue Zhang, Hanwen Xing, Yiqi Xue, Steven Dillmann, and Han-chung Lee
- Publisher: arXiv
- Submitted: 2026-02-13
- Last revised: 2026-03-13
- Accessed: 2026-05-17
- Used for:
  - Empirical claim that curated Skills improved average pass rate by 16.2 percentage points in the benchmark.
  - Empirical caution that self-generated Skills did not help on average and that some tasks had negative deltas.

### Local context

- Path: `data/blogs/agent-skills.mdx`
- Used for:
  - Positioning this post as a narrower follow-up to the existing Ylang Labs Agent Skills explainer.

## Image prompt

Generated via built-in image generation, then copied into the repo as `public/static/images/blogs/perplexity-agent-skills-curation/source-artwork.png`.

Prompt summary:

> Create an original museum-quality oil painting that visualizes agent skills as curated context infrastructure, with a quiet technical library, modular folders, scripts, references, assets, a luminous agent studying a compact manuscript, warm chiaroscuro lighting, and no readable text, logos, watermarks, or signatures.

Final crops:

- `public/static/images/blogs/perplexity-agent-skills-curation/cardImage.png`, 1080x1920.
- `public/static/images/blogs/perplexity-agent-skills-curation/blogHeader.png`, 1260x700.
