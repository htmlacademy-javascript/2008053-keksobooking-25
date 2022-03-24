import {offerForm, typeMenu, priceForm} from './form-validation.js';

const sliderElement = offerForm.querySelector('.ad-form__slider');

const updateSlider = () => {
  const minPrice = Number(priceForm.getAttribute('min'));
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minPrice,
      max: 100000
    }
  });
  sliderElement.noUiSlider.set(priceForm.value);

};

noUiSlider.create(sliderElement, {
  range: {
    min: 1000,
    max: 100000,
  },
  start: 1000,
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
