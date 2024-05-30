chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleElements
  });
});

function toggleElements() {
  // CSS class to hide elements
  const css = `
      .hidden-sapUiFormCLElement {
        display: none !important;
      }
    `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);

  // Function to toggle visibility
  function toggleVisibility() {
    $(".sapMEmptyIndicator").each(function () {
      let parentElement = $(this).closest(".sapUiFormCLElement").first();
      if (parentElement.length > 0) {
        parentElement.toggleClass("hidden-sapUiFormCLElement");
      }
    });
    console.log("Toggled visibility of elements");
  }

  // Execute the toggle function
  toggleVisibility();
}
