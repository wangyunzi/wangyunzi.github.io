---
title: 相册
layout: page
date: 2024-04-21
permalink: /album/
---

<ul class="album-list">
    {% assign sorted_albums = site.album | sort: 'date' | reverse %}
    {% for album in sorted_albums %}
        <li>
            <a href="{{ album.url }}">
                <img src="{{ album.cover }}" alt="{{ album.title }}" loading="lazy" decoding="async">
                <h2>{{ album.title }}</h2>
                <p>{{ album.date | date: "%Y年%m月%d日" }}</p>
            </a>
        </li>
    {% endfor %}
</ul>
