// content.js
function createFloatingButtonContainer(x, y) {
  const container = document.createElement("div");

  container.className = "floating-button-container";
  // buttons below
  const youglishButton = document.createElement("button");
  youglishButton.textContent = "Youglish";
  youglishButton.className = "floating-button";

  youglishButton.addEventListener("click", function (event) {
    console.log("youglishButton called");
    const selectedText = window.getSelection().toString();
    const url = `https://youglish.com/pronounce/${selectedText}/english?`;
    openWebDict(event, url);
    container.remove();
  });

  const howjsayButton = document.createElement("button");
  howjsayButton.textContent = "Howjsay";
  howjsayButton.className = "floating-button";
  howjsayButton.addEventListener("click", function (event) {
    console.log("howjsay called");
    const selectedText = window.getSelection().toString();
    const url = `https://howjsay.com/how-to-pronounce-${selectedText}`;
    openWebDict(event, url);
    container.remove();
  });

  container.style.left = x + 20 + "px";
  container.style.top = y + 10 + "px";

  document.body.appendChild(container);
  container.appendChild(youglishButton);
  container.appendChild(howjsayButton);
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
  const floatingButton = document.querySelector(".floating-button");

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
  const youglishWindow = {
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
    `width=${youglishWindow.viewportWidth}, height=${youglishWindow.viewportHeight}, left=${youglishWindow.left}, top=${youglishWindow.top}`
  );
}
