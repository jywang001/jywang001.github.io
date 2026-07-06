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

This page is adapted from my latest CV and kept as a web-native overview of my education, research, projects, and skills.

Education
======
* **Peking University**, B.S. in Computer Science and Technology (Elite Program), 2024.09 - 2028.07

Research Experience
======
* **Center for Frontier Computing Research, Peking University**<br>
  Advisor: Hao Dong, 2025.12 - Present
  * **Post-training for multimodal embodied models**: participate in the experimental loop for multimodal embodied large models, including open/self-collected data processing, SFT/CoT sample construction, RL candidate filtering, evaluation analysis, and error-case feedback.
  * Clean and align multi-source datasets including RoboVQA, ShareRobot, and RoboCasa365 for SFT/RL training samples, data synthesis, annotation alignment, quality checks, and training strategy iteration.
  * Run and inspect SFT and GRPO/RL post-training experiments around Qwen-VL and Pi-series models, maintaining evaluation scripts and analyzing failures around format learning, capability gaps, and benchmark transfer.
  * **Real-world embodied navigation evaluation and data synthesis**: operate robot-dog experiments, scan real scenes, set up evaluation environments, record navigation tasks, synthesize navigation data, and analyze failed trajectories.

* **Wangxuan Institute of Computer Technology, Peking University**<br>
  Advisor: Yang Liu, Research Rotation
  * Study video spatio-temporal grounding with a multi-agent debating framework, where visual/language agents interact, challenge one another, and fuse decisions to improve grounding robustness.
  * Work on temporal and spatial grounding experiments, localization module debugging, model evaluation, result logging, and error-case analysis.
  * Help build the model pipeline and evaluation workflow for video clips, candidate regions, and spatio-temporal localization outputs.

Selected Projects
======
* **[CritPT-RL](https://github.com/jywang001/CritPT-RL)**, personal project
  * Reproduce and build a Qwen3-8B RL post-training prototype using verl/vLLM, connecting synthetic/teacher-spec data construction, rollout inspection, reward analysis, checkpoint evaluation, and official-style evaluation.
  * Design failure mining, LLM-as-a-judge, strict rubric, and automated evaluation-analysis flows to diagnose reward hacking, format learning, and benchmark-transfer failures.
  * Compare synthetic/local rewards against official-style evaluation and summarize findings around data distribution, reward semantic alignment, and benchmark transfer.

* **PKUHub / PLIB**, campus project
  * Core contributor to one of the largest student AI organizations at Peking University.
  * Helped organize student talks around AI topics and contributed to PKUHub, a campus note-sharing platform with 5,000+ registered users.

Skills
======
* **Post-training**: SFT, GRPO/RL, CoT data processing, training-sample construction, reward design, error-case feedback, evaluation loops.
* **Data pipelines**: RoboVQA, ShareRobot, RoboCasa365 data cleaning, filtering, synthesis, annotation alignment, evaluation-set construction, and automated processing.
* **Evaluation and engineering**: official-style evaluation, LLM-as-a-judge, strict rubrics, verl, vLLM, Python, FastAPI, SQL/ORM, Git.
* **Relevant coursework**: Probability and Statistics in Informatics (93), Frontier Computing Research Practice I (95), Foundations of Artificial Intelligence (90).

</div>

<div class="lang-content" data-lang-content="zh" markdown="1">

本页根据我的最新 CV 整理为网页版经历概览，覆盖教育背景、科研经历、项目经历与技术栈。

教育背景
======
* **北京大学**，计算机科学与技术（拔尖班），本科，2024.09 - 2028.07

科研经历
======
* **北京大学前沿计算研究中心**<br>
  导师：董豪，2025.12 - 至今
  * **面向多模态具身大模型的 post-training**：参与多模态具身大模型后训练实验闭环，负责开源/自采数据处理、SFT/CoT 样本构造、RL 候选样本筛选、评测结果分析与错误案例回流。
  * 负责 RoboVQA、ShareRobot、RoboCasa365 等多源数据清洗、筛选、合成、标注对齐与质量检查，支持 SFT/RL 训练样本构造与训练策略迭代。
  * 基于 Qwen-VL、Pi 系列等模型参与 SFT 与 GRPO/RL 后训练实验，维护评测脚本并分析格式学习、能力短板和 benchmark 迁移失败等问题。
  * **具身导航真实环境评测与数据合成**：参与机器狗实机操作与评测、真实场景扫描、实验环境搭建、多轮导航任务记录、导航数据合成与失败轨迹分析。

* **北京大学王选计算机研究所**<br>
  导师：刘洋，拔尖班科研轮转
  * 参与基于 multi-agent debating 的视频时空定位研究，通过视觉/语言 Agent 的交互、质询与决策融合提升 video grounding 的鲁棒性。
  * 负责 temporal grounding 与 spatial grounding 相关实验，包括定位模块调试、模型评测、结果记录与错误案例分析。
  * 参与模型 pipeline 搭建、实验设计和评测流程整理，覆盖视频片段、候选区域和时空定位结果。

代表项目
======
* **[CritPT-RL](https://github.com/jywang001/CritPT-RL)**，个人项目
  * 复现并搭建基于 verl/vLLM 的 Qwen3-8B RL post-training 原型流程，串联 synthetic/teacher-spec 数据构造、rollout 检查、reward 分析、checkpoint 评测与 official-style evaluation。
  * 设计 failure mining、LLM-as-a-judge、strict rubric 与自动化评测分析流程，用于定位 reward hacking、格式学习与 benchmark 迁移失败等关键问题。
  * 系统比较 synthetic/local reward 与 official-style eval 的偏差，沉淀关于数据分布、reward 语义对齐与 benchmark 迁移的诊断结论。

* **PKUHub / PLIB**，校内项目
  * 北京大学大型学生 AI 社群核心参与者之一。
  * 参与策划多场 AI 相关学生讲座，并参与开发校内笔记共享平台 PKUHub，平台注册用户超过 5,000。

技术栈
======
* **Post-training**：SFT、GRPO/RL、CoT 数据处理、训练样本构造、reward 设计、错误案例回流与评测闭环。
* **数据管线**：RoboVQA、ShareRobot、RoboCasa365 数据清洗、筛选、合成、标注对齐、评测集构建与自动化处理。
* **评测与工程**：official-style evaluation、LLM-as-a-judge、strict rubric、verl、vLLM、Python、FastAPI、SQL/ORM、Git。
* **相关课程**：信息学中的概率统计 93，前沿计算研究实践 I 95，人工智能基础 90。

</div>
