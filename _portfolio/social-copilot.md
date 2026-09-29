---
layout: project
title: "Social Copilot"
permalink: /portfolio/social-copilot/
category: "AI applications"
summary: "An iOS communication assistant that combines a message, relationship context, and writing preferences to suggest three replies for the user to review and copy."
stack: "SwiftUI · Vision OCR · Speech · Node.js"
collection: portfolio
order: 4
featured: false
---

## One contact and one message

Social Copilot is a working MVP for drafting replies. The user provides a message, chooses a contact and a communication goal, and receives three suggestions. The app does not access WeChat or SMS conversations or send replies automatically.

Messages can be typed, pasted, dictated, or extracted from a screenshot with on-device OCR. Contact records hold relationship details, notes, and memories maintained by the user. Writing preferences are visible and editable.

## Implementation

The iOS client uses SwiftUI, Vision OCR, Speech, and AVFoundation. Local data is stored in protected atomic JSON snapshots, with data migration and failure recovery.

Model requests pass through a Node.js proxy that keeps API keys on the server. The proxy applies request-size limits, timeouts, and rate limits without logging prompts or request bodies. Verification includes iOS unit tests, UI tests, and backend tests.

The implemented flow covers selecting a contact, entering a message, generating suggestions, copying a reply, and optionally saving the history.
