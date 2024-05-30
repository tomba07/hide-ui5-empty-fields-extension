# Toggle UI5 Form Fields Chrome Extension

This Chrome extension toggles the visibility of form fields with the class `sapUiFormCLElement` based on the presence of elements with the class `sapMEmptyIndicator`. The visibility state is indicated by changing the extension icon.

## Features

- Toggles the visibility of form fields on click.
- Automatically handles lazy-loaded elements using `MutationObserver`.

## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" using the toggle switch in the top right corner.
4. Click on the "Load unpacked" button.
5. Select the directory where the extension files are located.

## Usage

1. Navigate to a webpage where the extension should run.
2. Click the extension button to toggle the visibility of the form fields.
3. The extension icon will change to indicate whether the form fields are currently hidden or visible.
