const offerSection = document.querySelector('.notice');
const offerForm = offerSection.querySelector('.ad-form');
const typeMenu = offerForm.querySelector('#type');
const priceForm = offerForm.querySelector('#price');
const roomNumber = offerForm.querySelector('#room_number');
const capacity = offerForm.querySelector('#capacity');
const pristine = new Pristine(offerForm);
const MAX_ROOMS = 100;

const minPrices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

pristine.addValidator(capacity, () => {
  if (roomNumber.value >= capacity.value && roomNumber.value < MAX_ROOMS && capacity.value !== '0' || roomNumber.value >= MAX_ROOMS && capacity.value === '0') {
    return true;
  }
  return false;
}, 'Количество гостей должно соответствовать количеству комнат!');


const validateForm = () => {
  typeMenu.addEventListener('change', () => {
    priceForm.min = minPrices[typeMenu.value];
    priceForm.placeholder = minPrices[typeMenu.value];
  });

  offerForm.addEventListener('submit', () => {
    pristine.validate();
  });
};

export { validateForm };
