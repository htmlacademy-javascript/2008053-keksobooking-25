import { getData } from'./api.js';
import './form-util.js';
import './form-validation.js';
import './slider.js';
import './map.js';
import  {createMarker} from './map.js';

const MAX_SIMILAR_OFFERS = 10;

const points = async () => await getData();

points()
  .then((data) => {
    data.slice(0, MAX_SIMILAR_OFFERS).forEach(createMarker);
  });
