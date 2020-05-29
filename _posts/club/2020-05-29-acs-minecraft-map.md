---
layout: posts
title: AC Minecraft
image: ../projects/club/AC Minecraft/cover.png
excerpt: Creation of Anglo-Chinese School (Independent) in Minecraft
categories: club
contrib: [Marcus Chin (3.07),
Ryan Yap (3.09),
Quek Teck Yong (3.11),
Wong Yeh Siang (3.11),
Joel Teo (3.11),
Chen An Hong (3.12),
Zachary Lim (3.12),
Toh Xue Hong (3.12),
Marcus Quek (4.12),
Benjamin Chia (5.04),
Yuan Jing Xin (5.04),
Dylan Michael Chong (5.05),
Aloysius Wong (5.08),
Julian Khong (5.09),
Evans Soh (5.13),
Jarrett Tan (6.02),
Alvin Ng (6.04)]
---

During the COVID-19 outbreak in Singapore, schools and workplaces were closed, and students were required to embark on full home-based learning online. In the light of this situation, the Robotics and Technological Society took our ACS(I) campus online, making a virtual rendition of our school in Minecraft. Working for over 3 months to complete this project, we are finally releasing it to the student body on 1st June 2020, where they were able to explore parts of school they had long missed with classmates. Our club is grateful for this opportunity to give back to the school family and use our creative skills to strengthen our AC bond in spirit while apart.

## Contributors
<div style="display:flex">
    <div style="width:50%">
        {% for name in page.contrib %}
            {% assign mod2 = forloop.index | modulo: 2 %}
            {% if mod2 == 1 %}
            <li>{{name}}</li>
            {% endif %}
        {% endfor %}
    </div>
    <div style="width:50%">
        {% for name in page.contrib %}
            {% assign mod2 = forloop.index | modulo: 2 %}
            {% if mod2 == 0 %}
            <li>{{name}}</li>
            {% endif %}
        {% endfor %}
    </div>
</div>