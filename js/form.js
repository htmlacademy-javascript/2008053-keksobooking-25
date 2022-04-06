import './form-validation.js';
import './form-images.js';
import { formReset } from './form-util.js';
import { disablePage } from './form-util.js';

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

typeMenu.addEventListener('change', () => {
  priceForm.min = minPrices[typeMenu.value];
  priceForm.placeholder = `От ${  minPrices[typeMenu.value]} ₽/ночь`;
});

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
