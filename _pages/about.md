---
permalink: /
title: "Home"
title_en: "Home"
title_zh: "主页"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<div class="lang-content" data-lang-content="en" markdown="1">

<div class="home-hero">
  <div>
    <p class="home-kicker">Peking University CS · embodied AI and agents</p>
    <h1 class="home-title">Junyang Wang / 王俊阳</h1>
    <p class="home-lead">I am a Computer Science undergraduate at Peking University. My current thread is post-training and evaluation for embodied and multimodal models: turning failure cases into data, rewards, eval scripts, and the next training signal.</p>
    <p class="home-lead">I also like making agent ideas runnable. Recent public projects include <a href="/portfolio/critpt-rl/">CritPT-RL</a>, a post-training/eval experiment for scientific Python-answer tasks, and <a href="/portfolio/texas-poker-agents/">Texas-Poker-Agents</a>, a local table where a human plays with multiple LLM agents under imperfect information.</p>
    <div class="home-actions">
      <a class="btn btn--primary" href="/projects/">Selected Work</a>
      <a class="btn" href="/cv/">Experience</a>
      <a class="btn" href="https://github.com/jywang001">GitHub</a>
      <a class="btn" href="mailto:junyangwang@stu.pku.edu.cn">Email</a>
    </div>
  </div>
  <img class="home-portrait" src="/images/avatar.jpg" alt="Junyang Wang profile photo">
</div>

<div class="home-metrics">
  <div class="home-metric">
    <strong>Main Thread</strong>
    <span>Embodied/multimodal post-training, reward design, benchmark-style evaluation, and failure feedback loops.</span>
  </div>
  <div class="home-metric">
    <strong>Public Evidence</strong>
    <span>CritPT-RL documents a working pipeline and a useful negative result: cleaner format did not automatically improve official accuracy.</span>
  </div>
  <div class="home-metric">
    <strong>Builder Habit</strong>
    <span>Agent systems should run, log decisions, expose visible information boundaries, and leave traces that can be replayed.</span>
  </div>
</div>

## Selected Work

<div class="home-paths">
  <a class="home-path" href="/portfolio/critpt-rl/">
    <strong>CritPT-RL</strong>
    <span>Qwen-style GRPO post-training lab for scientific Python-answer tasks. The most useful result is a diagnosis of reward/eval mismatch.</span>
  </a>
  <a class="home-path" href="/portfolio/texas-poker-agents/">
    <strong>Texas-Poker-Agents</strong>
    <span>A local no-limit Hold'em table for one human and multiple LLM seats, with logs, table talk, fallback actions, and replayable hands.</span>
  </a>
  <a class="home-path" href="/portfolio/lyuyuan-ai/">
    <strong>Lyuyuan AI</strong>
    <span>An LLM-driven narrative RPG prototype with character prompts, relationship state, event bus logging, and lightweight saves.</span>
  </a>
</div>

## Research Snapshot

<div class="home-list">
  <div class="home-entry">
    <h3>Post-training for embodied models</h3>
    <p>I work on the experimental loop after a multimodal embodied model fails: cleaning multi-source robot data, constructing SFT/CoT samples, filtering RL candidates, maintaining evaluation scripts, and feeding error cases back into the next round.</p>
    <div class="home-entry-meta">Center for Frontier Computing Research, Peking University</div>
  </div>
  <div class="home-entry">
    <h3>Video spatio-temporal grounding</h3>
    <p>In a research rotation, I studied a multi-agent debating framework for video grounding and helped with localization experiments, result logging, and error-case analysis.</p>
    <div class="home-entry-meta">Wangxuan Institute of Computer Technology, Peking University</div>
  </div>
</div>

## Working Notes

For now, my most concrete notes live inside project READMEs and experiment logs. The notes I want to turn into public writeups are the failure analysis behind CritPT-RL, visible-information boundaries for poker agents, and small implementation notes from Mini-Lisp.

## Contact

