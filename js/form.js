import './form-validation.js';
import './form-images.js';
import { disablePage, resetFormElements } from './form-util.js';
import { typesToMinPrices } from './util.js';
import { offerForm, typeMenu, priceForm, timeIn, timeOut } from './elements.js';

const typeMenuChangeHandler = () => {
  priceForm.min = typesToMinPrices[typeMenu.value];
  priceForm.placeholder = `От ${  priceForm.min} ₽/ночь`;
};

const offerFormResetHandler = () => resetFormElements();

typeMenu.addEventListener('change', typeMenuChangeHandler);

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

offerForm.addEventListener('reset', offerFormResetHandler);

disablePage();
