---
title: "Texas-Poker-Agents"
title_en: "Texas-Poker-Agents"
title_zh: "Texas-Poker-Agents"
excerpt: "A local Texas Hold'em table where one human plays against multiple LLM agents, with a Node.js rules engine, logs, table talk, and replay support"
excerpt_en: "A local Texas Hold'em table where one human plays against multiple LLM agents, with a Node.js rules engine, logs, table talk, and replay support"
excerpt_zh: "一个本地网页版德州扑克实验台：真人玩家对战多个 LLM 玩家，Node.js 服务端负责规则、日志、牌桌话和复盘"
collection: portfolio
order: 1
---

<div class="lang-content" data-lang-content="en" markdown="1">

## Texas-Poker-Agents

Texas-Poker-Agents is a local Texas Hold'em lab for one human player and multiple LLM agents. The server owns all game mechanics: shuffling, dealing, legal action validation, side pots, showdown, match flow, and persistent hand logs. LLMs only choose actions from their visible information.

### Highlights
- One human player can play no-limit Texas Hold'em against multiple LLM seats.
- Each LLM seat can use its own model and playing-style prompt.
- The table records public actions, table talk, fallback decisions, and full hand history.
- Host-only god view supports card inspection, reasoning summaries, and post-hand review.
- Engine tests cover hand evaluation, side pots, all-in run-it-multiple-times settlement, blinds, fallback behavior, and table-talk filtering.

### Stack
- JavaScript
- Node.js
- Server-sent events
- Browser UI
- OpenAI-compatible chat completions

### Repository
[View on GitHub](https://github.com/jywang001/Texas-Poker-Agents)

</div>

<div class="lang-content" data-lang-content="zh" markdown="1">

## Texas-Poker-Agents

Texas-Poker-Agents 是一个本地网页版德州扑克实验台：一名真人玩家和多个 LLM 玩家坐在同一张桌上。服务端负责洗牌、发牌、合法行动校验、边池、摊牌、比赛推进和完整日志；模型只在自己的可见信息范围内选择行动。

### 亮点
- 支持真人玩家对战多个 LLM 座位的无限注 Texas Hold'em。
- 每个 LLM 座位可以配置独立模型和牌风 prompt。
- 自动记录公开行动、table talk、fallback 决策和完整牌局历史。
- 房主可开启上帝视角，查看暗牌、reasoning summary 和每手复盘。
- 引擎测试覆盖牌型评估、边池、全下多次发牌、盲注、fallback 行为和牌桌话过滤。

### 技术栈
- JavaScript
- Node.js
- Server-sent events
- 浏览器 UI
- OpenAI-compatible chat completions

### 仓库
[View on GitHub](https://github.com/jywang001/Texas-Poker-Agents)

</div>
