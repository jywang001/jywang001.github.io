---
layout: studio-project
title: "CritPT-RL"
title_en: "CritPT-RL"
title_zh: "CritPT-RL"
number: "01"
label_en: "RL post-training · research experiment"
label_zh: "RL 后训练 · 研究实验"
lead_en: "A full post-training loop that produced cleaner answers without improving the official score, and a useful record of why."
lead_zh: "一套完整的后训练流程：答案格式变好了，官方分数却没动。这个落差本身就是项目最有价值的结果。"
status_en: "Public repository · pipeline complete"
status_zh: "公开仓库 · 流程已跑通"
stack: "Python · verl · vLLM · GRPO"
repository: "https://github.com/jywang001/CritPT-RL"
image: "/images/critpt-rl-curves.png"
image_alt: "Training curves from a CritPT-RL experiment"
collection: portfolio
order: 1
---

<div class="lang-content" data-lang-content="zh">
  <section class="project-section">
    <p class="project-section__label">任务</p>
    <div class="project-section__content">
      <h2>让模型交一份能运行的 Python 答案</h2>
      <p>任务形式很固定：模型读一道 scientific problem，返回一个可执行的 <code>answer()</code> 函数。看起来比开放式问答容易判分，但真正麻烦的是，代码能跑、格式正确和答案真的对，并不是一回事。</p>
      <p>我想把这几个层次拆开，因此从数据、rollout、reward、checkpoint 到评测都自己接了一遍。</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">我做的</p>
    <div class="project-section__content">
      <h2>一条能反复改 reward 的实验链路</h2>
      <p>训练部分基于 verl 和 vLLM rollout，包含 checkpoint merge、评测和曲线整理。数据侧试过程序生成题、official-style prompt、从失败样本里挖 hard case，以及由 LLM 生成 teacher specification。</p>
      <p>reward 也换过几轮：本地执行校验、语义代码判断、长度约束、严格 final-answer judge，再到 LLM judge。每一次改动都尽量保留对应配置和结果，而不是只留下最后一条命令。</p>
      <div class="project-code">tasks → rollouts → reward variants → checkpoint eval → official-style eval → bad cases</div>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">结果</p>
    <div class="project-section__content">
      <h2>模型学会了“像答案”，但没有更会做题</h2>
      <p>后期 V / E 系列实验让输出更短、更规整，也更稳定地生成可执行的 <code>answer()</code>。但 official70 accuracy 没有提高。训练曲线里的进步，主要对应了 reward 容易看见的部分，而不是 benchmark 真正关心的语义正确性。</p>
      <p class="project-quote">这个项目没有给出一个漂亮的 SOTA 数字，但它把一次 reward / eval mismatch 留下了足够清楚的证据。</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">仓库</p>
    <div class="project-section__content">
      <h2>哪些东西可以公开复现</h2>
      <p>仓库保留了数据生成、reward、训练配置、评测脚本、单元测试和筛选过的曲线。完整模型权重、原始 rollout 和远端算力环境没有公开；本地测试不需要模型权重或 API key。</p>
      <p><a class="studio-text-link" href="https://github.com/jywang001/CritPT-RL">打开 GitHub <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></p>
    </div>
  </section>
</div>

<div class="lang-content" data-lang-content="en">
  <section class="project-section">
    <p class="project-section__label">THE TASK</p>
    <div class="project-section__content">
      <h2>Make the model submit runnable Python</h2>
      <p>The task has a narrow interface: read a scientific problem and return an executable <code>answer()</code> function. That makes scoring look simple, but runnable code, correct formatting, and a correct answer are three different things.</p>
      <p>I wanted those layers to be visible, so I connected the path from data and rollouts through rewards, checkpoints, and evaluation.</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">THE BUILD</p>
    <div class="project-section__content">
      <h2>An experiment loop where rewards could be changed and compared</h2>
      <p>Training used verl and vLLM rollouts, with checkpoint merge, evaluation, and curve tooling. Data paths included programmatic tasks, official-style prompts, failure-mined hard cases, and LLM-generated teacher specifications.</p>
      <p>I also iterated through local execution checks, semantic code judging, length shaping, strict final-answer judging, and LLM judges. Configs and results were kept together so an experiment left more than a launch command behind.</p>
      <div class="project-code">tasks → rollouts → reward variants → checkpoint eval → official-style eval → bad cases</div>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">THE RESULT</p>
    <div class="project-section__content">
      <h2>The model learned to look more like an answer</h2>
      <p>Later V and E runs produced shorter, cleaner, more consistently executable <code>answer()</code> functions. Official70 accuracy, however, did not improve. The training curves rewarded what the verifier could easily see, not all of the semantic correctness the benchmark expected.</p>
      <p class="project-quote">There is no neat SOTA number here. There is a well-documented reward/evaluation mismatch, which turned out to be more useful.</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">THE REPO</p>
    <div class="project-section__content">
      <h2>What can be reproduced publicly</h2>
      <p>The repository contains data builders, rewards, experiment configs, evaluation scripts, unit tests, and curated curves. Full model weights, raw rollouts, and private compute details are not published; local tests need neither weights nor API keys.</p>
      <p><a class="studio-text-link" href="https://github.com/jywang001/CritPT-RL">Open GitHub <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></p>
    </div>
  </section>
</div>
