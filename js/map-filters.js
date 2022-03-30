import { debounce } from './util.js';
import { markerGroup, createMarker, mapReset, points } from './map-util.js';

const mapFiltersContainer = document.querySelector('.map__filters-container');
const mapTypeFilter = mapFiltersContainer.querySelector('#housing-type');
const mapPriceFilter = mapFiltersContainer.querySelector('#housing-price');
const mapRoomsFilter = mapFiltersContainer.querySelector('#housing-rooms');
const mapCapactityFilter = mapFiltersContainer.querySelector('#housing-guests');
const mapFeatureFiltersContainer = mapFiltersContainer.querySelector('#housing-features');
const mapFeatureFilters = mapFeatureFiltersContainer.querySelectorAll('.map__checkbox');

const MAX_SIMILAR_OFFERS = 10;
const DEFAULT_FILTER_INDEX = 0;

const priceRanges = {
  middle: 'middle',
  high: 'high',
  low: 'low'
};

const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const priceMargins = {
  high: 50000,
  low: 10000
};

let selectedType, selectedPriceRange, selectedRooms, selectedCapacity;
let selectedFeatures = [];

const filterPrice = (price, range) => {
  switch (range) {
    case priceRanges.middle:
      return price <= priceMargins.high && price >= priceMargins.low;
    case priceRanges.high:
      return price > priceMargins.high;
    case priceRanges.low:
      return price < priceMargins.low;
  }
};

const filterPoints = () => {
  markerGroup.clearLayers();
  mapReset();
  points()
    .then((data) => {
      let filteredData = data;

      if (selectedType) {
        filteredData = filteredData.filter((element) => element.offer.type === selectedType);
      }

      if (selectedPriceRange) {
        filteredData = filteredData.filter((element) => filterPrice(element.offer.price, selectedPriceRange));
      }

      if (selectedRooms) {
        filteredData = filteredData.filter((element) => element.offer.rooms === selectedRooms);
      }

      if (selectedCapacity) {
        filteredData = filteredData.filter((element) => element.offer.guests === selectedCapacity);
      }

      if (selectedFeatures !== []) {
        for (let i = 0; i < selectedFeatures.length; i++) {
          filteredData = filteredData.filter((element) => element.offer.features && (element.offer.features).includes(selectedFeatures[i]));
        }
      }

      filteredData.slice(0, MAX_SIMILAR_OFFERS).forEach(createMarker);
    });
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

mapTypeFilter.addEventListener('change', debounce(() => {
  selectedType = '';

  if (mapTypeFilter.selectedIndex !== DEFAULT_FILTER_INDEX) {
    selectedType = mapTypeFilter.value;
  }

  filterPoints();
}));

mapPriceFilter.addEventListener('change', debounce(() => {
  selectedPriceRange = '';

  if (mapPriceFilter.selectedIndex !== DEFAULT_FILTER_INDEX) {
    selectedPriceRange = mapPriceFilter.value;
  }

  filterPoints();
}));

mapRoomsFilter.addEventListener('change', debounce(() => {
  selectedRooms = '';

  if (mapRoomsFilter.selectedIndex !== DEFAULT_FILTER_INDEX) {
    selectedRooms = Number(mapRoomsFilter.value);
  }

  filterPoints();
}));

mapCapactityFilter.addEventListener('change', debounce(() => {
  selectedCapacity = '';

  if (mapCapactityFilter.selectedIndex !== DEFAULT_FILTER_INDEX) {
    selectedCapacity = Number(mapCapactityFilter.value);
  }

  filterPoints();
}));

mapFeatureFilters.forEach(addFeatureFilterHandlers);
