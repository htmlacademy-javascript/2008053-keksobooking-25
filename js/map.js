import { enableForm } from './form-util.js';
import { map, mainMarker } from './map-util.js';

const addressForm = document.querySelector('#address');

const MAP_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const DEFAULT_LAT = 35.68172;
const DEFAULT_LNG = 139.75392;

map
  .on('load', () => {
    enableForm();
    addressForm.value = `${DEFAULT_LAT  }, ${  DEFAULT_LNG}`;
  })
  .setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG
  }, 13);

L
  .tileLayer(MAP_TILE_URL,
    {
      attribution: MAP_ATTRIBUTION,
    },
  )
  .addTo(map);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  addressForm.value = `${Number(evt.target.getLatLng().lat).toFixed(5)  }, ${  Number(evt.target.getLatLng().lng).toFixed(5)}`;
});
