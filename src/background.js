// Background script for Noty extension
// Currently minimal - can be extended for future features

chrome.runtime.onInstalled.addListener(() => {
  console.log("Noty extension installed");
});

// Listen for storage changes to sync between different parts of the extension
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "local" && changes.quickNotes) {
    console.log("Notes updated in storage");
  }
});
