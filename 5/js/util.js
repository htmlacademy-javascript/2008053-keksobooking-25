//Функция взята со StackOverflow: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const getRandomInteger = (min, max) => {
  if (min !== 0 && !min || !max) {
    throw new Error('Укажите значения "от" и "до"');
  }
  if (min < 0) {
    throw new Error('Значение "от" не должно быть меньше нуля');
  }

  if (min >= max) {
    throw new Error('Значение "от" должно быть меньше, чем "до"');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Функция взята со StackOverflow: https://stackoverflow.com/questions/17726753/get-a-random-number-between-0-0200-and-0-120-float-numbers
const getRandomFloat = (min, max, decimal) => {
  if (min !== 0 && !min || !max || !decimal) {
    throw new Error('Укажите значения "от", "до" и количество знаков после запятой');
  }
  if (min < 0) {
    throw new Error('Значение "от" не должно быть меньше нуля');
  }
  if (min >= max) {
    throw new Error('Значение "от" должно быть меньше, чем "до"');
  }

  return (Math.random() * (max - min) + min).toFixed(decimal);
};

export {getRandomFloat, getRandomInteger};
