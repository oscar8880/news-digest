import { toggleLoading, showResults, buildResults, fetchWithTimeout, displayErrorMessage, hideResults } from './utilities'

function handleUrlSubmit(event) {

  // Prevent default submit behaviour
  event.preventDefault();

  // Check for presence of error message and remove if there
  const errorMessage = document.getElementById('error-message');
  if(errorMessage !== null) {
    errorMessage.parentElement.removeChild(errorMessage.parentElement.lastChild);
  }

  // Show loading wheel
  toggleLoading();

  // Get the URL as typed in the text input
  const textUrl= document.getElementById('url-input').value;

  // Encode the atricle URL before appending as a variable to the request URL
  const encodedURL = encodeURIComponent(textUrl);

  // Fetch results from the express server
  console.log("::: Form Submitted :::")
  fetchWithTimeout(`http://localhost:8081/url?url=${encodedURL}`, {}, 5000)
  .then(res => {
      return res.json()
  })
  .then(function(data) {
      buildResults(data);
  })
  .then(()=> {
    toggleLoading();
    showResults();
    document.getElementById('url-form').reset();
    document.getElementById('url-submit').setAttribute('disabled', '');
  })
  .catch( ()=> {
    const textInput =  document.getElementById('url-form');
    displayErrorMessage("Server error. Please try again.", textInput);
    toggleLoading();
    hideResults();
  })
}

export { handleUrlSubmit }