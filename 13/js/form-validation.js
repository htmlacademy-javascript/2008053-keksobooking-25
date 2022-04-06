import { sendData } from './api.js';
import { blockSubmitButton, formSuccess, formError } from './form-util.js';

const offerSection = document.querySelector('.notice');
const offerForm = offerSection.querySelector('.ad-form');
const typeMenu = offerForm.querySelector('#type');
const priceForm = offerForm.querySelector('#price');
const roomNumber = offerForm.querySelector('#room_number');
const capacityForm = offerForm.querySelector('#capacity');

const MAX_ROOMS = 100;
const CAPACITY_ERROR_MESSAGE = 'Количество гостей должно соответствовать количеству комнат';

const minPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'ad-form__error'
}, true);

const getPriceErrorMessage = () => `Для данного типа жилья минимальная стоимость ${  minPrices[typeMenu.value]}`;

const getRoomsErrorMessage = (value) => {
  const rooms = Number(value);
  if (rooms === MAX_ROOMS) {
    return 'Выберите "не для гостей"';
  }
  if (rooms === 1) {
    return `Не больше ${  rooms  } гостя`;
  }
  return `Не больше ${  rooms  } гостей`;

};

const validateCapacity = () => {
  const capacity = Number(capacityForm.value);
  const rooms = Number(roomNumber.value);
  return (rooms >= capacity && rooms < MAX_ROOMS && capacity !== 0 || rooms === MAX_ROOMS && capacity === 0);
};

const validatePrice = () => priceForm.value ? !(priceForm.value < minPrices[typeMenu.value]) : true;

pristine.addValidator(typeMenu, validatePrice, getPriceErrorMessage, 2, true);
pristine.addValidator(capacityForm, validateCapacity, CAPACITY_ERROR_MESSAGE, 2, true);
pristine.addValidator(roomNumber, validateCapacity, getRoomsErrorMessage, 2, true);

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(
      formSuccess,
      formError,
      new FormData(evt.target)
    );
  }
});
