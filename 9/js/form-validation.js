const offerSection = document.querySelector('.notice');
const offerForm = offerSection.querySelector('.ad-form');
const typeMenu = offerForm.querySelector('#type');
const priceForm = offerForm.querySelector('#price');
const roomNumber = offerForm.querySelector('#room_number');
const capacityForm = offerForm.querySelector('#capacity');
const MAX_ROOMS = 100;
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

const getCapacityErrorMessage = (value) => {
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
pristine.addValidator(capacityForm, validateCapacity, 'Количество гостей должно соответствовать количеству комнат', 2, true);
pristine.addValidator(roomNumber, validateCapacity, getCapacityErrorMessage, 2, true);

typeMenu.addEventListener('change', () => {
  priceForm.min = minPrices[typeMenu.value];
  priceForm.placeholder = `От ${  minPrices[typeMenu.value]}`;
});

offerForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export {offerForm, typeMenu, priceForm, minPrices};