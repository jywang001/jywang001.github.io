---
layout: studio
permalink: /
title: "Junyang Wang"
title_en: "Home"
title_zh: "主页"
page_class: home
sitemap: true
redirect_from:
  - /about/
  - /about.html
---

<section class="home-stage">
  <div class="home-stage__inner">
    <div class="home-stage__copy lang-content" data-lang-content="zh">
      <p class="studio-eyebrow">王俊阳 · 北京大学计算机本科</p>
      <h1 id="home-title">王俊阳</h1>
      <p class="home-stage__lead">在北大读计算机。最近主要做具身模型的后训练与评测，也会自己搭 Agent、小工具和游戏原型。</p>
      <p class="home-stage__note">这个网站只放我真正做过、还愿意继续讲的东西。</p>
      <div class="home-stage__links">
        <a class="studio-text-link" href="/projects/">
          <span>看项目</span>
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </a>
        <a class="studio-text-link" href="https://github.com/jywang001">
          <span>GitHub</span>
          <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>
        <a class="studio-text-link" href="mailto:junyangwang@stu.pku.edu.cn">
          <span>给我写信</span>
          <i class="fa-solid fa-envelope" aria-hidden="true"></i>
        </a>
      </div>
    </div>

    <div class="home-stage__copy lang-content" data-lang-content="en">
      <p class="studio-eyebrow">Junyang Wang · PKU Computer Science</p>
      <h1 id="home-title-en">Junyang Wang</h1>
      <p class="home-stage__lead">I study computer science at Peking University. Lately I have been working on post-training and evaluation for embodied models, alongside agent systems, small tools, and game prototypes.</p>
      <p class="home-stage__note">This site is a small record of things I actually built and still want to talk about.</p>
      <div class="home-stage__links">
        <a class="studio-text-link" href="/projects/">
          <span>See my work</span>
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </a>
        <a class="studio-text-link" href="https://github.com/jywang001">
          <span>GitHub</span>
          <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>
        <a class="studio-text-link" href="mailto:junyangwang@stu.pku.edu.cn">
          <span>Email me</span>
          <i class="fa-solid fa-envelope" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </div>
  <p class="home-stage__caption">Beijing, 2026</p>
</section>

<section class="studio-band studio-band--surface">
  <div class="studio-container">
    <div class="home-now lang-content" data-lang-content="zh">
      <div>
        <p class="studio-eyebrow">NOW / 现在</p>
        <h2 class="home-now__title">最近在做什么</h2>
      </div>
      <div class="home-now__copy">
        <p>我现在在北大前沿计算研究中心参与具身模型的 post-training。具体到日常，就是清机器人数据、做 SFT / CoT 样本、筛 RL 数据、跑评测，再回头看模型到底错在哪。</p>
        <p>我越来越觉得，这类工作的重点不只是把分数做高，而是把一次失败说清楚：数据从哪里来，模型在哪一步偏了，下一轮实验为什么值得跑。</p>
      </div>
      <aside class="home-now__aside">
        <p><strong>北京大学</strong><br>计算机科学与技术（拔尖班）</p>
        <p><strong>2024 — 2028</strong><br>本科在读</p>
        <p><strong>兴趣</strong><br>具身智能、后训练、可检查的 Agent 系统</p>
      </aside>
    </div>

    <div class="home-now lang-content" data-lang-content="en">
      <div>
        <p class="studio-eyebrow">NOW</p>
        <h2 class="home-now__title">What I am working on</h2>
      </div>
      <div class="home-now__copy">
        <p>I currently work on post-training for embodied models at PKU's Center for Frontier Computing Research. The day-to-day work is concrete: clean robot data, build SFT and CoT examples, filter RL data, run evaluations, then trace where the model went wrong.</p>
        <p>I have come to care as much about explaining a failure as improving a score: where the data came from, where the model drifted, and why the next experiment is worth running.</p>
      </div>
      <aside class="home-now__aside">
        <p><strong>Peking University</strong><br>Computer Science, Elite Program</p>
        <p><strong>2024 — 2028</strong><br>Undergraduate</p>
        <p><strong>Interests</strong><br>Embodied AI, post-training, inspectable agents</p>
      </aside>
    </div>
  </div>
