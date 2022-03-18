const getRandomInteger = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Функция взята со StackOverflow: https://stackoverflow.com/questions/17726753/get-a-random-number-between-0-0200-and-0-120-float-numbers и доработана
const getRandomFloat = (a, b, decimal = 1) => {
  const min = Math.min(Math.abs(a), Math.abs(b));
  const max = Math.max(Math.abs(a), Math.abs(b));

  return +(Math.random() * (max - min) + min).toFixed(decimal);
};

const disableElement = (element) => {
  element.toggleAttribute('disabled', true);
};

const enableElement = (element) => {
  element.toggleAttribute('disabled', false);
};

export {getRandomFloat, getRandomInteger, disableElement, enableElement};

