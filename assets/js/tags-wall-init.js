(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var root = document.getElementById("test");
    var dataEl = document.getElementById("tags-wall-data");

    if (!root || !dataEl || !window.Tags || !window.Style1) {
      return;
    }

    var text = dataEl.textContent.trim();

    window.Tags({
      style: {
        fn: window.Style1,
        title: "王云子",
        animation: 1,
        scale: 1,
        randomScoreIfNoSetting: 5
      },
      text: text,
      rootDOM: root
    });
  });
})();
