---
layout: studio-project
title: "Mini-Lisp"
title_en: "Mini-Lisp"
title_zh: "Mini-Lisp 解释器"
number: "04"
label_en: "Interpreter · course project"
label_zh: "解释器 · 课程项目"
lead_en: "A small Lisp interpreter in C++ with a parser, lexical scope, closures, macros, a REPL, and script execution."
lead_zh: "一个用 C++ 写的小型 Lisp 解释器，包含 parser、词法作用域、闭包、宏、REPL 和脚本执行。"
status_en: "Public course project · complete"
status_zh: "公开课程项目 · 已完成"
stack: "C++ · CMake"
repository: "https://github.com/jywang001/Mini-Lisp"
image: "/images/mini_lisp_preview.png"
image_alt: "Mini-Lisp interpreter REPL"
collection: portfolio
order: 4
---

<div class="lang-content" data-lang-content="zh">
  <section class="project-section">
    <p class="project-section__label">范围</p>
    <div class="project-section__content">
      <h2>语言很小，但该有的运行时骨架都在</h2>
      <p>这是北大《软件设计实践》的课程项目。解释器支持 REPL 和脚本执行，值类型包括数字、布尔、字符串、符号、pair / list、空表、过程和宏。</p>
      <p>我实现了 tokenizer、parser、带父环境的链式作用域、闭包和特殊形式分派。列表直接由 <code>PairValue</code> 组成，没有借宿主语言的现成 list 偷懒。</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">语言</p>
    <div class="project-section__content">
      <h2>从 <code>define</code> 到 <code>quasiquote</code></h2>
      <p>特殊形式包括 <code>define</code>、<code>lambda</code>、<code>if</code>、<code>begin</code>、<code>let</code>、<code>cond</code>、短路 <code>and/or</code>、引用和简单宏。内建过程覆盖算术、比较、字符串、I/O 和 <code>map/filter/reduce</code>。</p>
      <div class="project-code">(define-macro unless (cond body)
  (quasiquote
    (if (not (unquote cond))
        (begin (unquote body))
        ())))</div>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">边界</p>
    <div class="project-section__content">
      <h2>它仍然只是一个教学用解释器</h2>
      <p>数字统一用 <code>double</code>，没有尾递归优化，错误处理和标准库也很小。把这些边界明确写出来，比假装它接近完整 Scheme 更诚实。</p>
      <p class="project-quote">这个项目最有意思的地方，是把“求值”从一个课堂概念变成了一套自己能逐步跟进去的运行规则。</p>
    </div>
  </section>
</div>

<div class="lang-content" data-lang-content="en">
  <section class="project-section">
    <p class="project-section__label">SCOPE</p>
    <div class="project-section__content">
      <h2>A small language with a real runtime skeleton</h2>
      <p>This was built for PKU's Software Design Practice course. The interpreter supports a REPL and scripts, with numbers, booleans, strings, symbols, pairs and lists, the empty list, procedures, and macros.</p>
      <p>I implemented the tokenizer, parser, parent-linked lexical environments, closures, and special-form dispatch. Lists are built from <code>PairValue</code> rather than borrowed from a host-language list type.</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">THE LANGUAGE</p>
    <div class="project-section__content">
      <h2>From <code>define</code> to <code>quasiquote</code></h2>
      <p>Special forms include <code>define</code>, <code>lambda</code>, <code>if</code>, <code>begin</code>, <code>let</code>, <code>cond</code>, short-circuiting <code>and/or</code>, quoting, and simple macros. Built-ins cover arithmetic, comparison, strings, I/O, and <code>map/filter/reduce</code>.</p>
      <div class="project-code">(define-macro unless (cond body)
  (quasiquote
    (if (not (unquote cond))
        (begin (unquote body))
        ())))</div>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">LIMITS</p>
    <div class="project-section__content">
      <h2>It is still a teaching interpreter</h2>
      <p>Numbers are all <code>double</code>, there is no tail-call optimization, and error handling and the standard library are deliberately small. Stating those limits is more honest than pretending this is a complete Scheme.</p>
      <p class="project-quote">The satisfying part was turning “evaluation” from a lecture concept into a set of runtime rules I could step through myself.</p>
    </div>
  </section>
</div>
