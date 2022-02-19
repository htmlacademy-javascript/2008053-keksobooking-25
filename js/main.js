//Функция взята со StackOverflow: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInteger(min, max) {
  //Проверяем с помощью isNaN т.к. !argument срабатывает в т.ч. если argument = 0
  if (isNaN(min * max)) {
    throw new Error('Укажите значения "от" и "до"');
  }
  if (min < 0) {
    throw new Error('Значение "от" не должно быть меньше нуля');
  }

  if (min >= max) {
    throw new Error('Значение "от" должно быть меньше, чем "до"');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Функция взята со StackOverflow: https://stackoverflow.com/questions/17726753/get-a-random-number-between-0-0200-and-0-120-float-numbers
function getRandomCoordinates(min, max, decimal) {
  if (isNaN(min * max * decimal)) {
    throw new Error('Укажите значения "от", "до" и количество знаков после запятой');
  }
  if (min < 0) {
    throw new Error('Значение "от" не должно быть меньше нуля');
  }

  if (min >= max) {
    throw new Error('Значение "от" должно быть меньше, чем "до"');
  }

  return (Math.random() * (max - min) + min).toFixed(decimal);
}

getRandomInteger();
getRandomCoordinates();
