function showResults() {
  const resultsComponent = document.querySelector('#results-component');
  resultsComponent.classList.remove('hidden');
}

function hideResults() {
  const resultsComponent = document.querySelector('#results-component');
  resultsComponent.classList.add('hidden');
}

function toggleLoading() {
  const loader = document.querySelector('#loading-spinner');
  loader.classList.toggle('hidden');
}


function buildResults(data) {
  const classification = document.querySelector("#classification-data");
  const polarity = document.querySelector("#polarity-data");
  const subjectivity = document.querySelector("#subjectivity-data");
  const summary = document.querySelector("#summary-data");
  const hashtagList = document.querySelector("#hashtag-list");

  classification.innerText = data.classification;
  polarity.innerText = `Polarity: ${data.polarity}`;
  subjectivity.innerText = `Subjectivity: ${data.subjectivity}`;
  summary.innerText = data.summary;

  hashtagList.innerHTML = '';
  data.hashtags.forEach(hashtag => {
    const listItem = document.createElement('li');
    listItem.innerText = hashtag;
    hashtagList.appendChild(listItem);
  })
}

export {
  hideResults,
  showResults,
  toggleLoading,
  buildResults
}