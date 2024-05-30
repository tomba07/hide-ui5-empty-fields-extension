// Global variable to store the hidden state and observer
let isHidden = false;

chrome.action.onClicked.addListener((tab) => {
  // Toggle the state
  isHidden = !isHidden;

  // Update the icon based on the new state
  const newIcons = isHidden
    ? {
        16: "closed16.png",
        32: "closed32.png",
        48: "closed48.png",
        128: "closed128.png"
      }
    : {
        16: "open16.png",
        32: "open32.png",
        48: "open48.png",
        128: "open128.png"
      };
  chrome.action.setIcon({ path: newIcons });

  // Execute the content script with the new state
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: initElementToggler,
    args: [isHidden]
  });
});

function initElementToggler(currentlyHidden) {
  if (typeof jQuery === "undefined") {
    console.log("jQuery is not available.");
    return;
  }

  // Disconnect the existing observer if any
  if (window.hiddenElementsObserver) {
    window.hiddenElementsObserver.disconnect();
  }

  // CSS class to hide elements
  const css = `
    .hidden-sapUiFormCLElement {
      display: none !important;
    }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);

  // Function to set visibility of elements
  function setVisibility(hidden) {
    $(".sapMEmptyIndicator").each(function () {
      let parentElement = $(this).closest(".sapUiFormCLElement").first();
      if (parentElement.length > 0) {
        if (hidden) {
          parentElement.addClass("hidden-sapUiFormCLElement");
        } else {
          parentElement.removeClass("hidden-sapUiFormCLElement");
        }
      }
    });
  }

  // Set initial visibility based on the stored state
  setVisibility(currentlyHidden);

  // MutationObserver to handle lazy-loaded elements
  const observer = new MutationObserver(() => {
    setVisibility(currentlyHidden);
    console.log("Elements visibility set to", currentlyHidden ? "hidden" : "visible");
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Store observer reference for potential future use
  window.hiddenElementsObserver = observer;

  console.log("MutationObserver initialized and elements visibility set to", currentlyHidden ? "hidden" : "visible");
}
