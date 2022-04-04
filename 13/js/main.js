import './form-util.js';
import './form-validation.js';
import './slider.js';
import './map.js';
import { createDataErrorModal } from './form-modal.js';
import { addMapFilterHandlers } from './map-filters.js';
import { createPoints } from './map-util.js';
import { getData } from './api.js';
import './images-upload.js';

getData((data) => {
  createPoints(data);
  addMapFilterHandlers(data);
}, createDataErrorModal);
