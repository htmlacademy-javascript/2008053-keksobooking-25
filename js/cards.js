const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardsListFragment = document.createDocumentFragment();
const photosFragment = document.createDocumentFragment();
const featuresFragment = document.createDocumentFragment();

const placeTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const getPhotos = function (photo) {
  const template = cardTemplate.querySelector('.popup__photo').cloneNode(true);
  this.innerHTML = '';
  template.src = photo;
  photosFragment.appendChild(template);
};

const getFeatures = function (feature) {
  const featureItem = cardTemplate.querySelector(`.popup__feature--${  feature}`).cloneNode(true);
  this.innerHTML = '';
  featuresFragment.appendChild(featureItem);
};

const makeCard = (element) => {
  const features = element.offer.features;
  const photos = element.offer.photos;
  const card = cardTemplate.cloneNode(true);
  const photoContainer = card.querySelector('.popup__photos');
  const userAvatar = card.querySelector('.popup__avatar');
  const titleText = card.querySelector('.popup__title');
  const addressText = card.querySelector('.popup__text--address');
  const priceText = card.querySelector('.popup__text--price');
  const typeText = card.querySelector('.popup__type');
  const capactityText = card.querySelector('.popup__text--capacity');
  const timeText = card.querySelector('.popup__text--time');
  const descriptionText = card.querySelector('.popup__description');
  const featureContainer = card.querySelector('.popup__features');

  userAvatar.src = element.author.avatar;
  titleText.textContent = element.offer.title;
  addressText.textContent = element.offer.address;
  priceText.textContent = `${element.offer.price  } ₽/ночь`;
  typeText.textContent = placeTypes[element.offer.type];
  capactityText.textContent = `${element.offer.rooms  } комнаты для ${ element.offer.guests  } гостей`;
  timeText.textContent = `Заезд после ${  element.offer.checkin  }, выезд до ${  element.offer.checkout}`;
  descriptionText.textContent = element.offer.description;
  photos.forEach(getPhotos, photoContainer);
  features.forEach(getFeatures, featureContainer);
  photoContainer.append(photosFragment);
  featureContainer.append(featuresFragment);
  cardsListFragment.appendChild(card);

  return card;
};

export {makeCard};
