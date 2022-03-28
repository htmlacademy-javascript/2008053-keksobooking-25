import { createDataErrorModal } from './form-modal.js';

const dataUrl = 'https://25.javascript.pages.academy/keksobooking/data';

const getData = () => fetch(
  dataUrl)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .catch((err) => createDataErrorModal(err));

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });

};
export {getData, sendData};
