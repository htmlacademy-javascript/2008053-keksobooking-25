import { createDataErrorModal } from './form-modal.js';

const GET_DATA_URL = 'https://25.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => fetch(GET_DATA_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => onSuccess(data))
  .catch((err) => onFail(err));

const sendData = (onSuccess, onFail, body) => fetch(
  SEND_DATA_URL,
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

const parseData = (data) => data.slice();

const getOffers = async () => {
  let data = await parseData;
  data = await getData(parseData, createDataErrorModal);
  return data;
};

const offers = getOffers();

export {sendData, offers};
