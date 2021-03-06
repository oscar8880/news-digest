import { checkUrl, toggleLoading, showResults, buildResults, fetchWithTimeout, hideResults, displayErrorMessage } from './utilities'
import { baseUrl } from '../index';

function onTextChange() {
  const articleTitle = document.getElementById('title-input');
  const titleValue = articleTitle.value
  const articleText = document.getElementById('article-text');
  const textValue = articleText.value;

  const submitButton = document.getElementById('text-submit');

  if(titleValue.length > 0 && textValue.length > 0) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', '')
  }
}

function onUrlBlur() {
  const textField = document.getElementById('url-input');
  const inputtedText = textField.value;
  const submitButton = document.getElementById('url-submit');
  const errorSpan = document.getElementById('url-error');


  if(checkUrl(inputtedText)) {
    submitButton.removeAttribute('disabled');
    textField.classList.remove('error');
    errorSpan.textContent = '';
  } else if (inputtedText === ''){
    textField.classList.remove('error');
    errorSpan.textContent = '';
  } else {
    errorSpan.textContent = 'Invalid URL';
    textField.classList.add('error');
    submitButton.setAttribute('disabled', '')
  }
}

function onUrlChange() {
  const submitButton = document.getElementById('url-submit');
  const textField = document.getElementById('url-input');
  const inputtedText = textField.value;
  const errorSpan = document.getElementById('url-error');

  if(inputtedText.length > 0) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', '')
  }

  if(checkUrl(inputtedText)) {
    submitButton.removeAttribute('disabled');
    errorSpan.textContent = '';
  }
}

function tabClickHandler(event) {
  const urlTab = document.getElementById('url-tab');
  const textTab = document.getElementById('text-tab');
  const urlForm = document.getElementById('url-form');
  const textForm = document.getElementById('text-form');

  // If clicked tab is active, click does nothing
  const clickedTab = event.target;
  if(clickedTab.classList.contains('active-tab')) {
    return;
  }

  urlTab.classList.toggle('active-tab');
  textTab.classList.toggle('active-tab');

  urlForm.classList.toggle('hidden');
  textForm.classList.toggle('hidden');

  hideResults();
}

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
  fetchWithTimeout(`${baseUrl}text?title=${encodedTitle}&text=${encodedArticle}`, {}, 10000)
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
    document.getElementById('text-submit').setAttribute('disabled', '');
  })
  .catch( ()=> {
    const textInput =  document.getElementById('text-form');
    displayErrorMessage("Server error. Please try again.", textInput);
    toggleLoading();
    hideResults();
  })
}

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
  fetchWithTimeout(`${baseUrl}url?url=${encodedURL}`, {}, 10000)
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

function wakeUp() {
  fetch(`${baseUrl}wakeup`)
  .then(()=>console.log('Woke up server'))
  .catch((error)=>console.log(error));
}

export {
  onTextChange, 
  onUrlBlur,
  onUrlChange,
  tabClickHandler,
  handleTextSubmit,
  handleUrlSubmit,
  wakeUp
}