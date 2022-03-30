import { createPoints } from './map-util.js';

const offerForm = document.querySelector('.ad-form');

const mapFilterFormContainer = document.querySelector('.map__filters-container');

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const dataErrorFragment = document.createDocumentFragment();

const closeUserModal = () => {
  const modal = offerForm.lastChild;

  offerForm.removeChild(modal);
  document.removeEventListener('keydown', closeUserModal);
};

const openUserModal = (template) => {
  const modal = template.cloneNode(true);

  offerForm.appendChild(modal);
  modal.addEventListener('click', closeUserModal);
  document.addEventListener('keydown', closeUserModal);
};

const closeDataErrorModal = () => {
  const modal = mapFilterFormContainer.lastChild;

  mapFilterFormContainer.removeChild(modal);
};

const createDataErrorModal = () => {
  const dataErrorModal = dataErrorTemplate.cloneNode(true);
  const dataErrorModalRetryButton = dataErrorModal.querySelector('.data-error__button--retry');
  const dataErrorModalCloseButton = dataErrorModal.querySelector('.data-error__button--close');

  dataErrorFragment.appendChild(dataErrorModal);
  mapFilterFormContainer.appendChild(dataErrorFragment);

  dataErrorModalRetryButton.addEventListener('click', (evt) =>{
    evt.preventDefault();
    closeDataErrorModal();
    createPoints();
  });

  dataErrorModalCloseButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeDataErrorModal();
  });
};

export { createDataErrorModal, openUserModal };
