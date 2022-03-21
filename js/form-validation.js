const offerSection = document.querySelector('.notice');
const offerForm = offerSection.querySelector('.ad-form');
const typeMenu = offerForm.querySelector('#type');
const priceForm = offerForm.querySelector('#price');
const roomNumber = offerForm.querySelector('#room_number');
const capacity = offerForm.querySelector('#capacity');
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

function getPriceErrorMessage() {
  return `Для данного типа жилья минимальная стоимость ${  minPrices[typeMenu.value]}`;
}

function getCapacityErrorMessage () {
  if (Number(roomNumber.value) === MAX_ROOMS) {
    return 'Выберите "не для гостей"';
  }
  return `Не больше ${  roomNumber.value  } гостей`;
}

function validateCapacity() {
  if (roomNumber.value >= capacity.value && Number(roomNumber.value) < MAX_ROOMS && Number(capacity.value) !== 0 || Number(roomNumber.value) === MAX_ROOMS && Number(capacity.value) === 0) {
    return true;
  }
  return false;
}

function validatePrice() {
  if (priceForm.value < minPrices[typeMenu.value]) {
    return false;
  }
  return true;
}

pristine.addValidator(priceForm, validatePrice, getPriceErrorMessage, 2, true);
pristine.addValidator(capacity, validateCapacity, 'Количество гостей должно соответствовать количеству комнат', 2, true);
pristine.addValidator(roomNumber, validateCapacity, getCapacityErrorMessage, 2, true);

typeMenu.addEventListener('change', () => {
  priceForm.min = minPrices[typeMenu.value];
  priceForm.placeholder = minPrices[typeMenu.value];
});

offerForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
