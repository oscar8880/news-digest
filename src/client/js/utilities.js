import { reject } from "q";

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

function checkUrl(string)
{
  const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(string)) {
    return true;
  }
  else {
    return false;
  }
}

function buildResults(data) {
  const classification = document.querySelector("#classification-data");
  const polarity = document.querySelector("#polarity-data");
  const subjectivity = document.querySelector("#subjectivity-data");
  const summary = document.querySelector("#summary-data");
  const hashtagList = document.querySelector("#hashtag-list");

  classification.textContent = data.classification;
  polarity.textContent = `Polarity: ${data.polarity}`;
  subjectivity.textContent = `Subjectivity: ${data.subjectivity}`;
  summary.textContent = data.summary;

  hashtagList.innerHTML = '';
  data.hashtags.forEach(hashtag => {
    const listItem = document.createElement('li');
    listItem.textContent = hashtag;
    hashtagList.appendChild(listItem);
  })
}

function fetchWithTimeout(url, options = {}, delay = 5000) {
  const timer = new Promise((resolve) => {
    setTimeout(resolve, delay, {
      timeout: true,
    });
  });
  return Promise.race([
    fetch(url, options),
    timer
  ]).then((response) => {
    if(response.timeout) {
      reject("Fetch error");
    }
    return response
  })
}

function displayErrorMessage(message, parentElement) {
  const errorText = document.createElement('p');
  errorText.classList.add('error');
  errorText.textContent = message;
  errorText.setAttribute('id', 'error-message');
  parentElement.appendChild(errorText);
}

export {
  hideResults,
  showResults,
  toggleLoading,
  checkUrl,
  buildResults,
  fetchWithTimeout,
  displayErrorMessage
}