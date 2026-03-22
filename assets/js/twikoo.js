(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("tcomment");
    if (!container || !window.twikoo) {
      return;
    }

    var envId = container.getAttribute("data-twikoo-env") || "https://twikoo.wangyunzi.com/";
    window.twikoo.init({
      envId: envId,
      el: "#tcomment"
    });
  });
})();
