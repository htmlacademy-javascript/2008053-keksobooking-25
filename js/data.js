import { getRandomFloat, getRandomInteger } from './util.js';

const PLACE_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const PLACES = ['Токио', 'Осаке', 'Окинаве'];


function getAvatarNumber() {
  const usedNumbers = [];
  const imgNumber = Number(getRandomInteger(1, 10));
  if (!usedNumbers.includes(imgNumber)) {
    usedNumbers.push(imgNumber);
    if (imgNumber < 10) {
      return `0${  imgNumber}`;
    }
    return imgNumber;
  }
  getAvatarNumber();
}

function getAvatar() {
  return {
    avatar: `img/avatars/user${  getAvatarNumber()  }.png`
  };
}


function getFeatures() {
  return FEATURES.filter((feature) => feature.length > getRandomInteger(3, 11));
}

function getPhotos() {
  PHOTOS.length = getRandomInteger(1, 3);
  return PHOTOS;
}

function getOfferData() {
  return {
    title: 'Жилье в аренду',
    address: `${getLocation().lat  }, ${  getLocation().lng}`,
    price: getRandomInteger(1, 1000000),
    type: PLACE_TYPES[getRandomInteger(0, 4)],
    rooms: getRandomInteger(1, 100),
    checkin: CHECK_TIMES[getRandomInteger(0, 2)],
    checkout: CHECK_TIMES[getRandomInteger(0, 2)],
    features: getFeatures(),
    description: `Уютное жилье в ${  PLACES[getRandomInteger(0, 2)]}`,
    photos: getPhotos()
  };
}

function getLocation() {
  return {
    lat: getRandomFloat(35.65000, 35.70000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5)
  };
}

function makeOffer() {
  return {
    author: getAvatar(),
    offer: getOfferData(),
    location: getLocation()
  };
}

const makeOffersList = () => Array(10).fill(makeOffer());

export {makeOffersList};
