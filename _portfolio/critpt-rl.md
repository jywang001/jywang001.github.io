---
title: "CritPT-RL"
excerpt: "A personal RL post-training prototype for Qwen3-8B using verl/vLLM, strict rubrics, failure mining, and official-style evaluation"
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
