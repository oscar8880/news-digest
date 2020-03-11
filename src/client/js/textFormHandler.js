import { toggleLoading, showResults, buildResults, fetchWithTimeout, hideResults, displayErrorMessage } from './utilities'

function handleTextSubmit(event) {

  // Prevent default submit behaviour
  event.preventDefault();

  // Check for presence of error message and remove if there
  const errorMessage = document.getElementById('error-message');
  if(errorMessage !== null) {
    errorMessage.parentElement.removeChild(errorMessage.parentElement.lastChild);
  }

  // Show loading wheel
  toggleLoading();

  // Get the title as typed in the text input
  const titleText= document.getElementById('title-input').value;

  // Get the article text from the textarea
  const articleText = document.getElementById('article-text').value;

  // Encode both before appending as a variable to the request URL
  const encodedTitle = encodeURIComponent(titleText);
  const encodedArticle = encodeURIComponent(articleText);

  // Fetch results from the express server
  console.log("::: Form Submitted :::")
  fetchWithTimeout(`http://localhost:8081/text?title=${encodedTitle}&text=${encodedArticle}`, {}, 5000)
  .then(res => {
      return res.json()
  })
  .then(function(data) {
      buildResults(data);
  })
  .then( ()=> {
    toggleLoading();
    showResults();
    document.getElementById('text-form').reset();
  })
  .catch( ()=> {
    const textInput =  document.getElementById('text-form');
    displayErrorMessage("Server error. Please try again.", textInput);
    toggleLoading();
    hideResults();
  })
}

export {
  handleTextSubmit
}