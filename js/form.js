import { disableElement, enableElement } from './util.js';

const offerForm = document.getElementsByClassName('ad-form')[0];
const formElements = Array.from(offerForm.getElementsByClassName('ad-form__element'));
const filterForm = document.getElementsByClassName('map__filters')[0];
const mapBasicFilters = Array.from(document.getElementsByClassName('map__filter'));
const mapFeatureFilter = document.getElementsByClassName('map__features')[0];

const disablePage = () => {
  offerForm.classList.add('ad-form--disabled');
  filterForm.classList.add('map__filters--disabled');
  formElements.forEach(disableElement);
  mapBasicFilters.forEach(disableElement);
  disableElement(mapFeatureFilter);
};

const enablePage = () => {
  offerForm.classList.remove('ad-form--disabled');
  filterForm.classList.remove('map__filters--disabled');
  formElements.forEach(enableElement);
  mapBasicFilters.forEach(enableElement);
  enableElement(mapFeatureFilter);
};


export { disablePage, enablePage };
