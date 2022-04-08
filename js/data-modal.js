import { fillMap } from './data.js';
import { mapSection } from './elements.js';

const dataErrorCanvas = mapSection.querySelector('.data-error__canvas');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const closeDataErrorModal = () => {
  dataErrorCanvas.innerHTML = '';
  dataErrorCanvas.classList.add('visually-hidden');
};

const dataErrorRetryButtonClickHandler = (evt) => {
  evt.preventDefault();
  closeDataErrorModal();
  fillMap();
};

const dataErrorCloseButtonClickHandler = (evt) => {
  evt.preventDefault();
  closeDataErrorModal();
};

const createDataErrorModal = () => {
  const dataErrorModal = dataErrorTemplate.cloneNode(true);
  const dataErrorModalRetryButton = dataErrorModal.querySelector('.data-error__button--retry');
  const dataErrorModalCloseButton = dataErrorModal.querySelector('.data-error__button--close');

  dataErrorCanvas.innerHTML = '';
  dataErrorCanvas.appendChild(dataErrorModal);
  dataErrorCanvas.classList.remove('visually-hidden');

  dataErrorModalRetryButton.addEventListener('click', (evt) => dataErrorRetryButtonClickHandler(evt));

  dataErrorModalCloseButton.addEventListener('click', (evt) => dataErrorCloseButtonClickHandler(evt));
};

export { createDataErrorModal };
