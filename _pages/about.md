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
      <p class="studio-eyebrow">北京大学 · 计算机科学与技术 · 2024—2028</p>
      <h1 id="home-title">王俊阳</h1>
      <p class="home-stage__lead">目前主要做 RL for LLM / VLA Systems，也关注 Coding Agent、AI Self-Training 和 AI Infrastructure。</p>
      <div class="home-stage__contacts" aria-label="联系方式与社交账号">
        <a class="home-contact" href="https://github.com/jywang001" rel="me">
          <i class="fa-brands fa-github" aria-hidden="true"></i>
          <span>GitHub · jywang001</span>
        </a>
        <a class="home-contact" href="https://www.xiaohongshu.com/user/profile/68f1e9250000000037007360" rel="me">
          <i class="fa-solid fa-book-open" aria-hidden="true"></i>
          <span>小红书 · JY君</span>
        </a>
        <span class="home-contact">
          <i class="fa-brands fa-weixin" aria-hidden="true"></i>
          <span>微信 · jywang_1</span>
        </span>
        <span class="home-contact home-contact--email">
          <i class="fa-solid fa-envelope" aria-hidden="true"></i>
          <span>junyangwang [at] stu [dot] pku [dot] edu [dot] cn</span>
        </span>
      </div>
    </div>

    <div class="home-stage__copy lang-content" data-lang-content="en">
      <p class="studio-eyebrow">Peking University · Computer Science · 2024—2028</p>
      <h1 id="home-title-en">Junyang Wang</h1>
      <p class="home-stage__lead">I work mainly on RL for LLM and VLA systems, with broader interests in coding agents, AI self-training, and AI infrastructure.</p>
      <div class="home-stage__contacts" aria-label="Contact and social accounts">
        <a class="home-contact" href="https://github.com/jywang001" rel="me">
          <i class="fa-brands fa-github" aria-hidden="true"></i>
          <span>GitHub · jywang001</span>
        </a>
        <a class="home-contact" href="https://www.xiaohongshu.com/user/profile/68f1e9250000000037007360" rel="me">
          <i class="fa-solid fa-book-open" aria-hidden="true"></i>
          <span>Xiaohongshu · JY君</span>
        </a>
        <span class="home-contact">
          <i class="fa-brands fa-weixin" aria-hidden="true"></i>
          <span>WeChat · jywang_1</span>
        </span>
        <span class="home-contact home-contact--email">
          <i class="fa-solid fa-envelope" aria-hidden="true"></i>
          <span>junyangwang [at] stu [dot] pku [dot] edu [dot] cn</span>
        </span>
      </div>
    </div>
  </div>
  <p class="home-stage__caption">Beijing, 2026</p>
</section>

