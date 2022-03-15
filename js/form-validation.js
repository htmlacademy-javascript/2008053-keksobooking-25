const offerForm = document.querySelector('.ad-form');
const typeMenu = document.getElementById('type');
const priceForm = document.getElementById('price');

const validateForm = () => {

  typeMenu.addEventListener('change', () => {
    const MIN_PRICES = {
      bungalow: 0,
      flat: 1000,
      hotel: 3000,
      house: 5000,
      palace: 10000
    };

    priceForm.min = MIN_PRICES[typeMenu.value];
    priceForm.placeholder = MIN_PRICES[typeMenu.value];
  });

  offerForm.addEventListener('submit', (evt) => {
    const pristine = new Pristine();
    evt.preventDefault();
    pristine.validate();
  });
};

export { validateForm };
