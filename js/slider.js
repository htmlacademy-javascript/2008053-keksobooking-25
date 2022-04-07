import { typesToMinPrices, Prices } from './util.js';
import { typeMenu, priceForm, sliderElement  } from './elements.js';

const DEFAULT_PRICE_PLACEHOLDER = `От ${  Prices.DEFAULT} ₽/ночь`;

const typeChangeHandler = () => {
  const MIN_PRICE = Number(typesToMinPrices[typeMenu.value]);
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: MIN_PRICE,
      max: Prices.MAX
    }
  });
};

const priceChangeHandler = () => {
  sliderElement.noUiSlider.set(priceForm.value);
};

const resetSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    start: Prices.DEFAULT
  });
  priceForm.placeholder = DEFAULT_PRICE_PLACEHOLDER;
};

noUiSlider.create(sliderElement, {
  range: {
    min: Prices.DEFAULT,
    max: Prices.MAX,
  },
  start: Prices.DEFAULT,
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

typeMenu.addEventListener('change', typeChangeHandler);
priceForm.addEventListener('change', priceChangeHandler);

export {resetSlider};

