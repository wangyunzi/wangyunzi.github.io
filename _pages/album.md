---
title: 相册
layout: page
date: 2024-04-21
permalink: /album/
---

<style>
/* External CSS file */
ul.album-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

ul.album-list li {
    margin: 10px 0;
    display: inline-block;
    vertical-align: top;
    width: calc(33.333% - 20px); /* Three items per row with margins considered */
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s;
    box-sizing: border-box; /* Ensure padding and border are included in width/height */
}

ul.album-list li:hover {
    transform: scale(1.03);
}

ul.album-list a {
    text-decoration: none;
    color: inherit;
    display: block;
    height: 100%;
    font-size: 1em;
}

ul.album-list img {
    width: 100%;
    height: 150px; /* Set a fixed height for images */
    display: block;
    object-fit: cover; /* Ensure the image covers the entire container */
    object-position: center; /* Center the image */
    loading: lazy; /* Lazy load images */
}

ul.album-list h2 {
    font-size: 1em; /* Smaller title font size */
    margin: 10px;
    color: #333;
    overflow: hidden; /* Prevent overflow of long titles */
    white-space: nowrap;
    text-overflow: ellipsis;
}

ul.album-list p {
    font-size: 0.9em;
    margin: 0 10px 10px;
    color: #666;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    ul.album-list li {
        width: calc(50% - 20px); /* Two items per row on smaller screens */
    }
}

@media (max-width: 480px) {
    ul.album-list li {
        width: calc(100% - 20px); /* One item per row on very small screens */
    }
}

.gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: space-between;
}

.gallery img {
    width: 100%;
    height: auto;
    aspect-ratio: 1/1; /* 强制为正方形 */
    object-fit: cover;
    margin-bottom: 10px;
}

.gallery figure {
    flex: 1 1 calc(33.333% - 20px);
    text-align: center;
    margin: 0;
    padding: 0;
}

.gallery figcaption {
    font-size: 14px;
    color: #666;
    margin-top: 10px;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .gallery figure {
        flex: 1 1 calc(50% - 20px);
    }
}

@media (max-width: 480px) {
    .gallery figure {
        flex: 1 1 calc(100% - 20px);
    }
}
</style>

<ul class="album-list">
    {% assign sorted_albums = site.album | sort: 'date' | reverse %}
    {% for album in sorted_albums %}
        <li>
            <a href="{{ album.url }}">
                <img src="{{ album.cover }}" alt="{{ album.title }}" loading="lazy">
                <h2>{{ album.title }}</h2>
                <p>{{ album.date | date: "%Y年%m月%d日" }}</p>
            </a>
        </li>
    {% endfor %}
</ul>
