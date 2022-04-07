import { offerForm } from './elements.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PHOTO_CLASS = 'ad-form__photo';
const AVATAR_PLACEHOLDER = 'img/muffin-grey.svg';

const avatarFileChooser = offerForm.querySelector('#avatar');
const avatarPreviewElement = offerForm.querySelector('.ad-form-header__preview-avatar');

const photoFileChooser = offerForm.querySelector('#images');
const photoPreviewContainer = offerForm.querySelector('.ad-form__photo');
const photoPreviewElement = document.createElement('img');

const checkImageFileType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const showAvatarPreview = (file) => {
  avatarPreviewElement.src = URL.createObjectURL(file);
};

const showPhotoPreview = (file) => {
  photoPreviewContainer.innerHTML = '';
  photoPreviewElement.src = URL.createObjectURL(file);
  photoPreviewElement.classList.add(PHOTO_CLASS);
  photoPreviewContainer.appendChild(photoPreviewElement);
};

const avatarUploadHandler = () => {
  const file = avatarFileChooser.files[0];
  if (checkImageFileType(file)) {
    showAvatarPreview(file);
  }
};

const photoUploadHandler = () => {
  const file = photoFileChooser.files[0];
  if (checkImageFileType(file)) {
    showPhotoPreview(file);
  }
};

const resetImagePreviews = () => {
  photoPreviewContainer.innerHTML = '';
  avatarPreviewElement.src = AVATAR_PLACEHOLDER;
};

photoFileChooser.addEventListener('change', photoUploadHandler);

avatarFileChooser.addEventListener('change', avatarUploadHandler);

export { resetImagePreviews };
