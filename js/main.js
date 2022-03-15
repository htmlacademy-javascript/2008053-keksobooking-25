import {cardsListFragment} from './cards.js';
import {disablePage, enablePage} from './form.js';

//Скрыл элемент прошлого дз
cardsListFragment.children[0].classList.add('hidden');
document.querySelector('#map-canvas').appendChild(cardsListFragment.children[0]);

disablePage();
enablePage();
