const offerForm = document.querySelector('.ad-form');
const avatarFileChooser = offerForm.querySelector('#avatar');
const avatarPreviewElement = offerForm.querySelector('.ad-form-header__preview-avatar');
const photoFileChooser = offerForm.querySelector('#images');
const photoPreviewContainer = offerForm.querySelector('.ad-form__photo');
const photoPreviewElement = document.createElement('img');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PHOTO_CLASS = 'ad-form__photo';
const AVATAR_PLACEHOLDER = 'img/muffin-grey.svg';

const showAvatarPreview = (file) => {
  avatarPreviewElement.src = URL.createObjectURL(file);
};

const showPhotoPreview = (file) => {
  photoPreviewContainer.innerHTML = '';
  photoPreviewElement.src = URL.createObjectURL(file);
  photoPreviewElement.classList.add(PHOTO_CLASS);
  photoPreviewContainer.appendChild(photoPreviewElement);
};

const imagePreviewHandler = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches && evt.target === photoFileChooser) {
    showPhotoPreview(file);
  }
  if (matches && evt.target === avatarFileChooser) {
    showAvatarPreview(file);
  }
};

const imageFormReset = () => {
  photoPreviewContainer.innerHTML = '';
  avatarPreviewElement.src = AVATAR_PLACEHOLDER;
};

photoFileChooser.addEventListener('change', (evt) => {
  imagePreviewHandler(evt);
});

avatarFileChooser.addEventListener('change', (evt) => {
  imagePreviewHandler(evt);
});

export { imageFormReset };
