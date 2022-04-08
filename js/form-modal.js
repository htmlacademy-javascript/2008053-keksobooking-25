const ESC_KEY = 'Escape';

const pageBody = document.querySelector('body');
const pageBodyOriginalLastElement = pageBody.lastChild;

const closeUserModal = () => {
  const modal = pageBody.lastChild;
  if (modal !== pageBodyOriginalLastElement) {
    pageBody.removeChild(modal);
  }
};

const modalClickHandler = () => closeUserModal();

const modalEscKeydownHandler = (key) => {
  if (key === ESC_KEY) {
    closeUserModal();
  }
};

const openUserModal = (template) => {
  const modal = template.cloneNode(true);

  pageBody.appendChild(modal);
  modal.addEventListener('click', modalClickHandler);
  modal.addEventListener('keydown', (evt) => modalEscKeydownHandler(evt.key));
  modal.tabIndex = '-1';
  modal.focus();
};

export { openUserModal };
