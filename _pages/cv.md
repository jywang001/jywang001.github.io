---
layout: archive
title: "Experience"
title_en: "Experience"
title_zh: "经历"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<div class="lang-content" data-lang-content="en" markdown="1">

This page is a web-native overview of my education, research, selected projects, and toolbox. It is intentionally more narrative than a full CV: the goal is to show what I worked on, what my role was, and what evidence is public.

Education
======

* **Peking University**, B.S. in Computer Science and Technology (Elite Program), 2024.09 - 2028.07

Research Experience
======

### Center for Frontier Computing Research, Peking University

**Advisor:** Hao Dong  
**Role:** Undergraduate research assistant  
**Time:** 2025.12 - Present

**Problem:** Multimodal embodied models often fail in ways that are hard to reuse. A useful training loop needs to turn those failures into cleaned data, training samples, reward signals, evaluation scripts, and the next round of diagnosis.

**My role:** I participate in the post-training and evaluation loop: cleaning and aligning multi-source robot datasets, constructing SFT/CoT samples, filtering RL candidates, maintaining evaluation scripts, and analyzing error cases.

**Methods:** SFT/CoT sample construction, GRPO/RL candidate filtering, benchmark-style evaluation, error-case feedback, and real-world navigation evaluation.

**Artifacts / evidence:** Internal experiment records and evaluation scripts; public-facing related evidence is [CritPT-RL]({{ base_path }}/portfolio/critpt-rl/), where I made a smaller open post-training/eval loop to study reward/eval mismatch.

**Status / lesson:** Ongoing. The strongest lesson so far is that failure cases are only useful when their data path and evaluation target are explicit enough to reproduce.

### Wangxuan Institute of Computer Technology, Peking University

**Advisor:** Yang Liu  
**Role:** Research rotation  

**Problem:** Video spatio-temporal grounding needs robust localization across language descriptions, video clips, temporal intervals, and candidate spatial regions.

**My role:** I worked on experiments around a multi-agent debating framework for video grounding, including localization module debugging, model evaluation, result logging, and error-case analysis.

**Methods:** Temporal grounding, spatial grounding, multi-agent debating, evaluation workflow construction, and localization result inspection.

**Artifacts / evidence:** Research rotation work; public details are limited.

**Status / lesson:** Completed rotation. The useful lesson was that grounding errors are easier to study when temporal and spatial failures are logged separately.

Selected Projects
======

* **[CritPT-RL]({{ base_path }}/portfolio/critpt-rl/)**: a public Qwen-style GRPO post-training and evaluation lab for scientific Python-answer tasks. The key result is a negative finding: better format and cleaner `answer()` structure did not automatically improve official70 accuracy.
* **[Texas-Poker-Agents]({{ base_path }}/portfolio/texas-poker-agents/)**: a public local Hold'em environment for one human and multiple LLM seats, with strict visible-state prompts, rules-engine validation, logs, fallback actions, and replay.
* **PKUHub / PLIB**: campus AI community and product work, including student AI talks and PKUHub, a note-sharing platform with 5,000+ registered users.

Toolbox
======

* **Post-training / eval:** SFT, GRPO/RL, CoT sample construction, reward design, failure mining, official-style evaluation, LLM-as-a-judge.
* **Data pipelines:** robot data cleaning, filtering, synthesis, annotation alignment, quality checks, evaluation-set construction, automated processing.
* **Systems / product:** Python, JavaScript, C++, Flask, Django, FastAPI, SQL/ORM, Git, browser UIs, JSON/JSONL logs.
* **Interests:** embodied AI, multimodal agents, post-training, benchmark transfer, inspectable agent systems.

</div>

<div class="lang-content" data-lang-content="zh" markdown="1">

这个页面是网页版经历概览，覆盖教育背景、科研经历、代表项目和工具箱。它不是完整 CV 的逐条搬运，而是更强调：我做过什么、我的角色是什么、哪些证据可以公开看到。

教育背景
======

* **北京大学**，计算机科学与技术（拔尖班），本科，2024.09 - 2028.07

科研经历
======

### 北京大学前沿计算研究中心

**导师：**董豪  
**角色：**本科生科研助理  
**时间：**2025.12 - 至今

**Problem：**多模态具身模型在真实任务中失败后，需要把失败案例转化为清洗后的数据、训练样本、reward 信号、评测脚本和下一轮诊断依据。

**My role：**我参与 post-training 与评测闭环，包括多源机器人数据清洗与对齐、SFT/CoT 样本构造、RL 候选样本筛选、评测脚本维护和错误案例分析。

**Methods：**SFT/CoT 样本构造、GRPO/RL 候选筛选、benchmark-style evaluation、错误案例回流和真实环境导航评测。

**Artifacts / evidence：**内部实验记录和评测脚本；公开可看的相关证据是 [CritPT-RL]({{ base_path }}/portfolio/critpt-rl/)，我在其中做了一个更小的开放后训练/评测闭环，用来研究 reward/eval mismatch。

**Status / lesson：**进行中。到目前为止最重要的体会是：失败案例只有在数据路径和评测目标都足够明确时，才真的能被复现和利用。

### 北京大学王选计算机研究所

**导师：**刘洋  
**角色：**拔尖班科研轮转

**Problem：**视频时空定位需要同时处理语言描述、视频片段、时间区间和候选空间区域，鲁棒性很容易被细粒度定位误差影响。

**My role：**我参与 multi-agent debating 框架下的视频 grounding 实验，包括定位模块调试、模型评测、结果记录和错误案例分析。

**Methods：**temporal grounding、spatial grounding、multi-agent debating、评测流程整理和定位结果检查。

**Artifacts / evidence：**科研轮转工作；公开细节有限。

**Status / lesson：**轮转已完成。比较有用的体会是：如果 temporal failure 和 spatial failure 能分开记录，grounding 错误会更容易分析。

代表项目
======

* **[CritPT-RL]({{ base_path }}/portfolio/critpt-rl/)**：公开的 Qwen-style GRPO 后训练与评测实验，面向 scientific Python-answer 任务。关键结论是一个负结果：格式更干净、`answer()` 结构更像样，并不自动提升 official70 accuracy。
* **[Texas-Poker-Agents]({{ base_path }}/portfolio/texas-poker-agents/)**：公开的本地德州扑克实验环境，真人对战多个 LLM 座位，包含严格可见状态 prompt、规则引擎校验、日志、fallback 行为和复盘。
* **PKUHub / PLIB**：校内 AI 社群与产品工作，包括学生 AI 讲座，以及注册用户超过 5,000 的校内笔记共享平台 PKUHub。

工具箱
======

* **Post-training / eval：**SFT、GRPO/RL、CoT 样本构造、reward 设计、failure mining、official-style evaluation、LLM-as-a-judge。
* **数据管线：**机器人数据清洗、筛选、合成、标注对齐、质量检查、评测集构建和自动化处理。
* **系统 / 产品：**Python、JavaScript、C++、Flask、Django、FastAPI、SQL/ORM、Git、浏览器 UI、JSON/JSONL 日志。
* **兴趣方向：**具身智能、多模态 agent、后训练、benchmark transfer、可检查的 agent 系统。

</div>
