import { addMapFilterHandlers } from './map-filters.js';
import { createPoints } from './map-util.js';
import { getData } from './api.js';
import { enableMapFilters } from './form-util.js';
import { createDataErrorModal } from './data-modal.js';

const fillMap = () => {
  getData((data) => {
    createPoints(data);
    addMapFilterHandlers(data);
    enableMapFilters();
  }, createDataErrorModal);
};

export { fillMap };
