---
layout: archive
title: "Experience"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

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
