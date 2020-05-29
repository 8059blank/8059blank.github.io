---
layout: single
title: Gallery
---
{% assign gallery = site.static_files | where_exp: "x", "x.path contains '/gallery/'" | sort:"path" | reverse | group_by_exp: "image", "image.path | split:'/' | slice: 2" %}

<style>
  .gallery-col-format {
  line-height: 0;
   
  -webkit-column-count: 5;
  -webkit-column-gap:   0px;
  -moz-column-count:    5;
  -moz-column-gap:      0px;
  column-count:         5;
  }
@media (max-width: 1200px) {
  .gallery-col-format {
    -moz-column-count:    4;
    -webkit-column-count: 4;
    column-count:         4;
  }
}
@media (max-width: 1000px) {
  .gallery-col-format {
  -moz-column-count:    3;
  -webkit-column-count: 3;
  column-count:         3;
  }
}
@media (max-width: 800px) {
  .gallery-col-format {
  -moz-column-count:    2;
  -webkit-column-count: 2;
  column-count:         2;
  }
}
@media (max-width: 400px) {
  .gallery-col-format {
  -moz-column-count:    1;
  -webkit-column-count: 1;
  column-count:         1;
  } 
}

.gallery-col-format img {
  /* Just in case there are inline attributes */
  padding: 5px;
  width: 100% !important;
  height: auto !important;
}
</style>

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
    <section class="gallery-col-format">
      {% for image in year.items %}
        <img src="{{ site.baseurl }}{{ image.path }}"/>
      {% endfor %}
    </section>
    </div>
    <a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
  </section>
{% endfor %}

<!--img style="margin:10; border-radius:3px; width:33%; display: inline;" src="{{ site.baseurl }}{{ image.path }}"/-->  
<!--{% include archive-single.html type=page.entries_layout %}-->