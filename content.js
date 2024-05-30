chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: removeElements
  });
});

function removeElements() {
  $(".sapMEmptyIndicator").each(function () {
    $(this).closest(".sapUiFormCLElement").first().remove();
  });
}
