import { getData } from './api.js';
import './form-util.js';
import './form-validation.js';
import './slider.js';
import './map.js';
import { createPoints } from './map-util.js';
import { addMapFilterHandlers } from './map-filters.js';

const offers = getData();

createPoints(offers);
addMapFilterHandlers(offers);