</section>

<section class="studio-band">
  <div class="studio-container">
    <div class="studio-section-heading">
      <p class="studio-eyebrow">
        <span class="lang-inline" data-lang-content="zh">SELECTED WORK / 项目</span>
        <span class="lang-inline" data-lang-content="en">SELECTED WORK</span>
      </p>
      <h2 class="lang-content" data-lang-content="zh">三件我愿意拿出来细讲的东西。</h2>
      <h2 class="lang-content" data-lang-content="en">Three things I would rather explain than pitch.</h2>
    </div>

    <article class="featured-project">
      <div class="featured-project__visual">
        <img class="featured-project__image featured-project__image--curve" src="/images/critpt-rl-curves.png" alt="CritPT-RL training curves">
      </div>
      <div class="featured-project__copy">
        <p class="studio-eyebrow">01 · RL POST-TRAINING</p>
        <h3>CritPT-RL</h3>
        <div class="lang-content" data-lang-content="zh">
          <p class="featured-project__hook">训练曲线很好看，官方分数没动。这比“又涨了几个点”更值得写清楚。</p>
          <p class="featured-project__text">我搭了从数据生成、GRPO、reward 到 official-style eval 的完整流程。后来的模型确实更会写规整的 <code>answer()</code>，但 official70 没有提高。这个项目现在主要记录 reward 和真正评测目标是怎样错位的。</p>
        </div>
        <div class="lang-content" data-lang-content="en">
          <p class="featured-project__hook">The training curves looked good. The official score did not move. That was the result worth writing down.</p>
          <p class="featured-project__text">I built the loop from data generation and GRPO to rewards and official-style evaluation. Later checkpoints produced cleaner <code>answer()</code> functions, but official70 accuracy stayed flat. The project is now a record of how a reward can miss the thing it claims to measure.</p>
        </div>
        <div class="featured-project__links">
          <a class="studio-text-link" href="/portfolio/critpt-rl/">
            <span class="lang-inline" data-lang-content="zh">看实验记录</span>
            <span class="lang-inline" data-lang-content="en">Read the experiment</span>
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </a>
          <a class="studio-text-link" href="https://github.com/jywang001/CritPT-RL">
            <span>GitHub</span>
            <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </article>

    <article class="featured-project featured-project--reverse">
      <div class="featured-project__visual">
        <div class="poker-visual" role="img" aria-label="A stylized four-player LLM poker table">
          <div class="poker-table">
            <div class="poker-board" aria-hidden="true">
              <span class="playing-card">A♠</span>
              <span class="playing-card playing-card--red">9♥</span>
              <span class="playing-card">7♣</span>
              <span class="playing-card playing-card--red">Q♦</span>
            </div>
            <span class="poker-pot">POT 240</span>
            <span class="poker-seat poker-seat--top">Qwen · check</span>
            <span class="poker-seat poker-seat--right">GPT · call</span>
            <span class="poker-seat poker-seat--bottom">YOU · action</span>
            <span class="poker-seat poker-seat--left">Claude · raise</span>
          </div>
          <div class="poker-log" aria-hidden="true">
            <span>VISIBLE STATE ONLY</span>
            <span>HAND #0042 · LOGGED</span>
          </div>
        </div>
      </div>
      <div class="featured-project__copy">
        <p class="studio-eyebrow">02 · MULTI-AGENT GAME</p>
        <h3>Texas-Poker-Agents</h3>
        <div class="lang-content" data-lang-content="zh">
          <p class="featured-project__hook">让几个 LLM 坐上同一张牌桌，最先要解决的不是策略，而是别让它们偷看牌。</p>
          <p class="featured-project__text">Node 规则引擎负责发牌、下注、边池和结算；模型只能看到自己座位应当看到的信息。非法动作会被托管，整手牌会写进 JSONL，结束后还能开上帝视角复盘。</p>
        </div>
        <div class="lang-content" data-lang-content="en">
          <p class="featured-project__hook">Put several LLMs at one poker table and the first problem is not strategy. It is stopping them from seeing the wrong cards.</p>
          <p class="featured-project__text">A Node rules engine owns the deck, betting, side pots, and settlement. Each model sees only its seat's legal view. Bad actions fall back safely, every hand is logged to JSONL, and a host view makes the hand reviewable afterward.</p>
        </div>
        <div class="featured-project__links">
          <a class="studio-text-link" href="/portfolio/texas-poker-agents/">
            <span class="lang-inline" data-lang-content="zh">看牌桌怎么搭</span>
            <span class="lang-inline" data-lang-content="en">See how the table works</span>
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </a>
          <a class="studio-text-link" href="https://github.com/jywang001/Texas-Poker-Agents">
            <span>GitHub</span>
            <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </article>

    <article class="featured-project">
      <div class="featured-project__visual">
        <img class="featured-project__image" src="/images/lyuyuan_ai_preview.png" alt="Green Garden High School Story interface">
      </div>
      <div class="featured-project__copy">
        <p class="studio-eyebrow">03 · NARRATIVE AGENTS</p>
        <h3>绿园中学物语</h3>
        <div class="lang-content" data-lang-content="zh">
          <p class="featured-project__hook">这是我比较早的 Agent 原型，也是一段很具体的“先做出来再说”。</p>
          <p class="featured-project__text">五个角色、关系和情绪状态、双通道 LLM 输出、事件总线和存档都在一个 Flask 小游戏里。现在看它并不精致，但它让我第一次认真处理角色状态、日志和长期交互，而不是只做一轮聊天。</p>
        </div>
        <div class="lang-content" data-lang-content="en">
          <p class="featured-project__hook">An early agent prototype, built before I knew exactly what I was trying to learn from it.</p>
          <p class="featured-project__text">Five characters, relationship and mood state, two-channel LLM output, an event bus, and save files all live inside a small Flask game. It is rough, but it was the first time I treated character state and long-running interaction as a system instead of a single chat.</p>
        </div>
        <div class="featured-project__links">
          <a class="studio-text-link" href="/portfolio/lyuyuan-ai/">
            <span class="lang-inline" data-lang-content="zh">看这个旧原型</span>
            <span class="lang-inline" data-lang-content="en">Open the old prototype</span>
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </a>
          <a class="studio-text-link" href="https://github.com/jywang001/Lyuyuan_AI">
            <span>GitHub</span>
            <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </article>
  </div>
