const offerSection = document.querySelector('.notice');
const offerForm = offerSection.querySelector('.ad-form');
const typeMenu = offerForm.querySelector('#type');
const priceForm = offerForm.querySelector('#price');
const sliderElement = offerForm.querySelector('.ad-form__slider');
const DEFAULT_PRICE = 1000;
const MAX_PRICE = 100000;

const updateSlider = () => {
  const minPrice = Number(priceForm.getAttribute('min'));
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minPrice,
      max: MAX_PRICE
    }
  });
  sliderElement.noUiSlider.set(priceForm.value);
};

const sliderReset = () => {
  sliderElement.noUiSlider.updateOptions({
    start: DEFAULT_PRICE
  });
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_PRICE,
    max: MAX_PRICE,
  },
  start: DEFAULT_PRICE,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

sliderElement.noUiSlider.on('slide', () => {
  priceForm.value = sliderElement.noUiSlider.get();
});

typeMenu.addEventListener('change', updateSlider);

export {sliderReset};

