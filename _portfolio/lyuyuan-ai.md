---
layout: studio-project
title: "绿园中学物语"
title_en: "Green Garden High School Story"
title_zh: "绿园中学物语"
number: "03"
label_en: "Narrative agents · early prototype"
label_zh: "叙事 Agent · 早期原型"
lead_en: "A small LLM-driven school story with five characters, relationship state, an event bus, and save files."
lead_zh: "一个由 LLM 驱动的校园叙事小游戏：五个角色、关系和情绪状态、事件总线，以及真的能读写的存档。"
status_en: "Public historical prototype · retired"
status_zh: "公开历史原型 · 已停止迭代"
stack: "Python · Flask · JavaScript · JSON"
repository: "https://github.com/jywang001/Lyuyuan_AI"
image: "/images/lyuyuan_ai_preview.png"
image_alt: "Green Garden High School Story chat interface"
collection: portfolio
order: 3
---

<div class="lang-content" data-lang-content="zh">
  <section class="project-section">
    <p class="project-section__label">当时</p>
    <div class="project-section__content">
      <h2>我想做的不是另一个聊天框</h2>
      <p>玩家在学校社团招新的背景里遇到五个角色。每个人有独立 persona，也有好感度、无聊度和关系阶段。一次对话不只生成角色说出口的话，还会返回一份内部 JSON，用来更新这些状态。</p>
      <p>现在回看，这个设定很青涩，但它迫使我第一次认真处理“聊完以后系统里留下什么”。</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">系统</p>
    <div class="project-section__content">
      <h2>角色之外，还有一些不浪漫的基础设施</h2>
      <p><code>BaseCharacter</code> 统一处理角色对话和状态变化；EventBus 把好感度、关系、游戏生命周期等事件分发给日志、统计和成就监听器；GameStorage 把进度写进五个 JSON 存档槽。</p>
      <p>前端是原生 HTML / Bootstrap / jQuery，后端是 Flask。仓库里也保留了角色配置、API 文档和基础测试。</p>
      <div class="project-code">dialogue + analysis JSON → state update → event bus → logs / saves / UI</div>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">后来</p>
    <div class="project-section__content">
      <h2>这个仓库已经完成了它的历史使命</h2>
      <p>它不是我现在会选择的产品形态，UI 和 prompt 都有很强的阶段感。但事件、状态和存档这些“无聊部分”让我后来做多 Agent 系统时少走了不少弯路。</p>
      <p class="project-quote">一段好看的角色回复很容易演示；真正难的是让第十轮对话还能接得上第一轮留下的状态。</p>
    </div>
  </section>
</div>

<div class="lang-content" data-lang-content="en">
  <section class="project-section">
    <p class="project-section__label">BACK THEN</p>
    <div class="project-section__content">
      <h2>I wanted more than another chat box</h2>
      <p>The player meets five characters during a school club fair. Each has a persona, closeness score, boredom score, and relationship stage. A turn produces both the line spoken to the player and an internal JSON object used to update state.</p>
      <p>The premise now feels unmistakably early, but it forced me to ask what should remain in the system after a conversation ends.</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">THE SYSTEM</p>
    <div class="project-section__content">
      <h2>Characters need unromantic infrastructure</h2>
      <p><code>BaseCharacter</code> handles dialogue and state changes. An EventBus routes closeness, relationship, and game-lifecycle events to logging, statistics, and achievement listeners. GameStorage writes progress into five JSON save slots.</p>
      <p>The frontend uses plain HTML, Bootstrap, and jQuery; the backend is Flask. Character config, API notes, and basic tests remain in the repository.</p>
      <div class="project-code">dialogue + analysis JSON → state update → event bus → logs / saves / UI</div>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">AFTERWARD</p>
    <div class="project-section__content">
      <h2>The repository has finished its job</h2>
      <p>It is not the product shape I would choose today, and both the interface and prompts show their age. The event, state, and save plumbing, however, made later multi-agent work much less mysterious.</p>
      <p class="project-quote">A charming reply is easy to demo. The harder part is making turn ten remember what turn one changed.</p>
    </div>
  </section>
</div>
