//Функция взята со StackOverflow: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInteger(min, max) {
  if (min < 0) {
    return alert('Значение "от" не должно быть меньше нуля');
  }

  if (min >= max) {
    return alert('Значение "от" должно быть меньше, чем "до"');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInteger();

//Функция взята со StackOverflow: https://stackoverflow.com/questions/17726753/get-a-random-number-between-0-0200-and-0-120-float-numbers
function getRandomCoordinates(min, max, decimal) {
  if (min < 0) {
    return alert('Значение "от" не должно быть меньше нуля');
  }

  if (min >= max) {
    return alert('Значение "от" должно быть меньше, чем "до"');
  }

  return (Math.random() * (max - min) + min).toFixed(decimal);
}

getRandomCoordinates();
