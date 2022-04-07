import { debounce } from './util.js';
import { markerGroup, resetMap, createPoints } from './map-util.js';
import { mapFiltersContainer } from './elements.js';

const DEFAULT_FILTER_INDEX = 0;

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const FILTERS = ['type', 'price', 'rooms', 'guests'];

const FilterValues = {
  TYPE: 'type',
  PRICE: 'price',
  ROOMS: 'rooms',
  GUESTS: 'guests'
};

const PriceRanges = {
  MID: 'middle',
  HIGH: 'high',
  LOW: 'low'
};

const PriceMargins = {
  TOP: 50000,
  BOTTOM: 10000
};

const mapFilters = mapFiltersContainer.querySelectorAll('.map__filter');
const mapFeatureFiltersContainer = mapFiltersContainer.querySelector('#housing-features');
const mapFeatureFilters = mapFeatureFiltersContainer.querySelectorAll('.map__checkbox');

let selectedFilters = [];
let selectedFeatures = [];

const filterPrice = (price, range) => {
  switch (range) {
    case PriceRanges.MID:
      return price <= PriceMargins.TOP && price >= PriceMargins.BOTTOM;
    case PriceRanges.HIGH:
      return price > PriceMargins.TOP;
    case PriceRanges.LOW:
      return price < PriceMargins.BOTTOM;
  }
};

const filterPoints = (offers) => {
  const type = selectedFilters[FILTERS.indexOf(FilterValues.TYPE)];
  const price = selectedFilters[FILTERS.indexOf(FilterValues.PRICE)];
  const rooms = selectedFilters[FILTERS.indexOf(FilterValues.ROOMS)];
  const guests = selectedFilters[FILTERS.indexOf(FilterValues.GUESTS)];

  let filteredData = offers;

  markerGroup.clearLayers();
  resetMap();

  if (type) {
    filteredData = filteredData.filter((element) => element.offer.type === type);
  }
  if (price) {
    filteredData = filteredData.filter((element) => filterPrice(element.offer.price, price));
  }
  if (rooms) {
    filteredData = filteredData.filter((element) => element.offer.rooms === Number(rooms));
  }
  if (guests) {
    filteredData = filteredData.filter((element) => element.offer.guests === Number(guests));
  }
  if (selectedFeatures.length !== 0) {
    for (let i = 0; i < selectedFeatures.length; i++) {
      filteredData = filteredData.filter((element) => element.offer.features && (element.offer.features).includes(selectedFeatures[i]));
    }
  }

  createPoints(filteredData);
};

const addFilterHandlers = (offers) => (filter, index) => {
  filter.addEventListener('change', debounce(() => {
    selectedFilters[index] = '';
    if (filter.selectedIndex !== DEFAULT_FILTER_INDEX) {
      selectedFilters[index] = filter.value;
    }
    filterPoints(offers);
  }));
};

const addFeatureFilterHandlers = (offers) => (feature, index) => {
  feature.addEventListener('change', debounce(() => {
    selectedFeatures = selectedFeatures.filter((element) => element !== FEATURES[index]);
    if (mapFeatureFilters[index].checked) {
      selectedFeatures.push(FEATURES[index]);
    }
    filterPoints(offers);
  }));
};

const addMapFilterHandlers = (offers) => {
  mapFilters.forEach(addFilterHandlers(offers));
  mapFeatureFilters.forEach(addFeatureFilterHandlers(offers));
};

const resetMapFilters = () => {
  selectedFilters = [];
  selectedFeatures = [];

  mapFilters.forEach((filter) => {
    filter.selectedIndex = DEFAULT_FILTER_INDEX;
  });
  mapFeatureFilters.forEach((filter) => {
    filter.checked = false;
  });
};

export { addMapFilterHandlers, resetMapFilters };
