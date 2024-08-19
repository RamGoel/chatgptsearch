function getTitles() {
  const links = document.querySelectorAll('a.flex.items-center.gap-2.p-2');
  const titles = Array.from(links).map(link => ({
    title: link.querySelector('div.relative.grow').textContent.trim(),
    url: link.href
  }));

  console.log("---->", titles);
  return titles;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTitles') {
    sendResponse(getTitles());
  }
});