(function () {
  var bbDom = document.querySelector("#bber, [data-memos-root]");
  if (!bbDom) {
    return;
  }

  var bbMemo = {
    memos: bbDom.dataset.memos || "",
    limit: bbDom.dataset.limit || "20",
    creatorId: bbDom.dataset.creatorId || "1",
    domId: "#bber",
    username: bbDom.dataset.username || "",
    useravatar: bbDom.dataset.useravatar || "",
    userlink: bbDom.dataset.userlink || "",
    tags: bbDom.dataset.tags || "",
    commentsShow: bbDom.dataset.commentsShow === "true",
    commentsUrl: bbDom.dataset.commentsUrl || "",
    commentsTitle: bbDom.dataset.commentsTitle || "评论",
    loadMore: bbDom.dataset.loadMore !== "false",
    silent: bbDom.dataset.silent === "true"
  };

  var limit = parseInt(bbMemo.limit, 10) || 20;
  var memos = bbMemo.memos;
  var page = 1;
  var offset = 0;
  var nextLength = 0;
  var nextDom = "";
  var load = '<div class="bb-load"><button class="load-btn button-load">加载中…</button></div>';

  if (bbDom) {
    getFirstList();
    meNums();
    if (bbMemo.loadMore) {
      var btn = document.querySelector("button.button-load");
      if (btn) {
        btn.addEventListener("click", function () {
          btn.textContent = "加载中…";
          updateHTMl(nextDom);
          if (nextLength < limit) {
            document.querySelector("button.button-load").remove();
            return;
          }
          getNextList();
        });
      }
    }
  }

  function getFirstList() {
    if (bbMemo.loadMore && !bbMemo.silent) {
      bbDom.insertAdjacentHTML("afterend", load);
    }
    var bbUrl =
      memos +
      "api/v1/memo?creatorId=" +
      bbMemo.creatorId +
      "&rowStatus=NORMAL&limit=" +
      limit;
    fetch(bbUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (resdata) {
        updateHTMl(resdata);
        var nowLength = resdata.length;
        if (!bbMemo.loadMore) {
          return;
        }
        if (nowLength < limit) {
          removeLoadButton();
          return;
        }
        page++;
        offset = limit * (page - 1);
        getNextList();
      });
  }

  function getNextList() {
    var bbUrl =
      memos +
      "api/v1/memo?creatorId=" +
      bbMemo.creatorId +
      "&rowStatus=NORMAL&limit=" +
      limit +
      "&offset=" +
      offset;
    fetch(bbUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (resdata) {
        nextDom = resdata;
        nextLength = nextDom.length;
        page++;
        offset = limit * (page - 1);
        if (nextLength < 1) {
          removeLoadButton();
          return;
        }
      });
  }

  function meNums() {
    var bbUrl = memos + "api/v1/memo/amount?userId=" + bbMemo.creatorId;
    fetch(bbUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function () {});
  }

  function updateHTMl(data) {
    if (!window.marked) {
      return;
    }

    var resultAll = "";
    var TAG_REG = /#([^\s#]+?) /g,
      BILIBILI_REG = /<a.*?href="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?".*?>.*<\/a>/g,
      NETEASE_MUSIC_REG = /<a.*?href="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g,
      QQMUSIC_REG = /<a.*?href="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g,
      QQVIDEO_REG = /<a.*?href="https:\/\/v\.qq\.com\/.*\/([a-z|A-Z|0-9]+)\.html".*?>.*<\/a>/g,
      YOUKU_REG = /<a.*?href="https:\/\/v\.youku\.com\/.*\/id_([a-z|A-Z|0-9|==]+)\.html".*?>.*<\/a>/g,
      YOUTUBE_REG = /<a.*?href="https:\/\/www\.youtube\.com\/watch\?v\=([a-z|A-Z|0-9]{11})".*?>.*<\/a>/g;

    window.marked.setOptions({
      breaks: true,
      smartypants: true,
      langPrefix: "language-"
    });

    for (var i = 0; i < data.length; i++) {
      var bbContREG = data[i].content.replace(TAG_REG, "<span class='tag-span'>#$1</span> ");
      bbContREG = window.marked
        .parse(bbContREG)
        .replace(
          BILIBILI_REG,
          "<div class='video-wrapper'><iframe src='//player.bilibili.com/player.html?bvid=$1&as_wide=1&high_quality=1&danmaku=0' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true'></iframe></div>"
        )
        .replace(
          NETEASE_MUSIC_REG,
          "<meting-js auto='https://music.163.com/#/song?id=$1'></meting-js>"
        )
        .replace(
          QQMUSIC_REG,
          "<meting-js auto='https://y.qq.com/n/yqq/song$1.html'></meting-js>"
        )
        .replace(
          QQVIDEO_REG,
          "<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>"
        )
        .replace(
          YOUKU_REG,
          "<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>"
        )
        .replace(
          YOUTUBE_REG,
          "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' frameborder='0' allowfullscreen></iframe></div>"
        );

      var createdTs = data[i].createdTs;
      var createdDate = new Date(createdTs * 1000);
      var bbDatetime = createdDate.toISOString().replace("T", " ").substring(0, 19);
      var dom =
        "<li><div class=\"bb-div\"><div class=\"datatime\"><span class=\"hy-time\">" +
        bbDatetime +
        "</span></div><div class=\"datacont\">" +
        bbContREG +
        "</div><div class=\"datasource\">" +
        (data[i].resourceList.length
          ? "<a href=\"" +
            data[i].resourceList[0].externalLink +
            "\" target=\"_blank\">" +
            data[i].resourceList[0].title +
            "</a>"
          : "") +
        "</div></div></li>";
      resultAll += dom;
    }

    bbDom.insertAdjacentHTML(
      "beforeend",
      '<div class="bb-timeline"><ul>' + resultAll + "</ul></div>"
    );
  }

  function removeLoadButton() {
    var button = document.querySelector("button.button-load");
    if (button) {
      button.remove();
    }
  }
})();
