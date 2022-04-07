import { makeCard } from './cards.js';

const MAX_SIMILAR_OFFERS = 10;

const MAP_CLASS = 'map-canvas';
const DEFAULT_LAT = 35.68172;
const DEFAULT_LNG = 139.75392;

const MAIN_PIN_URL = './img/main-pin.svg';
const MAIN_PIN_SIZE_VALUES = [52, 52];
const MAIN_PIN_ANCHOR_VALUES = [26, 52];

const PIN_URL = './img/pin.svg';
const PIN_SIZE_VALUES = [40, 40];
const PIN_ANCHOR_VALUES = [20, 40];

const map = L.map(MAP_CLASS);

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_URL,
  iconSize: MAIN_PIN_SIZE_VALUES,
  iconAnchor: MAIN_PIN_ANCHOR_VALUES
});

const mainMarker = L.marker(
  {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG
  },
  {
    draggable: true,
    icon: mainPinIcon
  },
);

const pinIcon = L.icon({
  iconUrl: PIN_URL,
  iconSize: PIN_SIZE_VALUES,
  iconAnchor: PIN_ANCHOR_VALUES
});

const markerGroup = L.layerGroup().addTo(map);

const resetMap = () => {
  map.setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG
  }, 13)
    .closePopup();
  mainMarker.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG
  });
  markerGroup.clearLayers();
};

const createMarker = (offer) => {
  L.marker([offer.location.lat, offer.location.lng],
    {
      pinIcon,
    })
    .addTo(markerGroup)
    .bindPopup(makeCard(offer));
};

const createPoints = (offers) => {
  offers.slice(0, MAX_SIMILAR_OFFERS).forEach(createMarker);
};

export { map, mainMarker, markerGroup, resetMap, createPoints };
