import { disableElement, enableElement } from './util.js';
import { openUserModal } from './form-modal.js';
import { resetMap } from './map-util.js';
import { resetSlider } from './slider.js';
import { resetImagePreviews } from './form-images.js';
import { resetValidation } from './form-validation.js';
import { resetMapFilters } from './map-filters.js';
import { fillMap } from './data.js';
import { offerForm, mapFilterForm } from './elements.js';

const mapBasicFilters = mapFilterForm.querySelectorAll('.map__filter');
const mapFeatureFilter = mapFilterForm.querySelector('.map__features');

const formElements = offerForm.querySelectorAll('.ad-form__element');
const sliderElement = offerForm.querySelector('.ad-form__slider');

const submitButton = offerForm.querySelector('.ad-form__submit');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const disablePage = () => {
  offerForm.classList.add('ad-form--disabled');
  mapFilterForm.classList.add('map__filters--disabled');
  formElements.forEach(disableElement);
  mapBasicFilters.forEach(disableElement);
  disableElement(mapFeatureFilter);
  disableElement(sliderElement);
};

const enableForm = () => {
  offerForm.classList.remove('ad-form--disabled');
  formElements.forEach(enableElement);
  enableElement(sliderElement);
};

const enableMapFilters = () => {
  mapFilterForm.classList.remove('map__filters--disabled');
  mapBasicFilters.forEach(enableElement);
  enableElement(mapFeatureFilter);
};

const lockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetFormElements = () => {
  resetMap();
  resetSlider();
  resetImagePreviews();
  resetValidation();
  resetMapFilters();
  fillMap();
};

const formSuccess = () => {
  openUserModal(successTemplate);
  offerForm.reset();
  resetFormElements();
  unlockSubmitButton();
};

const formError = () => {
  openUserModal(errorTemplate);
  unlockSubmitButton();
};

export { disablePage, enableForm, enableMapFilters, lockSubmitButton, resetFormElements, formSuccess, formError };