- **Email**: [junyangwang@stu.pku.edu.cn](mailto:junyangwang@stu.pku.edu.cn)
- **GitHub**: [jywang001](https://github.com/jywang001)

</div>

<div class="lang-content" data-lang-content="zh" markdown="1">

<div class="home-hero">
  <div>
    <p class="home-kicker">北京大学计算机 · 具身智能与 Agent</p>
    <h1 class="home-title">王俊阳 / Junyang Wang</h1>
    <p class="home-lead">我是北京大学计算机本科生，主要关注具身/多模态模型的后训练与评测：怎么把模型失败案例变成数据、reward、评测脚本和下一轮训练信号。相比只看最终 benchmark 分数，我更关心中间过程是否可复现、可检查、可诊断。</p>
    <p class="home-lead">我也喜欢把 agent 想法做成能运行的系统。最近的公开项目包括 <a href="/portfolio/critpt-rl/">CritPT-RL</a>，一个 scientific Python-answer 任务上的 post-training/eval 实验；以及 <a href="/portfolio/texas-poker-agents/">Texas-Poker-Agents</a>，一个真人与多个 LLM agent 同桌对局、记录日志并复盘行为的本地实验台。</p>
    <div class="home-actions">
      <a class="btn btn--primary" href="/projects/">代表项目</a>
      <a class="btn" href="/cv/">经历</a>
      <a class="btn" href="https://github.com/jywang001">GitHub</a>
      <a class="btn" href="mailto:junyangwang@stu.pku.edu.cn">邮箱</a>
    </div>
  </div>
  <img class="home-portrait" src="/images/avatar.jpg" alt="王俊阳头像">
</div>

<div class="home-metrics">
  <div class="home-metric">
    <strong>当前主线</strong>
    <span>具身/多模态后训练、reward 设计、benchmark-style evaluation，以及失败案例回流。</span>
  </div>
  <div class="home-metric">
    <strong>公开证据</strong>
    <span>CritPT-RL 记录了一个跑通的训练评测流程，也记录了一个有价值的负结果：格式更干净不等于 official accuracy 更高。</span>
  </div>
  <div class="home-metric">
    <strong>工程习惯</strong>
    <span>Agent 系统应该能运行、能记录决策、能限制可见信息边界，也能留下可复盘的行为痕迹。</span>
  </div>
</div>

## 代表项目

<div class="home-paths">
  <a class="home-path" href="/portfolio/critpt-rl/">
    <strong>CritPT-RL</strong>
    <span>面向 scientific Python-answer 任务的 Qwen-style GRPO 后训练实验。最重要的结论是 reward 与目标评测之间的语义错位。</span>
  </a>
  <a class="home-path" href="/portfolio/texas-poker-agents/">
    <strong>Texas-Poker-Agents</strong>
    <span>本地无限注德州扑克实验台：真人对战多个 LLM 座位，记录日志、牌桌话、fallback 行为和完整复盘。</span>
  </a>
  <a class="home-path" href="/portfolio/lyuyuan-ai/">
    <strong>Lyuyuan AI</strong>
    <span>LLM 叙事 RPG 原型，包含角色 prompt、关系状态、事件总线日志和轻量存档。</span>
  </a>
</div>

## 科研切片

<div class="home-list">
  <div class="home-entry">
    <h3>具身模型 post-training</h3>
    <p>我参与模型失败之后的实验闭环：多源机器人数据清洗、SFT/CoT 样本构造、RL 候选样本筛选、评测脚本维护，以及错误案例回流。</p>
    <div class="home-entry-meta">北京大学前沿计算研究中心</div>
  </div>
  <div class="home-entry">
    <h3>视频时空定位</h3>
    <p>在科研轮转中，我研究过 multi-agent debating 框架下的视频 grounding，并参与定位实验、结果记录和错误案例分析。</p>
    <div class="home-entry-meta">北京大学王选计算机研究所</div>
  </div>
</div>

## 技术笔记

目前最具体的笔记还在项目 README 和实验记录里。接下来最值得公开整理的是 CritPT-RL 的失败诊断、poker agent 的可见信息边界，以及 Mini-Lisp 里的 macro / quasiquote 实现笔记。

## 联系

- **邮箱**：[junyangwang@stu.pku.edu.cn](mailto:junyangwang@stu.pku.edu.cn)
- **GitHub**：[jywang001](https://github.com/jywang001)

</div>
