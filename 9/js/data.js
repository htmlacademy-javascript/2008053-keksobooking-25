import { getRandomFloat, getRandomInteger } from './util.js';

const TYPE_VALUES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const typeStrings = {
  palace: 'Роскошный дворец',
  flat: 'Стильная квартира',
  house: 'Прекрасный дом',
  bungalow: 'Уютное бунгало',
  hotel: 'Шикарный отель'
};

const getAvatarNumber = () => {
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
};

const getAvatar = () => ({
  avatar: `img/avatars/user${  getAvatarNumber()  }.png`
});

const getFeatures = () => FEATURES.filter((feature) => feature.length > getRandomInteger(3, 11));

const getLocation = () => ({
  lat: getRandomFloat(35.65000, 35.70000, 5),
  lng: getRandomFloat(139.70000, 139.80000, 5)
});

const getOfferData = () => {
  const placeType = TYPE_VALUES[getRandomInteger(0, 4)];
  const roomNumber = getRandomInteger(1, 100);

  return {
    title: 'Жилье в аренду',
    address: `${getLocation().lat  }, ${  getLocation().lng}`,
    price: getRandomInteger(1, 100000),
    type: placeType,
    rooms: roomNumber,
    guests: getRandomInteger(1, roomNumber),
    checkin: CHECK_TIMES[getRandomInteger(0, 2)],
    checkout: CHECK_TIMES[getRandomInteger(0, 2)],
    features: getFeatures(),
    description: `${typeStrings[placeType]  } в центре Токио`,
    photos: PHOTOS.slice(getRandomInteger(0, 2))
  };
};


const makeOffer = () => ({
  author: getAvatar(),
  offer: getOfferData(),
  location: getLocation()
});

const makeOffersList = () => Array.from({length: 10}, makeOffer);

export {makeOffersList};