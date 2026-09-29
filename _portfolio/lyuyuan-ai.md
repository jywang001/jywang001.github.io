---
layout: project
title: "Green Garden High School Story"
permalink: /portfolio/lyuyuan-ai/
category: "Narrative agents"
summary: "An early LLM-driven school story with five characters, persistent relationship state, an event bus, and local save files."
stack: "Python · Flask · JavaScript · JSON"
repository: "https://github.com/jywang001/Lyuyuan_AI"
image: "/images/lyuyuan_ai_preview.png"
image_alt: "Green Garden High School Story chat interface"
visual_style: conversation
collection: portfolio
order: 7
featured: false
---

## Characters with persistent state

The player meets five characters during a school club fair. Each character has a persona, a closeness score, a boredom score, and a relationship stage. A conversation turn produces both the reply shown to the player and an internal JSON object that updates character state.

## Implementation

`BaseCharacter` handles dialogue and state changes. An event bus routes relationship and game-lifecycle events to logging, statistics, and achievement listeners. `GameStorage` stores progress in five JSON save slots.

The interface uses HTML, Bootstrap, and jQuery, backed by Flask. The repository includes character configurations, API documentation, and basic tests.

## Project context

This is a retired early prototype. Its main focus was maintaining coherent state across conversations: connecting a character's next reply to the relationships and events established in previous turns.
