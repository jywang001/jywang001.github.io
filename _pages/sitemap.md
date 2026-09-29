---
layout: academic
title: Site index
permalink: /sitemap/
---
<div class="container index-page">
  <header class="page-intro"><p class="eyebrow">Index</p><h1>Around the site.</h1></header>
  <div class="prose"><h2>Pages</h2><ul><li><a href="{{ '/' | relative_url }}">Home</a></li><li><a href="{{ '/projects/' | relative_url }}">Projects</a></li><li><a href="{{ '/cv/' | relative_url }}">Curriculum vitae</a></li></ul><h2>Projects</h2><ul>{% assign projects = site.portfolio | sort: 'order' %}{% for project in projects %}<li><a href="{{ project.url | relative_url }}">{{ project.title }}</a></li>{% endfor %}</ul><p><a href="{{ '/sitemap.xml' | relative_url }}">Machine-readable sitemap</a></p></div>
</div>
