import { hideResults } from "./utilities";

function tabClickHandler() {
  const urlTab = document.getElementById('url-tab');
  const textTab = document.getElementById('text-tab');
  const urlForm = document.getElementById('url-form');
  const textForm = document.getElementById('text-form');

  urlTab.classList.toggle('active-tab');
  textTab.classList.toggle('active-tab');

  urlForm.classList.toggle('hidden');
  textForm.classList.toggle('hidden');

  hideResults();
}

export {
  tabClickHandler
}