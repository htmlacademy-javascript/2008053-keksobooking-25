const placeTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const photosFragment = document.createDocumentFragment();
const featuresFragment = document.createDocumentFragment();

const getPhotos = (photo) => {
  const template = cardTemplate.querySelector('.popup__photo').cloneNode(true);

  template.src = photo;
  photosFragment.appendChild(template);
};

const getFeatures = (feature) => {
  const template = cardTemplate.querySelector(`.popup__feature--${  feature}`).cloneNode(true);

  featuresFragment.appendChild(template);
};

const fillContainer = (type, cb, container, fragment) => {
  container.innerHTML = '';
  type.forEach(cb);
  container.append(fragment);
};

const insertFeatures = (features, container) => features ? fillContainer(features, getFeatures, container, featuresFragment) : container.classList.add('hidden');
const insertPhotos = (photos, container) => photos ? fillContainer(photos, getPhotos, container, photosFragment) : container.classList.add('hidden');

const makeCard = (element) => {
  const card = cardTemplate.cloneNode(true);

  const userAvatar = card.querySelector('.popup__avatar');
  const titleText = card.querySelector('.popup__title');
  const addressText = card.querySelector('.popup__text--address');
  const priceText = card.querySelector('.popup__text--price');
  const typeText = card.querySelector('.popup__type');
  const capactityText = card.querySelector('.popup__text--capacity');
  const timeText = card.querySelector('.popup__text--time');
  const descriptionText = card.querySelector('.popup__description');
  const featureContainer = card.querySelector('.popup__features');
  const photoContainer = card.querySelector('.popup__photos');

  const features = element.offer.features;
  const photos = element.offer.photos;

  userAvatar.src = element.author.avatar;
  titleText.textContent = element.offer.title;
  addressText.textContent = element.offer.address;
  priceText.textContent = `${element.offer.price  } ₽/ночь`;
  typeText.textContent = placeTypes[element.offer.type];
  capactityText.textContent = `${element.offer.rooms  } комнаты для ${ element.offer.guests  } гостей`;
  timeText.textContent = `Заезд после ${  element.offer.checkin  }, выезд до ${  element.offer.checkout}`;
  descriptionText.textContent = element.offer.description;

  insertFeatures(features, featureContainer);
  insertPhotos(photos, photoContainer);

  return card;
};

export {makeCard};
