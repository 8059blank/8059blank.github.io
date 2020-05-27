---
layout: archive
title: Projects
---

## Club Projects
<ul class="posts">
  {% for post in site.categories.club %}
    <a href="{{ post.url }}" title="{{ post.title }}" style="color:black;text-decoration:none;">
      <div class="card">
        <img src="{{ post.image }}" style="width:100%">
            <div class="container">
            <h4>{{ post.title }}</h4>
            <p>{{ post.excerpt }}</p>
        </div>
      </div>
    </a>
  {% endfor %}	
</ul>

## Individual Projects
<ul class="posts">
  {% for post in site.categories.individual %}
    <li><a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a></li>
  {% endfor %}	
</ul>