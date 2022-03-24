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
  sliderElement.setAttribute('disabled', true);
  formElements.forEach(disableElement);
  mapBasicFilters.forEach(disableElement);
  disableElement(mapFeatureFilter);
};

const enablePage = () => {
  offerForm.classList.remove('ad-form--disabled');
  mapFilterForm.classList.remove('map__filters--disabled');
  sliderElement.removeAttribute('disabled');
  formElements.forEach(enableElement);
  mapBasicFilters.forEach(enableElement);
  enableElement(mapFeatureFilter);
};


export { disablePage, enablePage };
