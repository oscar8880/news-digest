import { toggleLoading, showResults, buildResults } from './utilities'

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
    document.getElementById('url-form').reset();
  })
}

export { handleUrlSubmit }