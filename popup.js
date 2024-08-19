let titles = [];

function displayResults(filteredTitles) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  filteredTitles.forEach((item, index) => {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = index + 1 + '. ' + item.title;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.update({ url: item.url });
    });
    resultsDiv.appendChild(link);
    resultsDiv.appendChild(document.createElement('br'));
  });
}

function filterTitles(query) {
  return titles?.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase())
  );
}

document.getElementById('search').addEventListener('input', (e) => {
  const query = e.target.value;
  const filteredTitles = filterTitles(query);
  displayResults(filteredTitles);
});

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, {action: "getTitles"}, (response) => {
    console.log(response)
    titles = response;
    displayResults(titles);
  });
});