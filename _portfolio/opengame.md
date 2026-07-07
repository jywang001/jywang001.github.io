---
title: "OpenGame"
title_en: "OpenGame"
title_zh: "OpenGame"
excerpt: "Private prototype, public summary only: a multi-agent school-world simulation with personas, memory, relationships, dialogue, locations, and replayable JSONL events"
excerpt_en: "Private prototype, public summary only: a multi-agent school-world simulation with personas, memory, relationships, dialogue, locations, and replayable JSONL events"
excerpt_zh: "私有原型，仅公开高层总结：多智能体校园世界仿真，包含人设、记忆、关系、对话、位置和可回放 JSONL 事件"
collection: portfolio
order: 4
---

<div class="lang-content" data-lang-content="en" markdown="1">

## OpenGame

**Status:** private prototype; public summary only.

**One-line positioning:** a multi-agent school-world simulation where AI characters have personas, memory, social relationships, locations, dialogue, and event histories.

### Why

I wanted to push beyond isolated character chat and test what happens when many agents share a persistent world: conversations should affect memory, relationship state, and later behavior.

### What I Built

- Character personas, memory records, social relationships, planned actions, and location state.
- Player dialogue that bridges back into the simulation so conversations can change future behavior.
- Visual pages for character overview, relationship graph, school map, character state, and memory panels.
- A headless simulation runner that can advance the world without the frontend.
- JSONL event persistence for replay and inspection.

### Hard Parts

- Keeping simulation state inspectable while many agents update memory, relationships, and planned actions.
- Designing event logs that are useful for replay instead of only useful for debugging crashes.

### Evidence

- Private repository.
- Publicly shareable artifact is this summary; implementation details and screenshots are kept private for now.

### Result / Lesson

OpenGame is the broader systems version of the same interest behind Lyuyuan AI: agents become more useful when their actions are persistent, inspectable, and replayable.

</div>

<div class="lang-content" data-lang-content="zh" markdown="1">

## OpenGame

**状态：**私有原型；仅公开高层总结。

**一句话定位：**一个多智能体校园世界仿真，AI 角色拥有人设、记忆、社交关系、位置、对话和事件历史。

### Why

我想从单个角色聊天往前走一步，测试多个 agent 共享持久世界时会发生什么：对话应该影响记忆、关系状态和后续行为。

### What I Built

- 角色人设、记忆记录、社交关系、行动计划和位置状态。
- 玩家对话会桥接回仿真系统，影响角色之后的行为。
- 可视化页面包括角色总览、关系图、校园地图、角色状态和记忆面板。
- 无头仿真运行器可以不依赖前端推进世界。
- 使用 JSONL 持久化事件，便于回放和检查。

### Hard Parts

- 在多个 agent 同时更新记忆、关系和行动计划时，保持仿真状态可检查。
- 设计真正能用于复盘的事件日志，而不只是崩溃时的 debug 日志。

### Evidence

- 私有仓库。
- 目前可公开的材料是这份总结；实现细节和截图暂不公开。

### Result / Lesson

OpenGame 是 Lyuyuan AI 背后同一兴趣的更系统版本：agent 的行动如果能持久化、可检查、可复盘，就会更接近可研究的对象。

</div>
