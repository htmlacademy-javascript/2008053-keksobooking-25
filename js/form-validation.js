import { sendData } from './api.js';
import { blockSubmitButton, formSuccess, formError } from './form-util.js';

const offerForm = document.querySelector('.ad-form');
const titleForm = offerForm.querySelector('#title');
const typeMenu = offerForm.querySelector('#type');
const priceForm = offerForm.querySelector('#price');
const roomNumber = offerForm.querySelector('#room_number');
const capacityForm = offerForm.querySelector('#capacity');

const MAX_ROOMS = 100;
const PRICE_TOP_MARGIN = 100000;

const TITLE_LENGTH_ERROR_MESSAGE = 'От 30 до 100 символов';
const PRICE_TOP_MARGIN_ERROR_MESSAGE = 'Не более 100 000 ₽/ночь';
const CAPACITY_ERROR_MESSAGE = 'Количество гостей должно соответствовать количеству комнат';

const minPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const pristineConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'ad-form__error'
};

const pristine = new Pristine(offerForm, pristineConfig, true);

const getPriceErrorMessage = () => priceForm.value < PRICE_TOP_MARGIN ? `Для данного типа жилья минимальная стоимость ${  minPrices[typeMenu.value]} ₽/ночь` : PRICE_TOP_MARGIN_ERROR_MESSAGE;

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

const validateTitleLength = () => titleForm.value.length >= Number(titleForm.getAttribute('minlength')) && titleForm.value.length <= Number(titleForm.getAttribute('maxlength'));

const validateCapacity = () => {
  const capacity = Number(capacityForm.value);
  const rooms = Number(roomNumber.value);
  return (rooms >= capacity && rooms < MAX_ROOMS && capacity !== 0 || rooms === MAX_ROOMS && capacity === 0);
};

const validatePrice = () => Number(priceForm.value) >= minPrices[typeMenu.value] && Number(priceForm.value) < PRICE_TOP_MARGIN;

const validationReset = () => {
  pristine.reset();
};

const validateForm = (target) => {
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(
      formSuccess,
      formError,
      new FormData(target)
    );
  }
};

pristine.addValidator(titleForm, validateTitleLength, TITLE_LENGTH_ERROR_MESSAGE, 2, true);
pristine.addValidator(priceForm, validatePrice, getPriceErrorMessage, 2, true);
pristine.addValidator(capacityForm, validateCapacity, CAPACITY_ERROR_MESSAGE, 2, true);
pristine.addValidator(roomNumber, validateCapacity, getRoomsErrorMessage, 2, true);

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  validateForm(evt.target);
});

export { validationReset };
