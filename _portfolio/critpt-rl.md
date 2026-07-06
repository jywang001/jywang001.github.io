---
title: "CritPT-RL"
title_en: "CritPT-RL"
title_zh: "CritPT-RL"
excerpt: "A research-and-engineering lab for post-training Qwen-style models on scientific Python-answer tasks using verl, vLLM, GRPO, reward variants, and official-style evaluation"
excerpt_en: "A research-and-engineering lab for post-training Qwen-style models on scientific Python-answer tasks using verl, vLLM, GRPO, reward variants, and official-style evaluation"
excerpt_zh: "一个面向科学 Python-answer 任务的 Qwen-style 模型后训练实验室，覆盖 verl、vLLM、GRPO、reward 设计和 official-style evaluation"
collection: portfolio
order: 2
---

<div class="lang-content" data-lang-content="en" markdown="1">

## CritPT-RL

CritPT-RL is a research-and-engineering repository for post-training Qwen-style language models on CritPT-like scientific Python-answer tasks. The model reads a scientific problem and returns an executable Python `answer()` function.

### Scope
- Built a GRPO post-training loop with verl, vLLM rollouts, checkpoint merge/eval scripts, and training metric visualization.
- Implemented synthetic tasks, official-style prompt wrappers, failure-mined hard cases, and LLM-generated teacher specifications.
- Implemented reward variants including local verification, semantic code judging, length-aware shaping, strict final-answer judging, and LLM-as-a-judge wrappers.
- Analyzed reward hacking, synthetic-task mismatch, and why clean formatting alone did not improve official70 accuracy.

### Result
The training and evaluation pipeline is functional. The main finding is that synthetic/local rewards need much tighter semantic alignment with the target benchmark; formatting and executable structure are necessary but not sufficient.

### Stack
- Python
- GRPO
- verl
- vLLM
- LLM-as-a-judge
- Official-style evaluation

### Repository
[View on GitHub](https://github.com/jywang001/CritPT-RL)

</div>

<div class="lang-content" data-lang-content="zh" markdown="1">

## CritPT-RL

CritPT-RL 是一个研究与工程结合的后训练仓库，面向 CritPT-like scientific Python-answer 任务训练 Qwen-style 语言模型。任务形式是：模型读取科学问题，并返回可执行的 Python `answer()` 函数。

### 范围
- 搭建基于 verl、vLLM rollout、checkpoint merge/eval 脚本和训练指标可视化的 GRPO 后训练闭环。
- 实现 synthetic tasks、official-style prompt wrappers、failure-mined hard cases 和 LLM-generated teacher specifications 等数据路径。
- 实现 local verification、semantic code judging、length-aware shaping、strict final-answer judging、LLM-as-a-judge wrappers 等 reward 变体。
- 分析 reward hacking、synthetic-task mismatch，以及为什么格式变好并不等于 official70 accuracy 提升。

### 结论
训练与评测 pipeline 已跑通。主要发现是 synthetic/local reward 必须和目标 benchmark 在语义上更紧密对齐；格式学习和可执行结构是必要条件，但远远不够。

### 技术栈
- Python
- GRPO
- verl
- vLLM
- LLM-as-a-judge
- Official-style evaluation

### 仓库
[View on GitHub](https://github.com/jywang001/CritPT-RL)

</div>
