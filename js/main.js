import './form-util.js';
import './form-validation.js';
import './slider.js';
import './map.js';
import { addMapFilterHandlers } from './map-filters.js';
import { createPoints } from './map-util.js';
import { getData } from './api.js';

const offers = getData((data) => data.slice());

const fillMap = async () => {
  const offersData = await offers;

  createPoints(offersData);
  addMapFilterHandlers(offersData);
};

fillMap();
