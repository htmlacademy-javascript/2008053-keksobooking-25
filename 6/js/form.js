import { winX, winY, disableElement, enableElement, disableWindowScroll, enableWindowScroll } from './util.js';

const offerForm = document.querySelector('.ad-form');
const formElements = offerForm.querySelectorAll('.ad-form__element');
const filterForm = document.querySelector('.map__filters');
const mapBasicFilters = document.querySelectorAll('.map__filters');
const mapFeatureFilter = document.querySelector('.map__features');

const disablePage = () => {
  offerForm.classList.toggle('ad-form', false);
  offerForm.classList.toggle('ad-form--disabled', true);
  formElements.forEach(disableElement);
  filterForm.classList.toggle('map__filters', false);
  filterForm.classList.toggle('map__filters--disabled', true);
  mapBasicFilters.forEach(disableElement);
  disableElement(mapFeatureFilter);
  disableWindowScroll();
};

const enablePage = () => {
  offerForm.classList.toggle('ad-form', true);
  offerForm.classList.toggle('ad-form--disabled', false);
  formElements.forEach(enableElement);
  filterForm.classList.toggle('map__filters', true);
  filterForm.classList.toggle('map__filters--disabled', false);
  mapBasicFilters.forEach(enableElement);
  enableElement(mapFeatureFilter);
  enableWindowScroll();
};

window.addEventListener('scroll', () => {
  if (winX !== -1 && winY !== -1) {
    window.scrollTo(winX, winY);
  }
});

export {disablePage, enablePage};
