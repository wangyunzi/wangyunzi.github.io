(function () {
  var searchRoot = document.querySelector(".search");
  var searchBtn = document.querySelector(".search-start");
  var searchClear = document.querySelector(".search-clear");
  var searchInput = document.querySelector(".search-input");
  var searchResults = document.querySelector(".search-results");

  if (!searchRoot || !searchBtn || !searchClear || !searchInput || !searchResults) {
    return;
  }

  var searchValue = "";
  var arrItems = [];
  var arrContents = [];
  var arrLinks = [];
  var arrTitles = [];
  var arrResults = [];
  var indexItem = [];
  var itemLength = 0;
  var tmpDiv = document.createElement("div");
  tmpDiv.className = "result-item";

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var xml = xhr.responseXML;
      arrItems = xml.getElementsByTagName("item");
      itemLength = arrItems.length;

      for (var i = 0; i < itemLength; i++) {
        arrContents[i] = arrItems[i]
          .getElementsByTagName("description")[0]
          .childNodes[0].nodeValue.replace(/<.*?>/g, "");
        arrLinks[i] = arrItems[i]
          .getElementsByTagName("link")[0]
          .childNodes[0].nodeValue.replace(/<.*?>/g, "");
        arrTitles[i] = arrItems[i]
          .getElementsByTagName("title")[0]
          .childNodes[0].nodeValue.replace(/<.*?>/g, "");
      }
    }
  };

  var feedUrl = searchRoot.dataset.feedUrl || "/feed.xml";
  xhr.open("get", feedUrl, true);
  xhr.send();

  searchBtn.onclick = function () {
    if (searchInput.value !== "") {
      searchConfirm();
    }
  };

  searchClear.onclick = function () {
    searchInput.value = "";
    searchResults.innerHTML = "";
    searchResults.classList.remove("active");
    searchClear.style.display = "none";
  };

  searchInput.oninput = function () {
    if (searchInput.value === "") {
      searchClear.style.display = "none";
      searchResults.classList.remove("active");
    } else {
      searchClear.style.display = "block";
      searchConfirm();
    }
  };

  searchInput.onfocus = function () {
    if (searchInput.value !== "" && searchResults.innerHTML !== "") {
      searchResults.classList.add("active");
    }
  };

  function searchConfirm() {
    if (searchInput.value.trim() === "") {
      searchResults.classList.remove("active");
      searchClear.style.display = "none";
    } else {
      searchInit();
      searchValue = searchInput.value;
      searchMatching(arrTitles, arrContents, searchValue);
    }
  }

  function searchInit() {
    arrResults = [];
    indexItem = [];
    searchResults.innerHTML = "";
    searchResults.classList.remove("active");
    searchClear.style.display = "block";
  }

  function searchMatching(arr1, arr2, input) {
    input = new RegExp(input, "i");

    for (var i = 0; i < itemLength; i++) {
      if (arr1[i].search(input) !== -1 || arr2[i].search(input) !== -1) {
        var arr = arr1[i].search(input) !== -1 ? arr1 : arr2;
        indexItem.push(i);
        var indexContent = arr[i].search(input);
        arrResults.push(
          arr[i].slice(indexContent - 10, indexContent) +
            "<mark>" +
            arr[i].slice(indexContent, indexContent + input.toString().length - 3) +
            "</mark>" +
            arr[i].slice(
              indexContent + input.toString().length - 3,
              indexContent + input.toString().length - 3 + 10
            )
        );
      }
    }

    var totalDiv = tmpDiv.cloneNode(true);
    totalDiv.innerHTML = "总匹配：<b>" + indexItem.length + "</b> 项";
    searchResults.appendChild(totalDiv);

    if (indexItem.length === 0) {
      var itemDiv = tmpDiv.cloneNode(true);
      itemDiv.innerText = "未匹配到内容...";
      searchResults.appendChild(itemDiv);
    }

    for (var j = 0; j < arrResults.length; j++) {
      var resultDiv = tmpDiv.cloneNode(true);
      resultDiv.innerHTML =
        "<b>《" + arrTitles[indexItem[j]] + "》</b><hr />" + arrResults[j];
      resultDiv.setAttribute("onclick", "changeHref(arrLinks[indexItem[" + j + "]])");
      searchResults.appendChild(resultDiv);
    }

    if (indexItem.length > 0) {
      searchResults.classList.add("active");
    } else {
      searchResults.classList.remove("active");
    }
  }

  window.changeHref = function (href) {
    location.href = href;
  };
})();
