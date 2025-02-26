document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("options-form");

  // Load saved preferences
  chrome.storage.sync.get(["dictionaries"], function (result) {
    const dictionaries = result.dictionaries || {};
    form.howjsay.checked = dictionaries.howjsay !== false;
    form.dictionarycom.checked = dictionaries.dictionarycom !== false;
    form.cambridge.checked = dictionaries.cambridge !== false;
    form.youglish.checked = dictionaries.youglish !== false;
  });

  // Save preferences
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const dictionaries = {
      howjsay: form.howjsay.checked,
      dictionarycom: form.dictionarycom.checked,
      cambridge: form.cambridge.checked,
      youglish: form.youglish.checked,
    };
    chrome.storage.sync.set({ dictionaries: dictionaries }, function () {
      alert("Options saved!");
    });
  });
});
