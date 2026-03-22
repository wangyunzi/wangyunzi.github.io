(function () {
  function scrollPercentage() {
    var winTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight;
    var winHeight = window.innerHeight;
    var denominator = docHeight - winHeight;
    if (denominator <= 0) {
      return 0;
    }
    return (winTop / denominator) * 100;
  }

  function scrollSteps(imagesNumber) {
    var steps = [];
    for (var i = 1; i < imagesNumber; i++) {
      steps[steps.length] = (100 / imagesNumber) * i;
    }
    steps[steps.length] = 150;
    return steps;
  }

  function getBackgrounds() {
    var body = document.body;
    if (!body || !body.dataset || !body.dataset.backgrounds) {
      return [];
    }
    if (body.dataset.backgrounds === "null") {
      return [];
    }
    try {
      var parsed = JSON.parse(body.dataset.backgrounds);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      if (typeof parsed === "string" && parsed.length > 0) {
        return [parsed];
      }
      return [];
    } catch (err) {
      return [];
    }
  }

  function initBackstretch() {
    if (!window.jQuery || !window.jQuery.backstretch) {
      return;
    }

    var $ = window.jQuery;
    $.slidebars && $.slidebars();

    var images = getBackgrounds();
    if (images.length === 0) {
      return;
    }

    var steps = [];
    $(".loader").addClass("loading");
    steps = scrollSteps(images.length);

    $.backstretch(images, { fade: 1000 });
    $.backstretch("pause");

    $(document).on("backstretch.before", function () {
      $(".loader").addClass("loading");
    });

    $(document).on("scrollstop", function () {
      if (steps.length === 0) {
        return;
      }
      var percentage = scrollPercentage();
      var backstretchData = $("body").data("backstretch");
      for (var i = 0; i < steps.length; i++) {
        if (percentage < steps[i]) {
          if (backstretchData && i === backstretchData.index) {
            break;
          }
          $.backstretch("show", i);
          break;
        }
      }
    });

    $(document).on("backstretch.after", function () {
      $(".loader").removeClass("loading");
    });
  }

  function initMediumZoom() {
    if (window.mediumZoom) {
      window.mediumZoom("img", { margin: 24 });
    }
  }

  function initBackToTop() {
    if (window.addBackToTop) {
      window.addBackToTop({
        diameter: 45,
        backgroundColor: "black",
        textColor: "#FFFFF0"
      });
    }
  }

  function setArticleLinksTarget() {
    var links = document.querySelectorAll("article a");
    links.forEach(function (link) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    });
  }

  function initSiteRuntime() {
    var runtimeRoot = document.querySelector("[data-site-start]");
    if (!runtimeRoot) {
      return;
    }

    var startValue = runtimeRoot.getAttribute("data-site-start");
    var start = new Date(startValue);
    if (Number.isNaN(start.getTime())) {
      return;
    }

    var timeDate = document.getElementById("timeDate");
    var times = document.getElementById("times");
    if (!timeDate || !times) {
      return;
    }

    function updateRuntime() {
      var now = new Date();
      var years = now.getFullYear() - start.getFullYear();
      var anniversary = new Date(start);
      anniversary.setFullYear(start.getFullYear() + years);

      if (anniversary > now) {
        years -= 1;
        anniversary = new Date(start);
        anniversary.setFullYear(start.getFullYear() + years);
      }

      var remaining = now - anniversary;
      var dnum = Math.floor(remaining / 1000 / 60 / 60 / 24);
      var hnum = Math.floor(remaining / 1000 / 60 / 60 - 24 * dnum);

      if (String(hnum).length === 1) {
        hnum = "0" + hnum;
      }

      timeDate.textContent = "小破站在风雨中飘摇了 " + years + " 年 " + dnum + " 天 ";
      times.textContent = hnum + " 小时";
    }

    updateRuntime();
    window.setInterval(updateRuntime, 60000);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initBackstretch();
    initMediumZoom();
    initBackToTop();
    setArticleLinksTarget();
    initSiteRuntime();
  });
})();
