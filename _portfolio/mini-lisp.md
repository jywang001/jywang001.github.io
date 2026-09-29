---
layout: project
title: "Mini-Lisp"
permalink: /portfolio/mini-lisp/
category: "Programming languages"
summary: "A Lisp interpreter in C++ with lexical scope, closures, macros, an interactive REPL, and script execution."
stack: "C++ · CMake"
repository: "https://github.com/jywang001/Mini-Lisp"
image: "/images/projects/mini-lisp-repl.svg"
image_alt: "Typeset Mini-Lisp REPL examples: mapping a square function and reducing a list."
collection: portfolio
order: 5
featured: false
---

## A small language runtime

Built for Peking University's Software Design Practice course, Mini-Lisp supports both an interactive REPL and script execution. Its value types include numbers, booleans, strings, symbols, pairs, lists, procedures, and macros.

I implemented the tokenizer, parser, parent-linked lexical environments, closures, and special-form dispatch. Lists are represented using `PairValue` objects.

## Language features

Special forms include `define`, `lambda`, `if`, `begin`, `let`, `cond`, short-circuiting `and` and `or`, quotation, and simple macros. Built-in procedures cover arithmetic, comparison, strings, I/O, and `map`, `filter`, and `reduce`.

```scheme
(define-macro unless (cond body)
  (quasiquote
    (if (not (unquote cond))
        (begin (unquote body))
        ())))
```

## Limits

This is a teaching interpreter. Numbers use `double`, tail-call optimization is not implemented, and the standard library and error handling are intentionally small.
