import { disablePage, enablePage } from './form.js';
import { makeCard } from './cards.js';
import { makeOffersList } from './data.js';

disablePage();

const points = makeOffersList();

const map = L.map('map-canvas')
  .on('load', () => {
    enablePage();
    document.querySelector('#address').value = '35.68172, 139.75392';
  })
  .setView({
    lat: 35.68172,
    lng: 139.75392,
  }, 12);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.68172,
    lng: 139.75392,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (data) => {
  L.marker([data.location.lat, data.location.lng],
    {
      icon,
    })
    .addTo(markerGroup)
    .bindPopup(makeCard(data));
};

points.forEach(createMarker);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  document.querySelector('#address').value = `${Number(evt.target.getLatLng().lat).toFixed(5)  }, ${  Number(evt.target.getLatLng().lng).toFixed(5)}`;
});
