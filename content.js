// content.js
console.debug("Loaded dictionary search extension");

let websiteButtonList = [];
let timer; // Variable to keep track of the timer

function createFloatingButtonContainer(x, y) {
  // reset the button list so that new buttons / links can be created for new text selection
  websiteButtonList = [];

  const container = document.createElement("div");
  container.className = "floating-button-container";

  chrome.storage.sync.get(["dictionaries"], function (result) {
    const dictionaries = result.dictionaries || {};

    if (dictionaries.howjsay !== false) {
      createWebsiteButton(
        "Howjsay",
        "https://howjsay.com/how-to-pronounce-",
        "images/howjsay.png"
      );
    }
    if (dictionaries.dictionarycom !== false) {
      createWebsiteButton(
        "Dictionary.com",
        "https://www.dictionary.com/browse/",
        "images/dict-com.png"
      );
    }
    if (dictionaries.cambridge !== false) {
      createWebsiteButton(
        "Cambridge Dictionary",
        "https://dictionary.cambridge.org/dictionary/english/",
        "images/cam-dict.jpeg"
      );
    }
    if (dictionaries.youglish !== false) {
      createWebsiteButton(
        "Youglish",
        "https://youglish.com/pronounce/",
        "images/brandyg.png"
      );
    }

    container.style.left = x + -20 + "px";
    container.style.top = y + -55 + "px";

    document.body.appendChild(container);
    websiteButtonList.forEach((button) => {
      container.appendChild(button);
    });
  });
}

function createWebsiteButton(btnTitle, baseUrl, iconUrl) {
  const button = document.createElement("img");
  button.src = chrome.runtime.getURL(iconUrl); // Set the path to your desired image
  button.alt = btnTitle;
  button.className = "floating-button";
  button.style.cursor = "pointer";

  button.addEventListener("click", function (event) {
    const selectedText = window.getSelection().toString().toLowerCase().trim();
    const url = `${baseUrl}${selectedText}`;
    openWebDict(event, url);
    if (container) {
      container.remove();
    }
  });
  websiteButtonList.push(button);
}

document.addEventListener("mouseup", function (event) {
  clearTimeout(timer); // Clear the timer on mouseup
  const floatingButtonContainer = document.querySelector(
    ".floating-button-container"
  );
  if (floatingButtonContainer) {
    return;
  }
  const selectedText = window.getSelection().toString().trim();
  if (selectedText !== "") {
    chrome.storage.sync.get(["useTimer", "timerDuration"], function (result) {
      // Explicitly check if useTimer is true, default to false
      const useTimer = result.useTimer === true;
      const timerDuration = result.timerDuration || 500; // Default to 500ms if not set

      if (useTimer) {
        // Check if mouse was held for the configured duration
        if (
          event.button === 0 &&
          event.timeStamp - event.target.dataset.mousedownTimestamp >=
            timerDuration
        ) {
          createFloatingButtonContainer(event.clientX, event.clientY);
        }
      } else {
        createFloatingButtonContainer(event.clientX, event.clientY);
      }
    });
  }
});

document.addEventListener("mousedown", function (event) {
  const floatingButtonContainer = document.querySelector(
    ".floating-button-container"
  );

  if (
    floatingButtonContainer &&
    event.target !== floatingButtonContainer &&
    event.target.className !== "floating-button"
  ) {
    floatingButtonContainer.remove();
  }

  // Start the timer on mousedown
  if (event.button === 0) {
    event.target.dataset.mousedownTimestamp = event.timeStamp;

    chrome.storage.sync.get(["timerDuration"], function (result) {
      const timerDuration = result.timerDuration || 500; // Default to 500ms if not set
      timer = setTimeout(() => {}, timerDuration);
    });
  }
});

function openWebDict(event, url) {
  const newWindow = {
    left: event.clientX + "px",
    top: event.clientY + "px",
    viewportWidth:
      Math.round(window.innerWidth * 0.33) < 400
        ? 400
        : Math.round(window.innerWidth * 0.33),
    viewportHeight:
      Math.round(window.innerHeight * 0.55) < 600
        ? 600
        : Math.round(window.innerHeight * 0.55),
  };

  window.open(
    url,
    "_blank",
    `width=${newWindow.viewportWidth}, height=${newWindow.viewportHeight}, left=${newWindow.left}, top=${newWindow.top}`
  );
}
