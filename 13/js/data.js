import { createDataErrorModal } from './form-modal.js';
import { addMapFilterHandlers } from './map-filters.js';
import { createPoints } from './map-util.js';
import { getData } from './api.js';

const fillMap = () => {
  getData((data) => {
    createPoints(data);
    addMapFilterHandlers(data);
  }, createDataErrorModal);
};

export { fillMap };
