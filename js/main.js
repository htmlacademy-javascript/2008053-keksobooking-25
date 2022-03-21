import {cardsListFragment} from './cards.js';
import {disablePage, enablePage} from './form.js';
import './form-validation.js';


document.querySelector('#map-canvas').appendChild(cardsListFragment.children[0]);

disablePage();
enablePage();