</section>

<section class="studio-band studio-band--ink">
  <div class="studio-container home-more">
    <div>
      <p class="studio-eyebrow">
        <span class="lang-inline" data-lang-content="zh">ELSEWHERE / 其他</span>
        <span class="lang-inline" data-lang-content="en">ELSEWHERE</span>
      </p>
      <h2 class="lang-content" data-lang-content="zh">还有一些。</h2>
      <h2 class="lang-content" data-lang-content="en">A few more.</h2>
    </div>

    <div class="home-more__list lang-content" data-lang-content="zh">
      <a class="home-more__item" href="/portfolio/mini-lisp/">
        <strong>Mini-Lisp</strong>
        <span>C++ 写的解释器：parser、闭包、宏和一个能用的 REPL。</span>
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </a>
      <a class="home-more__item" href="/portfolio/opengame/">
        <strong>OpenGame</strong>
        <span>多人校园世界模拟，角色有记忆、关系、位置和可回放事件。</span>
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </a>
      <a class="home-more__item" href="/cv/">
        <strong>经历</strong>
        <span>科研轮转、现在的研究工作，以及我真正用过的工具。</span>
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </a>
    </div>

    <div class="home-more__list lang-content" data-lang-content="en">
      <a class="home-more__item" href="/portfolio/mini-lisp/">
        <strong>Mini-Lisp</strong>
        <span>A C++ interpreter with a parser, closures, macros, and a usable REPL.</span>
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </a>
      <a class="home-more__item" href="/portfolio/opengame/">
        <strong>OpenGame</strong>
        <span>A multi-agent school world with memory, relationships, locations, and replayable events.</span>
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </a>
      <a class="home-more__item" href="/cv/">
        <strong>Experience</strong>
        <span>Research rotations, current work, and tools I have actually used.</span>
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </a>
    </div>
  </div>
</section>
