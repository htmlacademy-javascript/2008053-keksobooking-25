const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PHOTO_CLASS = 'ad-form__photo';

const offerForm = document.querySelector('.ad-form');
const avatarFileChooser = offerForm.querySelector('#avatar');
const avatarPreviewElement = offerForm.querySelector('.ad-form-header__preview-avatar');
const photoFileChooser = offerForm.querySelector('#images');
const photoPreviewContainer = offerForm.querySelector('.ad-form__photo');
const photoPreviewElement = document.createElement('img');

photoFileChooser.addEventListener('change', () => {
  const file = photoFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoPreviewContainer.innerHTML = '';
    photoPreviewElement.src = URL.createObjectURL(file);
    photoPreviewElement.classList.add(PHOTO_CLASS);
    photoPreviewContainer.appendChild(photoPreviewElement);
  }
});

avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});


