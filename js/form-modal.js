import { offerForm } from './elements.js';

const closeUserModal = () => {
  const modal = offerForm.lastChild;

  offerForm.removeChild(modal);
  document.removeEventListener('keydown', closeUserModal);
};

const modalClickHandler = () => closeUserModal();
const modalKeydownHandler = () => closeUserModal();

const openUserModal = (template) => {
  const modal = template.cloneNode(true);

  offerForm.appendChild(modal);
  modal.addEventListener('click', modalClickHandler);
  document.addEventListener('keydown', modalKeydownHandler);
};

export { openUserModal };
