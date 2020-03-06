import { checkUrl } from "..";

function onUrlChange() {
  const submitButton = document.getElementById('url-submit');
  const textField = document.getElementById('url-input');
  const inputtedText = textField.value;
  const errorSpan = document.getElementById('url-error');

  if(checkUrl(inputtedText)) {
    submitButton.removeAttribute('disabled');
    errorSpan.innerText = '';
  }
}

export {
  onUrlChange
}