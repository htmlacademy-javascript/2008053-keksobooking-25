import './form-validation.js';
import './form-images.js';
import { disablePage, formReset } from './form-util.js';

const offerForm = document.querySelector('.ad-form');
const typeMenu = offerForm.querySelector('#type');
const priceForm = offerForm.querySelector('#price');
const timeIn = offerForm.querySelector('#timein');
const timeOut = offerForm.querySelector('#timeout');

const minPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const priceTypeFormHandler = () => {
  priceForm.setAttribute('min', minPrices[typeMenu.value]);
  priceForm.placeholder = `От ${  priceForm.min} ₽/ночь`;
};

typeMenu.addEventListener('change', () => priceTypeFormHandler());

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

offerForm.addEventListener('reset', () => {
  formReset();
});

disablePage();
