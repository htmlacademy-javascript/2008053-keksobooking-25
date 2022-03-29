import { disableElement, enableElement } from './util.js';
import { createPoints } from './map-util.js';

const offerForm = document.querySelector('.ad-form');

const mapFilterFormContainer = document.querySelector('.map__filters-container');
const mapFilterForm = mapFilterFormContainer.querySelector('.map__filters');
const mapBasicFilters = mapFilterForm.querySelectorAll('.map__filter');
const mapFeatureFilter = mapFilterForm.querySelector('.map__features');

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data__error');
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
  const dataErrorModalRetryButton = dataErrorModal.querySelector('#data-error-retry-button');
  const dataErrorModalCloseButton = dataErrorModal.querySelector('#data-error-close-button');

  dataErrorFragment.appendChild(dataErrorModal);
  mapFilterFormContainer.appendChild(dataErrorFragment);
  mapFilterForm.classList.add('map__filters--disabled');
  mapBasicFilters.forEach(disableElement);
  disableElement(mapFeatureFilter);

  dataErrorModalRetryButton.addEventListener('click', (evt) =>{
    evt.preventDefault();
    enableElement(mapFeatureFilter);
    closeDataErrorModal();
    createPoints();
  });

  dataErrorModalCloseButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeDataErrorModal();
  });
};

export { createDataErrorModal, openUserModal };
