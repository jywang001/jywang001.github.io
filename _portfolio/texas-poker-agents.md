---
layout: project
title: "Texas-Poker-Agents"
permalink: /portfolio/texas-poker-agents/
category: "Multi-agent systems"
summary: "A locally runnable multiplayer LLM poker system for exploring agent behavior in imperfect-information games."
stack: "Node.js · SSE · JSONL · OpenAI-compatible APIs"
repository: "https://github.com/jywang001/Texas-Poker-Agents"
collection: portfolio
order: 3
featured: false
---

## An imperfect-information environment

One human player can share a table with multiple LLM agents, each configured with its own model and style prompt. An agent receives only the state visible to its seat, excluding other players' cards, future community cards, and server-only information.

## Rules and model actions

The Node.js server controls shuffling, dealing, legal actions, blinds, side pots, all-ins, showdown, and match progression. Models propose actions; the server validates them before changing game state.

Malformed JSON, impossible bets, and illegal actions are marked in the logs and replaced with a valid check or fold, allowing the game to continue.

## Review and verification

Events are appended to `data/sessions/*.jsonl` and can be exported through the interface. After each hand, the host can inspect hidden cards, short reasoning summaries, fallbacks, and hand reflections.

Engine tests cover hand ranking, side pots, multiple-runout settlement, heads-up action order, blind increases, hidden-card filtering in table talk, and chip conservation.

## Running locally

The project uses Node.js 20+ and built-in modules, with no database. Without an API key, agent seats use the server's fallback actions.

```sh
npm start
# Open http://127.0.0.1:3000
npm run check
```
