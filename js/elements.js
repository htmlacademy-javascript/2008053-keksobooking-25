const mapSection = document.querySelector('.map');
const mapFiltersContainer = mapSection.querySelector('.map__filters-container');
const mapFilterForm = mapFiltersContainer.querySelector('.map__filters');

const offerFormSection = document.querySelector('.notice');
const offerForm = offerFormSection.querySelector('.ad-form');
const titleForm = offerForm.querySelector('#title');
const typeMenu = offerForm.querySelector('#type');
const priceForm = offerForm.querySelector('#price');
const sliderElement = offerForm.querySelector('.ad-form__slider');
const roomNumber = offerForm.querySelector('#room_number');
const capacityForm = offerForm.querySelector('#capacity');
const timeIn = offerForm.querySelector('#timein');
const timeOut = offerForm.querySelector('#timeout');

export {mapSection, mapFiltersContainer, mapFilterForm, offerForm, titleForm, typeMenu, priceForm, sliderElement, roomNumber, capacityForm, timeIn, timeOut};
