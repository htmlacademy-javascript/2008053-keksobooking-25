import { sendData } from './api.js';
import { lockSubmitButton, formSuccess, formError } from './form-util.js';
import { typesToMinPrices } from './util.js';
import { offerForm, titleForm, typeMenu, priceForm, roomNumber, capacityForm } from './elements.js';

const MAX_ROOMS = 100;
const SINGLE_ROOM = 1;

const TITLE_LENGTH_ERROR_MESSAGE = 'От 30 до 100 символов';
const CAPACITY_ERROR_MESSAGE = 'Количество гостей должно соответствовать количеству комнат';
const PRICE_MIN_ERROR_MESSAGE = `Для данного типа жилья минимальная стоимость ${  typesToMinPrices[typeMenu.value]} ₽/ночь`;

const pristineConfig = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'ad-form__error'
};

const pristine = new Pristine(offerForm, pristineConfig, true);

const getRoomsErrorMessage = (value) => {
  const rooms = Number(value);
  if (rooms === MAX_ROOMS) {
    return 'Выберите "не для гостей"';
  }
  if (rooms === SINGLE_ROOM) {
    return `Не больше ${  rooms  } гостя`;
  }
  return `Не больше ${  rooms  } гостей`;

};

const validateTitleLength = () => titleForm.value.length >= Number(titleForm.getAttribute('minlength')) && titleForm.value.length <= Number(titleForm.getAttribute('maxlength'));

const validatePrice = () => Number(priceForm.value) >= typesToMinPrices[typeMenu.value];

const validateCapacity = () => {
  const capacity = Number(capacityForm.value);
  const rooms = Number(roomNumber.value);
  return (rooms >= capacity && rooms < MAX_ROOMS && capacity !== 0 || rooms === MAX_ROOMS && capacity === 0);
};

const resetValidation = () => pristine.reset();

const offerFormSubmitHandler = (evt) => {
  const isValid = pristine.validate();
  evt.preventDefault();

  if (isValid) {
    lockSubmitButton();
    sendData(
      formSuccess,
      formError,
      new FormData(evt.target)
    );
  }
};

pristine.addValidator(titleForm, validateTitleLength, TITLE_LENGTH_ERROR_MESSAGE, 2, true);
pristine.addValidator(priceForm, validatePrice, PRICE_MIN_ERROR_MESSAGE, 2, true);
pristine.addValidator(capacityForm, validateCapacity, CAPACITY_ERROR_MESSAGE, 2, true);
pristine.addValidator(roomNumber, validateCapacity, getRoomsErrorMessage, 2, true);

offerForm.addEventListener('submit', (evt) => offerFormSubmitHandler(evt));

export { resetValidation };
