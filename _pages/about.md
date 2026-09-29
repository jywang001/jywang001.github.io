---
layout: academic
permalink: /
title: Junyang Wang
description: Junyang Wang is a Computer Science undergraduate at Peking University interested in recursive self-improvement, with experience in multimodal models, embodied AI, and agent systems.
redirect_from:
  - /about/
  - /about.html
---

<div class="container">
  <section class="about-section" id="about" aria-labelledby="home-title">
    <h1 id="home-title">About me</h1>
    <p>I am a Computer Science undergraduate in the Elite Program at <a href="https://www.pku.edu.cn/">Peking University</a>, expected to graduate in 2028.</p>
    <p>My current research interests center on <strong>recursive self-improvement (RSI)</strong>. I am exploring this direction with an open focus across agents and models.</p>
    <p>Previously, I worked on multimodal models and embodied intelligence, particularly vision-language-action systems and navigation. My experience spans model post-training, data construction, evaluation, and AI agent development.</p>
  </section>
  <section class="home-section" id="research" aria-labelledby="research-title">
    <div class="section-heading"><h2 id="research-title">Selected publications</h2></div>
    {% include research-list.html %}
  </section>
  <section class="home-section" id="experience" aria-labelledby="experience-title">
    <div class="section-heading"><h2 id="experience-title">Research &amp; industry experience</h2><a class="text-link" href="{{ '/cv/' | relative_url }}">Full CV <span aria-hidden="true">↗</span></a></div>
    {% include experience-list.html %}
  </section>
  <section class="home-section" id="projects" aria-labelledby="projects-title">
    <div class="section-heading"><h2 id="projects-title">Selected projects</h2><a class="text-link" href="{{ '/projects/' | relative_url }}">All projects <span aria-hidden="true">↗</span></a></div>
    <div class="project-grid">{% assign projects = site.portfolio | where: 'featured', true | sort: 'order' %}{% for project in projects %}{% include project-card.html project=project %}{% endfor %}</div>
  </section>
  <section class="home-section community-section" id="community" aria-labelledby="community-title">
    <div class="section-heading"><h2 id="community-title">Community</h2></div>
    <div class="community-copy">
      <p>I help organize <strong>PLib</strong>, an AI student community at Peking University. Through <strong>P-Talk</strong>, we bring students together for talks on large language models and AI agents.</p>
      <p>I also contribute to <strong>P-Lib</strong>, a course notes and resources platform with more than <strong>5,000 registered users</strong>.</p>
      <span class="entry-period">Core organizer · Aug 2025 — Present</span>
    </div>
  </section>
</div>
