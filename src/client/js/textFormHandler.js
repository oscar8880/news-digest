import { toggleLoading, showResults, buildResults } from './utilities'

function handleTextSubmit(event) {

  // Prevent default submit behaviour
  event.preventDefault();

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
  fetch(`http://localhost:8081/text?title=${encodedTitle}&text=${encodedArticle}`)
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
}

export {
  handleTextSubmit
}