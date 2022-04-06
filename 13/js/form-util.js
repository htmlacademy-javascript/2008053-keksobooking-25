import { disableElement, enableElement } from './util.js';
import { openUserModal } from './form-modal.js';
import { mapReset } from './map-util.js';
import { sliderReset } from './slider.js';
import { imageFormReset } from './form-images.js';


const offerForm = document.querySelector('.ad-form');

const formElements = offerForm.querySelectorAll('.ad-form__element');
const mapFilterFormContainer = document.querySelector('.map__filters-container');
const mapFilterForm = mapFilterFormContainer.querySelector('.map__filters');
const mapBasicFilters = mapFilterForm.querySelectorAll('.map__filter');
const mapFeatureFilter = mapFilterForm.querySelector('.map__features');
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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};
const formReset = () => {
  mapReset();
  sliderReset();
  imageFormReset();
};

const formSuccess = () => {
  openUserModal(successTemplate);
  offerForm.reset();
  formReset();
  unblockSubmitButton();
};

const formError = () => {
  openUserModal(errorTemplate);
  unblockSubmitButton();
};

export { disablePage, enableForm, enableMapFilters, blockSubmitButton, formReset, formSuccess, formError };
