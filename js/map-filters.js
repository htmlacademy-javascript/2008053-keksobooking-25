import { debounce } from './util.js';
import { offersData } from './api.js';
import { markerGroup, createMarker, mapReset } from './map-util.js';

const mapFiltersContainer = document.querySelector('.map__filters-container');
const mapFilters = mapFiltersContainer.querySelectorAll('.map__filter');
const mapFeatureFiltersContainer = mapFiltersContainer.querySelector('#housing-features');
const mapFeatureFilters = mapFeatureFiltersContainer.querySelectorAll('.map__checkbox');

const MAX_SIMILAR_OFFERS = 10;
const DEFAULT_FILTER_INDEX = 0;

const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const Filters = {
  TYPE: 0,
  PRICE: 1,
  ROOMS: 2,
  GUESTS: 3
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
  const offers = await offersData();
  let filteredData = offers;

  markerGroup.clearLayers();
  mapReset();

  if (selectedFilters[Filters.TYPE]) {
    filteredData = filteredData.filter((element) => element.offer.type === selectedFilters[Filters.TYPE]);
  }
  if (selectedFilters[Filters.PRICE]) {
    filteredData = filteredData.filter((element) => filterPrice(element.offer.price, selectedFilters[Filters.PRICE]));
  }
  if (selectedFilters[Filters.ROOMS]) {
    filteredData = filteredData.filter((element) => element.offer.rooms === Number(selectedFilters[Filters.ROOMS]));
  }
  if (selectedFilters[Filters.GUESTS]) {
    filteredData = filteredData.filter((element) => element.offer.guests === Number(selectedFilters[Filters.GUESTS]));
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
