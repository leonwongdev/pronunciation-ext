document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("options-form");

  // Load saved preferences
  chrome.storage.sync.get(
    ["dictionaries", "useTimer", "timerDuration"],
    function (result) {
      const dictionaries = result.dictionaries || {};
      form.howjsay.checked = dictionaries.howjsay !== false;
      form.dictionarycom.checked = dictionaries.dictionarycom !== false;
      form.cambridge.checked = dictionaries.cambridge !== false;
      form.youglish.checked = dictionaries.youglish !== false;

      // Explicitly check if useTimer is true, default to false
      form.useTimer.checked = result.useTimer === true;

      // Set timer duration, default to 500ms if not set
      form.timerDuration.value = result.timerDuration || 500;
    }
  );

  // Save preferences
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const dictionaries = {
      howjsay: form.howjsay.checked,
      dictionarycom: form.dictionarycom.checked,
      cambridge: form.cambridge.checked,
      youglish: form.youglish.checked,
    };
    const useTimer = form.useTimer.checked;
    const timerDuration = parseInt(form.timerDuration.value, 10) || 500; // Parse as integer with default of 500

    chrome.storage.sync.set(
      {
        dictionaries: dictionaries,
        useTimer: useTimer,
        timerDuration: timerDuration,
      },
      function () {
        alert("Options saved!");
      }
    );
  });
});
