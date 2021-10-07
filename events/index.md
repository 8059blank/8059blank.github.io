---
layout: archive
title: Events
---
<style type="text/css">
  .post-listing {
  background-color: $white;
  position: absolute;
  top: 400px;
  z-index: 233;
  width: 100%;
  padding: 20px 20px 0;
  -webkit-transform: translate3d(0,0,1px);
  transform: translate3d(0,0,1px);
  @include media-query($small-screen) {
    padding: 50px 30px 0;
  }
  @include media-query($medium-screen) {
    height: 100vh;
    overflow-y: scroll;
    position: initial;
    top: 0;
  }
}

.image-credit {
  float: right;
  font-weight: bold;
  font-style: italic;
  color: $info;
  font-size: 13px;
  padding-right: 20px;
}

// Post Section
section.post {
  margin-bottom: 80px;
}

// Back home button

.back-home a {
  font-size: 13px;
  font-weight: bold;
  color: $info;
  border: 1px solid lighten($text-color, 45%);
  border-radius: 0.4em;
  padding: 0.5em 1em;
}

// Post title
.post-title {

}

.post-title-link {
  color: $primary;
  font-size: 14px;
  margin-left: 10px;
  &:hover,
  &:focus {
    color: lighten($primary, 14%);
  }
}

// Post meta
.post-meta {
  font-size: 13px;
  font-weight: bold;
  .post-date {
    color: $secondary;
  }
  .post-author {
    text-transform: uppercase;
    color: $warning;
  }
  .post-cat {
    text-transform: uppercase;
    color: $warning;
  }
  .read-time {
    color: $primary;
  }
}

// Read more buttons

a.read-more {
  padding: 5px 8px;
}

// Post content

#post {
  padding-bottom: 50px;
  .post-header {
    margin: 0 auto 50px;
  }
}

#post h1 {
  margin: 0.5em 0 1em;
}
#post h2 {
  margin: 2em 0 0.8em;
  padding-bottom: 0.7em;
  border-bottom: 1px solid #ddd;
}
#post h3 {
  margin: 1.75em 0 1.2em;
  margin-top: 0px;
  position: relative;
}
 a{
  text-decoration: none;
 }
</style>

## mAChine Week

`insert poster`

## ACtionBots


<table>
{% for project in site.categories.actionbots %}
  <tr>
    <td style="text-align: center">
        <img src="{{ project.image }}" width="150px"/>
    </td>
    <td style="text-align: left; padding-left: 16px;"/>
    <td>
      <header class="post-header">
        <h1 style="margin-top: 15px; font-size: 30px">
          <a href="{{ site.url }}{{ project.url }}" class="post-title" title="{{ project.title | escape }}">{{ project.title }}</a>
          {% if project.link %}
          {% endif %}
        </h1>
      </header>
      {% if project.excerpt %}
      <h6 style="margin-top: 5px; font-size: 20px;">
          {{ project.excerpt }}
      </h6>
      {% endif %}
    </td>
  </tr>
{% endfor %}	
</table>

## HACK@AC


<table>
{% for project in site.categories.hackac %}
  <tr>
    <td style="text-align: center">
        <img src="{{ project.image }}" width="150px"/>
    </td>
    <td style="text-align: left; padding-left: 16px;"/>
    <td>
      <header class="post-header">
        <h1 style="margin-top: 15px; font-size: 30px">
          <a href="{{ site.url }}{{ project.url }}" class="post-title" title="{{ project.title | escape }}">{{ project.title }}</a>
          {% if project.link %}
          {% endif %}
        </h1>
      </header>
      {% if project.excerpt %}
      <h6 style="margin-top: 5px; font-size: 20px;">
          {{ project.excerpt }}
      </h6>
      {% endif %}
    </td>
  </tr>
{% endfor %}	
</table>
