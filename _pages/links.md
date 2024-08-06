---
title: 链圈
layout: page
date: 2024-04-21
permalink: /links/
---

<!-- <div class="friends">
    <div id="hexo-circle-of-friends-root"></div>
    <style>
        .cf-article, #cf-state, #cf-more {
            background: #fff;
            border: 1px solid #eaeaea;
            box-shadow: 0 4px 6px rgba(0, 0, 0, .04);
        }
        .cf-article[data-v-7eed2f8f] {
            margin: 0;
            border-radius: 12px;
        }
        #cf-state {
            margin-bottom: 2rem !important;
        }
        .dark .cf-article, .dark #cf-state, .dark #cf-more {
            background: #4a4b50;
            border: 1px solid #3b3d42;
        }
        .dark #cf-overlay, .dark .is-light {
            background-color: rgba(59, 61, 66, .42);
        }
        .dark .cf-overshow {
            background: #292a2d;
        }
        .dark .cf-overshow p a {
            color: var(--lmm-fontcolor);
        }
        .dark .cf-overshow .cf-overshow-content, .dark .cf-overshow .cf-overshow-content-tail {
            background: #eaeaea;
        }
        .dark #cf-more, .dark #cf-state {
            background: var(--lmm-dack-background);
            color: var(--lmm-dark-fontcolor);
        }
        .dark #cf-change, .dark .cf-article-floor, .dark .cf-time-created, .dark .cf-time-updated {
            color: var(--lmm-dark-floorcolor);
        }
        .dark .cf-article-author, .dark .cf-article a.cf-article-title {
            color: var(--lmm-dark-fontcolor);
        }
        .dark .cf-article {
            background: var(--lmm-dack-background);
        }
        .dark .cf-article:hover .cf-article-floor, .dark .cf-article:hover .cf-time-created, .dark .cf-article:hover .cf-time-updated, .dark .cf-overshow p span {
            color: var(--lmm-dark-fontcolor);
        }
        .dark .is-light .el-popper__arrow:before {
            display: none;
        }
        #cf-container {
            max-width: 1000px;
        }
        .post-title {
            text-align: center;
        }
        div[data-v-7eed2f8f] {
            display: grid;
            grid-gap: 1rem;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        }
        div[data-v-7eed2f8f] > div[data-v-7eed2f8f] {
            display: block;
        }
        .cf-article-title {
            white-space: nowrap;
            overflow: hidden;
        }
        #cf-more[data-v-7eed2f8f], #cf-footer {
            right: 0;
            position: relative;
            width: 100%;
            text-align: center !important;
        }
        #cf-more {
            top: 2rem;
        }
        .cf-data-lastupdated {
            text-align: center !important;
        }
        @media (max-width: 855px) {
            #cf-more[data-v-7eed2f8f], #cf-footer {
                right: 0;
            }
            div[data-v-7eed2f8f] {
                display: block;
            }
            div[data-v-7eed2f8f].cf-article {
                margin-bottom: 1rem;
            }
        }
    </style>
</div>
<script>
    let UserConfig = {
        // 填写你的api地址
        private_api_url: 'https://friends.wangyunzi.com/',
        // 初始加载几篇文章
        page_init_number: 20,
        // 点击加载更多时，一次最多加载几篇文章，默认10
        page_turning_number: 10,
        // 头像加载失败时，默认头像地址
        error_img: 'https://sdn.geekzu.org/avatar/57d8260dfb55501c37dde588e7c3852c',
        // 进入页面时第一次的排序规则
        sort_rule: 'created',
        // 本地文章缓存数据过期时间（天）
        expire_days: 1, 
    }
</script>
<script type="text/javascript" src="https://npm.elemecdn.com/fcircle-theme-yyyz@1.0.13/dist/fcircle.min.js"></script>
<br> -->
<script type="text/javascript" src="/assets/js/rss.js"></script>
<section class="page-content">
  <section class="rss-post-list">
    {% assign rss_data = site.data.rss_data %}
    {% for post in rss_data %}
      <article class="post-item">
        <i class="post-item-thumb" style="background-image:url({{ post.avatar }})"></i>
        <section class="post-item-summary">
          <h3 class="post-item-title">
            <a class="post-item-link" href="{{ post.link }}" title="{{ post.title }}" target="_blank">{{ post.title }}</a>
          </h3>
          <time class="post-item-date timeago" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y年%m月%d日" }}</time>
          <address class="post-item-date links-name">{{ post.name }}</address>
        </section>
      </article>
    {% endfor %}
  </section>
</section>

<style>
/* 这个是链圈页面 */
.rss-post-list {
  min-height: 680px;
  padding: 20px; /* 增加内边距以避免内容贴边 */
}
.rss-post-list .post-item {
  display: flex;
  margin: 20px 0;
  padding: 10px; /* 增加内边距以提高可读性 */
  border-radius: 8px; /* 圆角边框 */
}
.rss-post-list .post-item .post-item-thumb {
  display: block;
  width: 70px; /* 增加缩略图宽度 */
  height: 70px; /* 增加缩略图高度 */
  overflow: hidden;
  border-radius: 8px; /* 调整圆角 */
  transition: all 0.5s;
  background-size: cover; /* 修改背景缩放方式 */
  background-repeat: no-repeat;
  background-position: center;
}
.rss-post-list .post-item .post-item-summary {
  margin-left: 15px; /* 增加左边距 */
  flex: 1;
  display: flex;
  flex-direction: column;
}
.rss-post-list .post-item .post-item-summary .post-item-title {
  font-size: 16px; /* 增加标题字体大小 */
  color: rgb(46, 169, 223);
  margin-bottom: 5px; /* 增加底部间距 */
}
.rss-post-list .post-item .post-item-summary .post-item-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20%;
  height: 1px; /* 修改渐变条高度 */
  background-color: transparent;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0), #ffffff 50%);
}
.rss-post-list .post-item .post-item-summary .post-item-date {
  color: rgb(150, 150, 150);
  font-size: 14px; /* 增加日期字体大小 */
  margin-bottom: 5px; /* 增加底部间距 */
}
.rss-post-list .post-item .post-item-comment {
  display: block;
  text-decoration: none;
  text-align: center;
  color: rgb(255, 255, 255);
  border-radius: 10px;
  width: 40px; /* 增加评论按钮宽度 */
  height: 20px; /* 增加评论按钮高度 */
  font-weight: 500;
  font-size: 14px; /* 增加评论按钮字体大小 */
  line-height: 20px; /* 增加评论按钮行高 */
  background-color: rgb(150, 215, 245);
  margin-left: auto; /* 将评论按钮右对齐 */
  margin-top: 10px; /* 增加顶部间距 */
}
.rss-post-list .post-item .post-item-comment:hover {
  background-color: rgb(46, 169, 223);
}

</style>
