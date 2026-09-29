---
layout: academic
title: Curriculum Vitae
permalink: /cv/
description: Education, research, industry experience, and selected work of Junyang Wang, Peking University.
redirect_from:
  - /resume
---
<article class="container cv-page">
  <header class="page-intro cv-intro"><div><p class="eyebrow">Curriculum vitae</p><h1>Junyang Wang</h1><p>Computer Science · Peking University</p><a class="text-link" href="mailto:junyangwang@stu.pku.edu.cn">junyangwang@stu.pku.edu.cn</a></div><button class="print-button" type="button" data-print hidden>Print / Save PDF <span aria-hidden="true">↗</span></button></header>
  <section class="cv-section" aria-labelledby="cv-interests"><h2 id="cv-interests">Research interests</h2><p>My current interests center on recursive self-improvement (RSI), with an open focus across agents and models. My previous research spans multimodal models, embodied intelligence, vision-language-action systems, and navigation.</p></section>
  <section class="cv-section" aria-labelledby="cv-education"><h2 id="cv-education">Education</h2><div class="cv-education"><div><h3>{{ site.data.experience.education.organization }}</h3><p>{{ site.data.experience.education.role }}</p></div><span class="entry-period">{{ site.data.experience.education.period }}</span></div></section>
  <section class="cv-section" aria-labelledby="cv-experience"><h2 id="cv-experience">Research &amp; industry experience</h2>{% include experience-list.html %}</section>
  <section class="cv-section" aria-labelledby="cv-papers"><h2 id="cv-papers">Papers</h2>{% include research-list.html %}</section>
  <section class="cv-section" aria-labelledby="cv-projects"><h2 id="cv-projects">Selected projects</h2>{% assign projects = site.portfolio | where: 'featured', true | sort: 'order' %}{% for project in projects %}<article class="cv-project"><h3><a href="{{ project.url | relative_url }}">{{ project.title }} <span aria-hidden="true">↗</span></a></h3><p class="entry-period">{{ project.period }}</p><p>{{ project.summary }}</p></article>{% endfor %}</section>
  <section class="cv-section" aria-labelledby="cv-community"><h2 id="cv-community">Community</h2><h3>{{ site.data.experience.community.organization }} · {{ site.data.experience.community.role }}</h3><p class="entry-period">{{ site.data.experience.community.period }}</p><p>{{ site.data.experience.community.description }}</p></section>
  <section class="cv-section" aria-labelledby="cv-skills"><h2 id="cv-skills">Technical experience</h2><dl class="skills-list"><div><dt>Training &amp; evaluation</dt><dd>Python, PyTorch, VLM/VLA supervised fine-tuning, GRPO/RL, reward design, model evaluation</dd></div><div><dt>Data &amp; applications</dt><dd>Multimodal data cleaning, data synthesis, retrieval-augmented generation, agent workflows</dd></div></dl></section>
</article>
