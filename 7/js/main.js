import {cardsListFragment} from './cards.js';
import {disablePage, enablePage} from './form.js';
import {validateForm} from './form-validation.js';


//Скрыл элемент прошлого дз
cardsListFragment.children[0].classList.add('hidden');
document.querySelector('#map-canvas').appendChild(cardsListFragment.children[0]);

disablePage();
enablePage();

window.onload = validateForm;
