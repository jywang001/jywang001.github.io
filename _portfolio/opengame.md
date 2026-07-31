---
layout: studio-project
title: "OpenGame"
title_en: "OpenGame"
title_zh: "OpenGame"
number: "05"
label_en: "Campus-life micro-RPG · local game"
label_zh: "校园生活微 RPG · 本地游戏"
lead_en: "A complete seven-day campus-life RPG about time, promises, and relationships, fully playable without an API key."
lead_zh: "一个关于时间、承诺和关系的七日校园生活微 RPG，无需 API Key 也可以完整通关。"
status_en: "Public repository · complete main story"
status_zh: "公开仓库 · 主线可完整通关"
stack: "Python · Django · JavaScript · JSON"
repository: "https://github.com/jywang001/OpenGame"
image: "/images/opengame-preview.jpg"
image_alt: "OpenGame opening-day story event"
cover_class: "project-cover--wide"
collection: portfolio
order: 5
---

<div class="lang-content" data-lang-content="zh">
  <section class="project-section">
    <p class="project-section__label">玩法</p>
    <div class="project-section__content">
      <h2>开学第一周，只有七天</h2>
      <p>玩家扮演一名刚转入绿园中学的学生。每天的自由时间有限，每个时段只能完成一项关键行动：去一个地点、处理一件事，或者和某个人聊一会儿。</p>
      <p>同一时间经常有几件事同时发生，一局不可能看完所有角色路线。去见了谁、错过了谁，以及答应过什么，都会留到之后的剧情里。</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">状态</p>
    <div class="project-section__content">
      <h2>关系不只是一根好感条</h2>
      <p>游戏分别记录熟悉、信任、好感、尊重和紧张，也维护近期记忆、人物线索和占用未来时段的承诺。准时出现、提前拒绝和临时爽约会进入不同的后续结算。</p>
      <p>时间推进、关系变化、地点开放、个人成长和结局都由游戏状态机决定，模型不能直接修改这些状态。</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">内容</p>
    <div class="project-section__content">
      <h2>一周里的校园</h2>
      <p>当前版本包含 33 个剧情事件、5 条角色个人线、5 条专属关系结局、17 个地图大区、35 个可玩场景和 70 个地点行动。第一周结束后不会强制封档，完成主线收束后仍可继续游玩。</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">对话</p>
    <div class="project-section__content">
      <h2>LLM 是可选项，不是规则引擎</h2>
      <p>不配置 API Key 时，离线对话会结合角色性格、当前关系和守约记录处理常见意图，完整主线仍然可以通关。接入 OpenAI-compatible API 后，自由对话会更开放。</p>
      <p>模型只组织角色台词，不能推进时间、修改关系或决定结局；请求失败时会自动回退到离线对话。</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">实现</p>
    <div class="project-section__content">
      <h2>一个可验证的本地游戏</h2>
      <p>当前主线是 Django 模块化单体：浏览器界面通过 8 个 JSON 接口连接游戏状态机，世界和剧情数据集中维护，进度保存在本地 JSON 文件中。</p>
      <p>43 项测试覆盖七日流程、地点开放、关系门槛、承诺与爽约、条件选项、角色结局、离线对话、旧存档迁移和主线可达性。</p>
      <p><code>main</code> 是当前七日 RPG；旧版多 Agent 仿真和认知循环实现保留在 <code>legacy</code> 分支。</p>
      <p><a class="studio-text-link" href="https://github.com/jywang001/OpenGame">打开 GitHub <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></p>
    </div>
  </section>
</div>

<div class="lang-content" data-lang-content="en">
  <section class="project-section">
    <p class="project-section__label">THE GAME</p>
    <div class="project-section__content">
      <h2>The first week lasts seven days</h2>
      <p>The player is a new transfer student at Green Garden High School. Free time is limited, and each time slot allows one key action: visit a place, handle an event, or spend time talking with someone.</p>
      <p>Several things often happen at once, so one playthrough cannot cover every character route. Whom the player meets, whom they miss, and what they promise all return later in the story.</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">STATE</p>
    <div class="project-section__content">
      <h2>Relationships are more than one score</h2>
      <p>The game tracks familiarity, trust, affection, respect, and tension separately, alongside recent memories, story threads, and promises that occupy future time slots. Showing up, declining early, and breaking a promise lead to different outcomes.</p>
      <p>Time, relationships, location access, player growth, and endings are all resolved by the game state machine. A model cannot modify them directly.</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">CONTENT</p>
    <div class="project-section__content">
      <h2>A campus contained in one week</h2>
      <p>The current version contains 33 story events, five character routes, five relationship endings, 17 map regions, 35 playable scenes, and 70 location actions. Finishing the main story does not lock the save; the campus remains playable afterward.</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">DIALOGUE</p>
    <div class="project-section__content">
      <h2>The LLM is optional, not the rules engine</h2>
      <p>Without an API key, offline dialogue handles common intents using character traits, the current relationship, and promise history, and the full story remains playable. An OpenAI-compatible API can be added for broader free-form conversation.</p>
      <p>The model only writes dialogue. It cannot advance time, alter relationships, or choose an ending, and failed requests fall back to the offline path.</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">THE BUILD</p>
    <div class="project-section__content">
      <h2>A local game that can be checked end to end</h2>
      <p>The current mainline is a modular Django monolith. The browser talks to the game state machine through eight JSON endpoints, world and story content stay in one data module, and progress is stored in a local JSON file.</p>
      <p>Forty-three tests cover the seven-day flow, location access, relationship gates, promises, conditional choices, character endings, offline dialogue, save migration, and reachability of the main ending.</p>
      <p><code>main</code> contains the current seven-day RPG; the earlier multi-agent simulation and cognitive loop remain available on the <code>legacy</code> branch.</p>
      <p><a class="studio-text-link" href="https://github.com/jywang001/OpenGame">Open GitHub <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a></p>
    </div>
  </section>
</div>
