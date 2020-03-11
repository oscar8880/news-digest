function onTextChange() {
  const articleTitle = document.getElementById('title-input');
  const titleValue = articleTitle.value
  const articleText = document.getElementById('article-text');
  const textValue = articleText.value;

  const submitButton = document.getElementById('text-submit');
  
    if(titleValue === "" || textValue === "") {
      submitButton.setAttribute('disabled', '');
    } else {
      submitButton.removeAttribute('disabled');
    }
}

export { onTextChange }