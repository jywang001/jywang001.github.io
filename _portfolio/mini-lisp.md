---
title: "Mini Lisp Interpreter"
title_en: "Mini Lisp Interpreter"
title_zh: "Mini Lisp 解释器"
excerpt: "Coursework / systems project: a C++ Mini-Lisp interpreter with tokenizer/parser, evaluator, REPL, scripts, special forms, macros, builtins, and CMake builds<br/><img src='/images/mini_lisp_preview.png' style='max-width: 500px;'>"
excerpt_en: "Coursework / systems project: a C++ Mini-Lisp interpreter with tokenizer/parser, evaluator, REPL, scripts, special forms, macros, builtins, and CMake builds<br/><img src='/images/mini_lisp_preview.png' style='max-width: 500px;'>"
excerpt_zh: "课程 / 系统项目：C++ Mini-Lisp 解释器，覆盖词法/语法解析、求值、REPL、脚本、特殊形式、宏、内建过程和 CMake 构建<br/><img src='/images/mini_lisp_preview.png' style='max-width: 500px;'>"
collection: portfolio
order: 5
---

<div class="lang-content" data-lang-content="en" markdown="1">

## Mini Lisp Interpreter

**Status:** public coursework / systems project.

**One-line positioning:** a C++ Mini-Lisp interpreter built for Peking University's Software Design Practice course.

![Mini Lisp preview](/images/mini_lisp_preview.png)

### Why

This project is not part of my AI research thread, so I keep it in a systems/coursework section. It is useful evidence for parser, evaluator, runtime, and C++ implementation work.

### What I Built

- Tokenizer/parser, evaluator, lexical environments, REPL, and script execution.
- Numeric, boolean, string, symbol, pair/list, and empty-list values.
- Special forms including `define`, `lambda`, `if`, `begin`, `let`, `cond`, `and`, `or`, `quote`, `quasiquote`, `unquote`, and `define-macro`.
- Builtins for I/O, type predicates, list processing, numeric comparison, arithmetic, higher-order functions, and strings.
- CMake-based build flow.

### Hard Parts

- Keeping evaluation rules clean enough that special forms and macros did not collapse into ad hoc cases.
- Handling quote/quasiquote/unquote behavior in a way that stayed understandable inside the interpreter.

### Evidence

- [GitHub repository](https://github.com/jywang001/Mini-Lisp)
- README documents features, build/run flow, scripts, examples, and known limitations.

### Result / Lesson

Mini-Lisp is a compact systems exercise: small language, clear runtime rules, and enough edge cases to make implementation discipline matter.

</div>

<div class="lang-content" data-lang-content="zh" markdown="1">

## Mini Lisp 解释器

**状态：**公开课程 / 系统项目。

**一句话定位：**为北京大学《软件设计实践》课程实现的 C++ Mini-Lisp 解释器。

![Mini Lisp 预览](/images/mini_lisp_preview.png)

### Why

这个项目不属于我的 AI 研究主线，所以放在 systems/coursework 区域。它主要证明 parser、evaluator、runtime 和 C++ 实现能力。

### What I Built

- 词法/语法解析器、求值器、词法环境、REPL 和脚本执行。
- 支持数字、布尔、字符串、符号、pair/list 和空表等值类型。
- 支持 `define`、`lambda`、`if`、`begin`、`let`、`cond`、`and`、`or`、`quote`、`quasiquote`、`unquote`、`define-macro` 等特殊形式。
- 内建过程覆盖 I/O、类型判断、列表处理、数值比较、算术、高阶函数和字符串。
- 使用 CMake 构建。

### Hard Parts

- 保持求值规则足够清晰，避免特殊形式和宏实现变成零散特判。
- 处理 quote/quasiquote/unquote 时，让解释器内部逻辑仍然可理解。

### Evidence

- [GitHub 仓库](https://github.com/jywang001/Mini-Lisp)
- README 记录了功能、构建/运行流程、脚本、示例和已知限制。

### Result / Lesson

Mini-Lisp 是一个紧凑的系统练习：语言很小，但 runtime 规则明确，边界情况足够多，能体现实现纪律。

</div>
