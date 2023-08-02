chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getHandle') {
    const handleMatch = location.href.match(/\/profile\/(\w+)/);
    const handle = handleMatch ? handleMatch[1] : null;
    sendResponse({ handle });
  }
});
