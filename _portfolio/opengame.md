---
layout: studio-project
title: "OpenGame"
title_en: "OpenGame"
title_zh: "OpenGame"
number: "05"
label_en: "Multi-agent simulation · private prototype"
label_zh: "多 Agent 仿真 · 私有原型"
lead_en: "A persistent school-world simulation where characters carry memory, relationships, locations, plans, and replayable histories."
lead_zh: "一个持续运行的校园世界模拟：角色有记忆、关系、位置和行动计划，发生过的事也可以回放。"
status_en: "Private repository · public summary"
status_zh: "私有仓库 · 仅公开摘要"
stack: "Python · web UI · JSONL events"
collection: portfolio
order: 5
---

<div class="lang-content" data-lang-content="zh">
  <section class="project-section">
    <p class="project-section__label">问题</p>
    <div class="project-section__content">
      <h2>如果角色不只在聊天框里存在，会发生什么</h2>
      <p>OpenGame 是我从单角色叙事继续往前做的私有原型。多个角色共享同一个校园世界，各自有 persona、记忆、关系、位置和行动计划。玩家对话也会回到仿真里，影响角色之后的行为。</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">实现</p>
    <div class="project-section__content">
      <h2>世界可以自己跑，也要能被人看懂</h2>
      <p>项目有角色总览、关系图、校园地图、状态和记忆页面；也有不依赖前端的 headless runner，可以单独推进世界。</p>
      <p>状态变化和行为事件会写进 JSONL。选择这种格式不是因为它漂亮，而是因为追加写入、逐行检查和回放都很直接。</p>
      <div class="project-code">world tick → agent plans → actions → memory / relationship updates → JSONL</div>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">公开边界</p>
    <div class="project-section__content">
      <h2>目前只公开高层摘要</h2>
      <p>仓库和截图暂时不公开，因此这个页面不展示无法验证的性能数字。它在我的项目线里更像一个承上启下的系统实验：把绿园中学物语里的角色状态，扩展到多个 Agent 共享的持久世界。</p>
    </div>
  </section>
</div>

<div class="lang-content" data-lang-content="en">
  <section class="project-section">
    <p class="project-section__label">THE QUESTION</p>
    <div class="project-section__content">
      <h2>What if characters existed outside the chat box?</h2>
      <p>OpenGame is a private prototype that extends my earlier single-character narrative work. Several characters share one school world, each with a persona, memory, relationships, location, and plans. Player conversations feed back into the simulation and can change later behavior.</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">THE BUILD</p>
    <div class="project-section__content">
      <h2>The world should run alone and remain understandable</h2>
      <p>The project includes character overviews, a relationship graph, a school map, and state and memory views. A headless runner can also advance the world without the frontend.</p>
      <p>State changes and actions append to JSONL. It is not a glamorous format, but it makes incremental writes, line-by-line inspection, and replay straightforward.</p>
      <div class="project-code">world tick → agent plans → actions → memory / relationship updates → JSONL</div>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">PUBLIC BOUNDARY</p>
    <div class="project-section__content">
      <h2>Only a high-level summary for now</h2>
      <p>The repository and screenshots are private, so this page avoids unverifiable performance claims. In my project history, it is a bridge: taking character state from Green Garden High School Story and extending it into a persistent world shared by several agents.</p>
    </div>
  </section>
</div>
