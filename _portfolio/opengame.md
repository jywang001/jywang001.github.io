---
title: "OpenGame"
title_en: "OpenGame"
title_zh: "OpenGame"
excerpt: "A private multi-agent simulation project where AI characters live in a school world with personas, memory, relationships, dialogue, and replayable events"
excerpt_en: "A private multi-agent simulation project where AI characters live in a school world with personas, memory, relationships, dialogue, and replayable events"
excerpt_zh: "一个私有多智能体仿真项目：AI 角色在校园世界中拥有完整人设、记忆、关系、对话和可回放事件"
collection: portfolio
order: 3
---

<div class="lang-content" data-lang-content="en" markdown="1">

## OpenGame

OpenGame is a private multi-agent simulation project built around a school-world setting. AI characters have personas, memory, social relationships, locations, dialogue, and event histories. The player can talk with characters, and conversations can affect later memory and relationship state.

### Highlights
- Multi-agent simulation with character personas, memory, social relationships, and planned actions.
- Player dialogue is bridged back into the simulation so conversation changes future behavior.
- Visual pages include character overview, relationship graph, school map, character state, and memory panels.
- A headless simulation runner can advance the world without the frontend.
- Events are persisted as JSONL for replay and inspection.

### Stack
- Python
- Django
- LLM abstraction layer for OpenAI-compatible providers
- File-system JSON storage and SQLite indexing
- Canvas/SVG visualizations

### Repository
Private GitHub repository.

</div>

<div class="lang-content" data-lang-content="zh" markdown="1">

## OpenGame

OpenGame 是一个私有多智能体仿真项目，核心是一个校园世界。AI 角色拥有完整人设、记忆、社交关系、位置、对话和事件历史；玩家可以与角色对话，对话会影响后续记忆与关系状态。

### 亮点
- 多智能体仿真：角色具有人设、记忆、社交关系和行动规划。
- 玩家对话会桥接回仿真系统，影响角色后续行为。
- 前端包含角色总览、关系图、校园地图、角色状态和记忆面板。
- 支持无头仿真运行器，不依赖前端也能推进世界。
- 事件以 JSONL 持久化，便于回放与检查。

### 技术栈
- Python
- Django
- OpenAI-compatible LLM 抽象层
- 文件系统 JSON 存储与 SQLite 索引
- Canvas/SVG 可视化

### 仓库
私有 GitHub 仓库。

</div>
