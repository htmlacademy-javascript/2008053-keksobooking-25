const offerSection = document.getElementsByClassName('notice')[0];
const offerForm = offerSection.getElementsByClassName('ad-form')[0];
const typeMenu = document.getElementById('type');
const priceForm = document.getElementById('price');
const roomNumber = document.getElementById('room_number');
const capacity = document.getElementById('capacity');
const pristine = new Pristine(offerForm);

const MIN_PRICES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

pristine.addValidator(capacity, () => {
  if (roomNumber.value > capacity.value && roomNumber.value < 100 && capacity.value !== 0 || roomNumber.value >= 100 && capacity.value === 0) {
    return true;
  }
  return false;
}, 'Количество гостей должно соответствовать количеству комнат!');

const validateForm = () => {
  typeMenu.addEventListener('change', () => {
    priceForm.min = MIN_PRICES[typeMenu.value];
    priceForm.placeholder = MIN_PRICES[typeMenu.value];
  });

  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export { validateForm };
