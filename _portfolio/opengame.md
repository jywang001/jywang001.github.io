---
layout: project
title: "OpenGame"
permalink: /portfolio/opengame/
category: "Interactive systems"
summary: "A seven-day campus-life RPG about time, promises, and relationships, with a complete story playable locally without an API key."
stack: "Python · Django · JavaScript · JSON"
repository: "https://github.com/jywang001/OpenGame"
image: "/images/opengame-preview.jpg"
image_alt: "OpenGame opening-day story event"
visual_style: screenshot
collection: portfolio
order: 6
featured: false
---

## A week of choices

The player is a transfer student at Green Garden High School. Each time slot allows one key action: visit a location, take part in an event, or talk with another character. Overlapping events mean a single playthrough cannot cover every route.

The game tracks familiarity, trust, affection, respect, and tension, together with recent memories and promises that reserve future time slots. Keeping a promise, declining early, and missing an appointment lead to different outcomes.

## State and dialogue

A game state machine controls time, relationships, location access, character development, and endings. Optional LLM integration generates dialogue without permission to alter these rules.

The full story also works offline. Local dialogue uses character traits, relationship state, and promise history to handle common intents. An OpenAI-compatible API can provide broader conversation, with failed requests falling back to the offline path.

## Implementation

The Django application connects a browser interface to the game state machine through eight JSON endpoints. World and story content are maintained together, and progress is stored in a local JSON file.

The documented version includes 33 story events, five character routes, five relationship endings, 17 map regions, 35 playable scenes, and 70 location actions. The campus remains playable after the main story ends.

Tests cover the seven-day progression, location access, relationship conditions, promises, character endings, offline dialogue, save migration, and reachability of the main ending. The earlier multi-agent simulation is preserved in the repository's `legacy` branch.