<section class="studio-band">
  <div class="studio-container">
    <div class="studio-section-heading">
      <p class="studio-eyebrow">
        <span class="lang-inline" data-lang-content="zh">SELECTED PROJECTS / 项目</span>
        <span class="lang-inline" data-lang-content="en">SELECTED PROJECTS</span>
      </p>
      <h2 class="lang-content" data-lang-content="zh">我做过的几个项目。</h2>
      <h2 class="lang-content" data-lang-content="en">A few projects I have worked on.</h2>
    </div>

    <article class="featured-project">
      <div class="featured-project__visual">
        <img class="featured-project__image featured-project__image--curve" src="/images/critpt-rl-curves.png" alt="CritPT-RL training curves">
      </div>
      <div class="featured-project__copy">
        <p class="studio-eyebrow">01 · RL POST-TRAINING</p>
        <h3>CritPT-RL</h3>
        <div class="lang-content" data-lang-content="zh">
          <p class="featured-project__hook">一套完整的 RL post-training 流程。</p>
          <p class="featured-project__text">面向 scientific coding tasks，覆盖数据生成、reward 设计、GRPO 训练、checkpoint evaluation 和 official-style evaluation。</p>
        </div>
        <div class="lang-content" data-lang-content="en">
          <p class="featured-project__hook">A complete RL post-training pipeline.</p>
          <p class="featured-project__text">Built for scientific coding tasks, covering data generation, reward design, GRPO training, checkpoint evaluation, and official-style evaluation.</p>
        </div>
        <div class="featured-project__links">
          <a class="studio-text-link" href="/portfolio/critpt-rl/">
            <span class="lang-inline" data-lang-content="zh">查看项目</span>
            <span class="lang-inline" data-lang-content="en">View project</span>
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
          <p class="featured-project__hook">一个完整、可本地运行的多人 LLM 德州扑克系统。</p>
          <p class="featured-project__text">支持真人与多个 LLM 同桌对局，包含独立规则引擎、合法动作校验、牌局日志和复盘功能；也可以用来研究 LLM 在不完美信息博弈中的行为。</p>
        </div>
        <div class="lang-content" data-lang-content="en">
          <p class="featured-project__hook">A complete, locally runnable multiplayer LLM poker system.</p>
          <p class="featured-project__text">It supports one human and several LLM players, with a dedicated rules engine, legal-action validation, hand histories, and post-game review. It can also serve as a testbed for LLM behavior in imperfect-information games.</p>
        </div>
        <div class="featured-project__links">
          <a class="studio-text-link" href="/portfolio/texas-poker-agents/">
            <span class="lang-inline" data-lang-content="zh">查看项目</span>
            <span class="lang-inline" data-lang-content="en">View project</span>
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
        <div class="social-copilot-visual">
          <img src="/images/social-copilot-home.png" alt="Social Copilot home screen">
          <img src="/images/social-copilot-result.png" alt="Social Copilot reply suggestions">
        </div>
      </div>
      <div class="featured-project__copy">
        <p class="studio-eyebrow">03 · IOS PRODUCT</p>
        <h3>Social Copilot</h3>
        <div class="lang-content" data-lang-content="zh">
          <p class="featured-project__hook">一个可运行的完整 MVP，正在准备上架。</p>
          <p class="featured-project__text">面向具体关系和具体对话的 iOS 沟通辅助工具。用户可以输入、口述或从聊天截图中提取消息，App 会结合联系人关系、个人表达习惯和可编辑记忆，给出三种回复建议；AI 只提供建议，不读取、也不代发消息。</p>
        </div>
        <div class="lang-content" data-lang-content="en">
          <p class="featured-project__hook">A complete, working MVP currently being prepared for release.</p>
          <p class="featured-project__text">An iOS communication assistant built around a specific relationship and conversation. Users can type, dictate, or extract a message from a screenshot; the app uses contact context, personal preferences, and editable memories to generate three reply suggestions. It never reads or sends messages on the user's behalf.</p>
        </div>
        <div class="featured-project__links">
          <a class="studio-text-link" href="/portfolio/social-copilot/">
            <span class="lang-inline" data-lang-content="zh">查看项目</span>
            <span class="lang-inline" data-lang-content="en">View project</span>
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </a>
          <span class="featured-project__status">SwiftUI · Vision OCR · Speech · Node.js</span>
        </div>
      </div>
    </article>

    <article class="featured-project featured-project--reverse">
      <div class="featured-project__visual">
        <img class="featured-project__image" src="/images/mini_lisp_preview.png" alt="Mini-Lisp interpreter REPL">
      </div>
      <div class="featured-project__copy">
        <p class="studio-eyebrow">04 · COURSE PROJECT</p>
        <h3>Mini-Lisp</h3>
        <div class="lang-content" data-lang-content="zh">
          <p class="featured-project__hook">一门课的大作业，做完觉得还挺酷。</p>
          <p class="featured-project__text">北京大学《软件设计实践》课程项目：使用 C++ 实现的 Mini-Lisp 解释器，支持 tokenizer / parser、词法作用域、闭包、宏、REPL 和脚本执行。</p>
        </div>
        <div class="lang-content" data-lang-content="en">
          <p class="featured-project__hook">A course final project that turned out pretty cool.</p>
          <p class="featured-project__text">Built for PKU's Software Design Practice course: a Mini-Lisp interpreter in C++ with a tokenizer and parser, lexical scoping, closures, macros, a REPL, and script execution.</p>
        </div>
        <div class="featured-project__links">
          <a class="studio-text-link" href="/portfolio/mini-lisp/">
            <span class="lang-inline" data-lang-content="zh">查看项目</span>
            <span class="lang-inline" data-lang-content="en">View project</span>
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </a>
          <a class="studio-text-link" href="https://github.com/jywang001/Mini-Lisp">
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
        <span class="lang-inline" data-lang-content="zh">MORE / 其他</span>
        <span class="lang-inline" data-lang-content="en">MORE</span>
      </p>
      <h2 class="lang-content" data-lang-content="zh">更多。</h2>
      <h2 class="lang-content" data-lang-content="en">More.</h2>
    </div>

    <div class="home-more__list lang-content" data-lang-content="zh">
      <a class="home-more__item" href="/projects/">
        <strong>项目</strong>
        <span>项目页面和更完整的介绍。</span>
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </a>
      <a class="home-more__item" href="/cv/">
        <strong>个人经历</strong>
        <span>教育、研究和实习经历。</span>
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </a>
    </div>

    <div class="home-more__list lang-content" data-lang-content="en">
      <a class="home-more__item" href="/projects/">
        <strong>Projects</strong>
        <span>Project pages with a little more detail.</span>
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </a>
      <a class="home-more__item" href="/cv/">
        <strong>Experience</strong>
        <span>Education, research, and internships.</span>
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </a>
    </div>
  </div>
</section>
