---
title: "Lyuyuan AI"
title_en: "Lyuyuan AI"
title_zh: "Lyuyuan AI"
excerpt: "A public historical prototype for an LLM-driven narrative RPG with multi-character dialogue, relationship state, event bus logging, APIs, tests, and lightweight saves<br/><img src='/images/lyuyuan_ai_preview.png' style='max-width: 500px;'>"
excerpt_en: "A public historical prototype for an LLM-driven narrative RPG with multi-character dialogue, relationship state, event bus logging, APIs, tests, and lightweight saves<br/><img src='/images/lyuyuan_ai_preview.png' style='max-width: 500px;'>"
excerpt_zh: "公开历史原型：LLM 驱动的轻叙事 RPG，包含多角色对话、关系状态、事件总线日志、API、测试和轻量存档<br/><img src='/images/lyuyuan_ai_preview.png' style='max-width: 500px;'>"
collection: portfolio
order: 3
---

<div class="lang-content" data-lang-content="en" markdown="1">

## Lyuyuan AI

**Status:** public historical prototype.

**One-line positioning:** an LLM-driven narrative RPG prototype where characters speak, remember relationship state, and trigger events that can be saved and inspected.

![Lyuyuan AI preview](/images/lyuyuan_ai_preview.png)

### Why

I built this as a product-shaped agent prototype: instead of a one-off chat demo, I wanted characters, relationship state, events, saves, and a UI that could support repeated interaction.

### What I Built

- Multiple selectable AI characters with distinct persona prompts.
- A two-channel response pattern: character-facing reply plus internal analysis JSON.
- Relationship, emotion, and event-state updates across turns.
- Event bus architecture for logs, statistics, achievements, and lifecycle events.
- JSON save slots, API routes, tests, and a Flask-based web UI.

### Hard Parts

- Keeping character dialogue expressive while extracting structured internal state reliably.
- Separating story events, relationship updates, logging, and UI actions so the prototype could grow without turning into one large callback chain.

### Evidence

- [GitHub repository](https://github.com/jywang001/Lyuyuan_AI)
- Public repo includes API/design notes, tests, version history, character configuration, and save/load behavior.

### Result / Lesson

The project taught me that narrative agents need boring infrastructure: state schemas, events, logs, and save files. Without those, good dialogue is hard to debug or improve over time.

</div>

<div class="lang-content" data-lang-content="zh" markdown="1">

## Lyuyuan AI

**状态：**公开历史原型。

**一句话定位：**一个 LLM 驱动的叙事 RPG 原型，角色可以对话、维护关系状态，并触发可保存、可检查的事件。

![Lyuyuan AI 预览](/images/lyuyuan_ai_preview.png)

### Why

我把它当成一个产品形态的 agent 原型来做：不只是一次性聊天 demo，而是希望有角色、关系状态、事件、存档和可以反复交互的 UI。

### What I Built

- 多个可选 AI 角色，每个角色有独立 persona prompt。
- 双通道响应模式：面向玩家的角色回复，以及内部分析 JSON。
- 跨回合维护关系、情绪和事件状态。
- 事件总线架构支持日志、统计、成就和生命周期事件。
- JSON 存档槽、API routes、测试和 Flask Web UI。

### Hard Parts

- 在保持角色回复自然的同时，稳定抽取结构化内部状态。
- 把剧情事件、关系更新、日志和 UI 行为拆开，避免原型膨胀成一个巨大的回调链。

### Evidence

- [GitHub 仓库](https://github.com/jywang001/Lyuyuan_AI)
- 公开仓库包含 API/设计说明、测试、版本历史、角色配置和存档逻辑。

### Result / Lesson

这个项目让我意识到 narrative agents 很需要“无聊但重要”的基础设施：状态 schema、事件、日志和存档。没有这些，再好的对话也很难调试或长期改进。

</div>
