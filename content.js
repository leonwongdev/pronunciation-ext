// content.js
let websiteButtonList = [];

function createFloatingButtonContainer(x, y) {
  // reset the button list so that new buttons / links can be created for new text selection
  websiteButtonList = [];

  const container = document.createElement("div");

  container.className = "floating-button-container";

  createWebsiteButton("Howjsay", "https://howjsay.com/how-to-pronounce-");
  createWebsiteButton("Dictionary.com", "https://www.dictionary.com/browse/");
  createWebsiteButton(
    "Cambridge Dictionary",
    "https://dictionary.cambridge.org/dictionary/english/"
  );
  createWebsiteButton("Youglish", "https://youglish.com/pronounce/");

  container.style.left = x + 20 + "px";
  container.style.top = y + 10 + "px";

  document.body.appendChild(container);
  websiteButtonList.forEach((button) => {
    container.appendChild(button);
  });
}

function createWebsiteButton(btnTitle, baseUrl) {
  const button = document.createElement("button");
  button.textContent = btnTitle;
  button.className = "floating-button";
  button.addEventListener("click", function (event) {
    const selectedText = window.getSelection().toString().toLowerCase().trim();;
    const url = `${baseUrl}${selectedText}`;
    openWebDict(event, url);
    container.remove();
  });
  websiteButtonList.push(button);
}

document.addEventListener("mouseup", function (event) {
  const floatingButtonContainer = document.querySelector(
    ".floating-button-container"
  );
  if (floatingButtonContainer) {
    return;
  }
  const selectedText = window.getSelection().toString().trim();
  if (selectedText !== "") {
    createFloatingButtonContainer(event.clientX, event.clientY);
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
});

// console.log("Loaded content script");

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
