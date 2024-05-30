// Global variable to store the hidden state
let isHidden = false;

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: initElementToggler,
    args: [isHidden]
  });

  // Toggle the state
  isHidden = !isHidden;
});

function initElementToggler(currentlyHidden) {
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
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Store observer reference for potential future use
  window.hiddenElementsObserver = observer;

  console.log("MutationObserver initialized and elements visibility set to", currentlyHidden ? "hidden" : "visible");
}
