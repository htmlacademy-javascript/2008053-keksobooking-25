import { debounce } from './util.js';
import { offers } from './api.js';
import { markerGroup, createMarker, mapReset } from './map-util.js';

const mapFiltersContainer = document.querySelector('.map__filters-container');
const mapFilters = mapFiltersContainer.querySelectorAll('.map__filter');
const mapFeatureFiltersContainer = mapFiltersContainer.querySelector('#housing-features');
const mapFeatureFilters = mapFeatureFiltersContainer.querySelectorAll('.map__checkbox');

const MAX_SIMILAR_OFFERS = 10;
const DEFAULT_FILTER_INDEX = 0;

const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const filters = ['type', 'price', 'rooms', 'guests'];

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

const priceMargins = {
  high: 50000,
  low: 10000
};

const selectedFilters = [];

const offersData = offers;

let selectedFeatures = [];

const filterPrice = (price, range) => {
  switch (range) {
    case PriceRanges.MID:
      return price <= priceMargins.high && price >= priceMargins.low;
    case PriceRanges.HIGH:
      return price > priceMargins.high;
    case PriceRanges.LOW:
      return price < priceMargins.low;
  }
};

const filterPoints = async () => {
  const type = selectedFilters[filters.indexOf(FilterValues.TYPE)];
  const price = selectedFilters[filters.indexOf(FilterValues.PRICE)];
  const rooms = selectedFilters[filters.indexOf(FilterValues.ROOMS)];
  const guests = selectedFilters[filters.indexOf(FilterValues.GUESTS)];

  let filteredData = await offersData;

  markerGroup.clearLayers();
  mapReset();

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
  if (selectedFeatures !== []) {
    for (let i = 0; i < selectedFeatures.length; i++) {
      filteredData = filteredData.filter((element) => element.offer.features && (element.offer.features).includes(selectedFeatures[i]));
    }
  }

  filteredData.slice(0, MAX_SIMILAR_OFFERS).forEach(createMarker);
};

const addFeatureFilterHandlers = (feature, index) => {
  feature.addEventListener('change', debounce(() => {
    selectedFeatures = selectedFeatures.filter((element) => element !== features[index]);
    if (mapFeatureFilters[index].checked) {
      selectedFeatures.push(features[index]);
    }
    filterPoints();
  }));
};

const addFilterHandlers = (filter, index) => {
  filter.addEventListener('change', debounce(() => {
    selectedFilters[index] = '';
    if (filter.selectedIndex !== DEFAULT_FILTER_INDEX) {
      selectedFilters[index] = filter.value;
    }
    filterPoints();
  }));
};

const addMapFilterHandlers = () => {
  mapFilters.forEach(addFilterHandlers);
  mapFeatureFilters.forEach(addFeatureFilterHandlers);
};

addMapFilterHandlers();
