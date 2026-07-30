---
layout: studio-project
title: "Social Copilot"
title_en: "Social Copilot"
title_zh: "Social Copilot"
number: "03"
label_en: "iOS app · communication assistant"
label_zh: "iOS 应用 · 沟通辅助"
lead_en: "An iOS app that uses a specific contact, relationship, and message to generate three reply suggestions without reading or sending messages for the user."
lead_zh: "一个面向具体联系人和具体消息的 iOS 沟通辅助工具：结合关系和个人偏好生成三条回复建议，但不读取、也不代发消息。"
status_en: "Working MVP · preparing for release"
status_zh: "完整可运行 MVP · 准备上架"
stack: "SwiftUI · Vision OCR · Speech · Node.js"
visual: "social-copilot"
collection: portfolio
order: 3
---

<div class="lang-content" data-lang-content="zh">
  <section class="project-section">
    <p class="project-section__label">产品</p>
    <div class="project-section__content">
      <h2>针对一个联系人和一条消息</h2>
      <p>Social Copilot 不是聊天软件。用户主动输入或粘贴一条消息，选择联系人、关系和沟通目标，App 再给出三种可以直接复制的回复建议。</p>
      <p>它不会读取微信或短信，也不会自动发送。AI 只负责给建议，最后怎么说仍然由用户决定。</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">输入</p>
    <div class="project-section__content">
      <h2>文字、语音和聊天截图</h2>
      <p>消息可以键入、粘贴、语音转写，也可以从聊天截图中通过本机 OCR 提取。联系人页面保存关系类型、备注和用户手动维护的记忆，个人表达偏好同样可以查看和修改。</p>
      <p>生成时会把这些明确的上下文组合起来，而不是在后台自动推断用户的人际关系。</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">实现</p>
    <div class="project-section__content">
      <h2>SwiftUI 客户端和一个受限的模型代理</h2>
      <p>iOS 客户端使用 SwiftUI、Vision OCR、Speech 和 AVFoundation。本地数据以受保护的原子 JSON snapshot 保存，并包含旧数据迁移和失败恢复。</p>
      <p>模型请求经过 Node.js 代理，API key 留在服务端。代理包含请求大小、超时和频率限制，也不会记录 prompt 或请求正文。项目同时有 iOS 单元测试、UI 测试和后端测试。</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">状态</p>
    <div class="project-section__content">
      <h2>完整 MVP，正在准备上架</h2>
      <p>核心流程已经可以运行：选择联系人、输入消息、生成三条建议、复制回复，并按需保存历史。当前工作主要是实机视觉和权限检查，以及补齐隐私政策、支持页面等上架材料。</p>
    </div>
  </section>
</div>

<div class="lang-content" data-lang-content="en">
  <section class="project-section">
    <p class="project-section__label">THE PRODUCT</p>
    <div class="project-section__content">
      <h2>One contact and one message at a time</h2>
      <p>Social Copilot is not a messaging app. The user enters or pastes a message, chooses the contact, relationship, and communication goal, and receives three replies that can be copied into another app.</p>
      <p>It does not read WeChat or SMS and never sends a message automatically. The AI suggests; the user decides what to say.</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">INPUT</p>
    <div class="project-section__content">
      <h2>Text, speech, and chat screenshots</h2>
      <p>A message can be typed, pasted, dictated, or extracted from a screenshot with on-device OCR. Contact pages hold relationship details, notes, and memories maintained by the user; writing preferences are also visible and editable.</p>
      <p>Generation combines that explicit context instead of silently inferring the user's relationships in the background.</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">THE BUILD</p>
    <div class="project-section__content">
      <h2>A SwiftUI client and a constrained model proxy</h2>
      <p>The iOS client uses SwiftUI, Vision OCR, Speech, and AVFoundation. Local data is stored in protected atomic JSON snapshots with migration and failure recovery.</p>
      <p>Model requests go through a Node.js proxy so the API key remains server-side. The proxy enforces request-size, timeout, and rate limits without logging prompts or request bodies. The project includes iOS unit and UI tests as well as backend tests.</p>
    </div>
  </section>

  <section class="project-section">
    <p class="project-section__label">STATUS</p>
    <div class="project-section__content">
      <h2>A working MVP, now preparing for release</h2>
      <p>The main flow is complete: choose a contact, enter a message, generate three suggestions, copy a reply, and optionally keep the history. The remaining work is device-level visual and permission QA plus the privacy and support pages required for release.</p>
    </div>
  </section>
</div>
