import { checkUrl } from "./checkUrl";

function onUrlBlur() {
  const textField = document.getElementById('url-input');
  const inputtedText = textField.value;
  const submitButton = document.getElementById('url-submit');
  const errorSpan = document.getElementById('url-error');

  if(inputtedText === "") {
    errorSpan.innerText = 'Enter a URL';
    textField.classList.add('error');
    submitButton.setAttribute('disabled', '')
  } else if(checkUrl(inputtedText)) {
    submitButton.removeAttribute('disabled');
    textField.classList.remove('error');
    errorSpan.innerText = '';
  } else {
    errorSpan.innerText = 'Invalid URL';
    textField.classList.add('error');
    submitButton.setAttribute('disabled', '')
  }
}

export { onUrlBlur }