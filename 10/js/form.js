import { disableElement, enableElement } from './util.js';

const offerForm = document.querySelector('.ad-form');
const formElements = offerForm.querySelectorAll('.ad-form__element');
const mapFilterForm = document.querySelector('.map__filters');
const mapBasicFilters = mapFilterForm.querySelectorAll('.map__filter');
const mapFeatureFilter = mapFilterForm.querySelector('.map__features');
const sliderElement = offerForm.querySelector('.ad-form__slider');

const disablePage = () => {
  offerForm.classList.add('ad-form--disabled');
  mapFilterForm.classList.add('map__filters--disabled');
  formElements.forEach(disableElement);
  mapBasicFilters.forEach(disableElement);
  disableElement(mapFeatureFilter);
  disableElement(sliderElement);
};

const enablePage = () => {
  offerForm.classList.remove('ad-form--disabled');
  mapFilterForm.classList.remove('map__filters--disabled');
  formElements.forEach(enableElement);
  mapBasicFilters.forEach(enableElement);
  enableElement(mapFeatureFilter);
  enableElement(sliderElement);
};

disablePage();

export { enablePage };
