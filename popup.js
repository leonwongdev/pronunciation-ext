console.log("hi");
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("selectButton")
    .addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "selectText" });
      });
    });
});
