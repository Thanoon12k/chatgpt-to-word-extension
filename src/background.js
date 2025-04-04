import { generateDocx } from "./docBuilder.js";

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "buildDocx") {
    generateDocx(message.data);
  }
});
