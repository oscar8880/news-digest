function handleUrlSubmit(event) {
  // Prevent default submit behaviour
  event.preventDefault();

  toggleLoading();

  // Get the URL as typed in the text input
  const textUrl= document.getElementById('url-input').value;

  // Encode the atricle URL before appending as a variable to the request URL
  const encodedURL = encodeURIComponent(textUrl);

  // Fetch results from the express server
  console.log("::: Form Submitted :::")
  fetch(`http://localhost:8081/url?url=${encodedURL}`)
  .then(res => {
      return res.json()
  })
  .then(function(data) {
      buildResults(data);
  })
  .then( ()=> {
    toggleLoading();
    showResults();
  })
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
  console.log(data.hashtags);
  data.hashtags.forEach(hashtag => {
    const listItem = document.createElement('li');
    listItem.innerText = hashtag;
    hashtagList.appendChild(listItem);
  })
}

function showResults() {
  const resultsComponent = document.querySelector('#results-component');
  resultsComponent.classList.remove('hidden');
}

function toggleLoading() {
  const loader = document.querySelector('#loading-spinner');
  loader.classList.toggle('hidden');
}



export { handleUrlSubmit }