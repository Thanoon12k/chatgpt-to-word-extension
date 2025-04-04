document.getElementById("copyResponse").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const responses = Array.from(document.querySelectorAll('.markdown'))
        .map(el => el.innerText)
        .join("\n\n");

      navigator.clipboard.writeText(responses).then(() => {
        alert("✅ ChatGPT response copied!");
      });
    }
  });
});

document.getElementById("downloadResponse").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const responses = Array.from(document.querySelectorAll('.markdown'))
        .map(el => el.innerHTML);

      chrome.runtime.sendMessage({ action: "buildDocx", data: responses });
    }
  });
});
