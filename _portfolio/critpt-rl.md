---
title: "CritPT-RL"
title_en: "CritPT-RL"
title_zh: "CritPT-RL"
excerpt: "A personal RL post-training prototype for Qwen3-8B using verl/vLLM, strict rubrics, failure mining, and official-style evaluation"
excerpt_en: "A personal RL post-training prototype for Qwen3-8B using verl/vLLM, strict rubrics, failure mining, and official-style evaluation"
excerpt_zh: "一个围绕 Qwen3-8B、verl/vLLM、strict rubric、failure mining 和 official-style evaluation 搭建的个人 RL post-training 原型"
collection: portfolio
---

## CritPT-RL

CritPT-RL is my personal project for reproducing and building a Qwen3-8B RL post-training prototype around the verl/vLLM stack.

### Focus
- Synthetic and teacher-spec data construction
- Rollout inspection and reward-result analysis
- Checkpoint evaluation and official-style evaluation
- Failure mining, LLM-as-a-judge, and strict rubric design

### What I Studied
- Reward hacking and format-learning failures
- Gaps between synthetic/local rewards and official-style benchmarks
- How data distribution and reward semantics affect benchmark transfer

### Technologies
- Qwen3-8B
- verl
- vLLM
- Python
- LLM-as-a-judge evaluation

### Repository
[View on GitHub](https://github.com/jywang001/CritPT-RL)
