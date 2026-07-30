---
layout: studio-project
title: "Texas-Poker-Agents"
title_en: "Texas-Poker-Agents"
title_zh: "Texas-Poker-Agents"
number: "02"
label_en: "Multi-agent game · local experiment"
label_zh: "多 Agent 博弈 · 本地实验"
lead_en: "A complete, locally runnable multiplayer LLM poker system and a testbed for behavior in imperfect-information games."
lead_zh: "一个完整、可本地运行的多人 LLM 德州扑克系统，也可以作为研究不完美信息博弈中模型行为的实验环境。"
status_en: "Public repository · actively evolving"
status_zh: "公开仓库 · 仍在迭代"
stack: "Node.js · SSE · JSONL · OpenAI-compatible APIs"
repository: "https://github.com/jywang001/Texas-Poker-Agents"
visual: "poker"
collection: portfolio
order: 2
---

<div class="lang-content" data-lang-content="zh">
  <section class="project-section">
    <p class="project-section__label">起点</p>
    <div class="project-section__content">
      <h2>这不是一个“让 LLM 打扑克”的单点 demo</h2>
      <p>真正让我感兴趣的是不完美信息：一个座位不应该看到别人的手牌、未来公共牌或服务端调试信息。只要这条边界没守住，后面的策略分析都没有意义。</p>
      <p>所以模型不负责发牌和计分。它只收到该座位的可见状态，返回一次动作建议。</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">牌桌</p>
    <div class="project-section__content">
      <h2>规则引擎说了算，模型不能改牌局</h2>
      <p>Node 服务端负责洗牌、发牌、合法动作、盲注、边池、all-in、摊牌和比赛推进。页面支持一名真人和多个 LLM 座位，每个座位可以单独设置模型和牌风 prompt。</p>
      <p>模型返回非法 JSON、超出筹码的下注或不可用动作时，服务端会标出 fallback，并选择 check / fold 托管，不让整桌卡死。</p>
      <div class="project-code">rules engine → seat-visible state → LLM proposal → legality check → game state</div>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">复盘</p>
    <div class="project-section__content">
      <h2>每手牌都要留下能看的记录</h2>
      <p>所有事件会追加写入 <code>data/sessions/*.jsonl</code>，也能从页面导出 JSON。房主可以在牌后打开 god view，看暗牌、简短 reasoning summary、fallback 和 hand reflection。</p>
      <p>引擎测试覆盖牌型、边池、run-it 多次结算、heads-up 行动顺序、盲注翻倍、table-talk 暗牌过滤和筹码守恒。</p>
      <p class="project-quote">对 Agent 行为的信任，应该从信息边界、合法性检查和日志开始，而不是从一段看起来聪明的推理开始。</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">运行</p>
    <div class="project-section__content">
      <h2>本地开桌</h2>
      <p>项目只依赖 Node.js 20+ 和内置模块，不需要数据库。没有 API key 时 LLM 座位仍可参与流程，但会使用服务端 fallback。</p>
      <div class="project-code">npm start
# open http://127.0.0.1:3000
npm run check</div>
    </div>
  </section>
</div>

<div class="lang-content" data-lang-content="en">
  <section class="project-section">
    <p class="project-section__label">THE START</p>
    <div class="project-section__content">
      <h2>More than a one-shot “LLM plays poker” demo</h2>
      <p>The interesting part is imperfect information. A seat must not see another player's cards, future community cards, or server-only debug state. If that boundary fails, any strategy analysis afterward is meaningless.</p>
      <p>The model therefore owns neither the deck nor the score. It receives a seat-visible state and returns one proposed action.</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">THE TABLE</p>
    <div class="project-section__content">
      <h2>The rules engine is authoritative</h2>
      <p>The Node server owns shuffling, dealing, legal actions, blinds, side pots, all-ins, showdown, and match flow. One human can share the table with several LLM seats, each with its own model and style prompt.</p>
      <p>If a model returns broken JSON, an impossible bet, or an illegal action, the server marks the fallback and chooses check or fold instead of freezing the table.</p>
      <div class="project-code">rules engine → seat-visible state → LLM proposal → legality check → game state</div>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">THE REVIEW</p>
    <div class="project-section__content">
      <h2>Every hand leaves a useful trail</h2>
      <p>Events append to <code>data/sessions/*.jsonl</code> and can also be exported from the page. After a hand, the host can open a god view for hole cards, short reasoning summaries, fallbacks, and hand reflections.</p>
      <p>Engine tests cover hand ranking, side pots, run-it-multiple-times settlement, heads-up action order, blind increases, table-talk filtering, and chip conservation.</p>
      <p class="project-quote">Trust in an agent should begin with information boundaries, legality checks, and logs, not with a convincing paragraph of reasoning.</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">RUN IT</p>
    <div class="project-section__content">
      <h2>Start a local table</h2>
      <p>The project needs Node.js 20+ and uses only built-in modules, with no database. Without an API key, LLM seats still participate through the server fallback.</p>
      <div class="project-code">npm start
# open http://127.0.0.1:3000
npm run check</div>
    </div>
  </section>
</div>
