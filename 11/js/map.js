import { enablePage } from './form-util.js';
import { makeCard } from './cards.js';
import { getData } from './api.js';
import { resetSlider } from './slider.js';

const offerSection = document.querySelector('.notice');
const offerForm = offerSection.querySelector('.ad-form');
const offerTitle = offerForm.querySelector('#title');
const addressForm = document.querySelector('#address');
const typeMenu = offerForm.querySelector('#type');
const priceForm = offerForm.querySelector('#price');
const roomNumber = offerForm.querySelector('#room_number');
const capacityForm = offerForm.querySelector('#capacity');

const DEFAULT_TYPE = 1;
const DEFAULT_ROOMS_CAPACITY = 1;
const DEFAULT_LAT = 35.68172;
const DEFAULT_LNG = 139.75392;


const MAIN_PIN_URL = './img/main-pin.svg';
const MAIN_PIN_SIZE = [52, 52];
const MAIN_PIN_ANCHOR = [26, 52];

const PIN_URL = './img/pin.svg';
const PIN_SIZE = [40, 40];
const PIN_ANCHOR = [20, 40];


const map = L.map('map-canvas')
  .on('load', () => {
    enablePage();
    addressForm.value = `${DEFAULT_LAT  }, ${  DEFAULT_LNG}`;
  })
  .setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG
  }, 13);

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_URL,
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR
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
  iconSize: PIN_SIZE,
  iconAnchor: PIN_ANCHOR
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (data) => {
  L.marker([data.location.lat, data.location.lng],
    {
      pinIcon,
    })
    .addTo(markerGroup)
    .bindPopup(makeCard(data));
};

const formReset = () => {
  offerTitle.value = '';
  addressForm.value = `${DEFAULT_LAT  }, ${  DEFAULT_LNG}`;
  priceForm.value = '';
  priceForm.placeholder = 'От 1000 ₽/ночь';
  resetSlider();
  typeMenu.selectedIndex = DEFAULT_TYPE;
  roomNumber.value = DEFAULT_ROOMS_CAPACITY;
  capacityForm.value = DEFAULT_ROOMS_CAPACITY;
  map.setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG
  }, 13);
  mainMarker.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG
  });
};

const points = async () => await getData();

points()
  .then((data) => {
    data.forEach(createMarker);
  });

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  addressForm.value = `${Number(evt.target.getLatLng().lat).toFixed(5)  }, ${  Number(evt.target.getLatLng().lng).toFixed(5)}`;
});

export {formReset};
