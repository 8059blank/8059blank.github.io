---
layout: single
title: Gallery
---
{% assign gallery = site.static_files | where_exp: "x", "x.path contains '/gallery/'" | sort:"path" | reverse | group_by_exp: "image", "image.path | split:'/' | slice: 2" %}

<ul class="taxonomy__index">
{% for year in gallery %}
<li>
    <a id="{{ year.name }}_link" href="#{{ year.name }}">
    <strong>{{ year.name }}</strong> <span class="taxonomy__count">{{ year.items | size }}</span>
    </a>
</li>
{% endfor %}
</ul>

{% for year in gallery %}
  <section id="{{ year.name }}" class="taxonomy__section">
    <h2 class="archive__subtitle">{{ year.name }}</h2>
    <div class="entries-{{ page.entries_layout | default: 'list' }}">
      {% for image in year.items %}
        <img style="border-radius:3px" src="{{ site.baseurl }}{{ image.path }}"/>
        {% include archive-single.html type=page.entries_layout %}
      {% endfor %}
    </div>
    <a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
  </section>
{% endfor %}