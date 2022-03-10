import { makeOffersList } from './data.js';
const mockData = makeOffersList();
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardsListFragment = document.createDocumentFragment();

const typeTranslation = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

mockData.forEach((element) => {
  const card = cardTemplate.cloneNode(true);
  const userAvatar = card.querySelector('.popup__avatar');
  const titleText = card.querySelector('.popup__title');
  const addressText = card.querySelector('.popup__text--address');
  const priceText = card.querySelector('.popup__text--price');
  const typeText = card.querySelector('.popup__type');
  const capactityText = card.querySelector('.popup__text--capacity');
  const timeText = card.querySelector('.popup__text--time');
  const featuresText = card.querySelector('.popup__features');
  const descriptionText = card.querySelector('.popup__description');
  const offerPhotos = card.querySelector('.popup__photos');
  const offerPhoto = card.querySelector('.popup__photo');
  const photosArray = element.offer.photos;

  userAvatar.src = element.author.avatar;
  titleText.textContent = element.offer.title;
  addressText.textContent = element.offer.address;
  priceText.textContent = `${element.offer.price  } ₽/ночь`;
  typeText.textContent = typeTranslation[element.offer.type];
  capactityText.textContent = `${element.offer.rooms  } комнаты для ${ element.offer.guests  } гостей`;
  timeText.textContent = `Заезд после ${  element.offer.checkin  }, выезд до ${  element.offer.checkout}`;
  featuresText.textContent = element.offer.features;
  descriptionText.textContent = element.offer.description;
  offerPhotos.textContent = '';
  photosArray.forEach((photo) => {
    const template = offerPhoto.cloneNode(false);
    template.src = photo;
    offerPhotos.appendChild(template);
  });
  cardsListFragment.appendChild(card);
}
);
export {cardsListFragment};
