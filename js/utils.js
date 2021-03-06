'use strict';

(function () {

  var ESC_KEYCODE = 27; // gallery.js documentKeydownHandler, pictures.js обработчик на документ
  var PERCENTAGES = 100; // gallery.js mouseMoveHandler

  /* Ф-ция getRandomMinMax получает случайное число от min до max */
  var getRandomMinMax = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /* Ф-ция getRandomArrayElement получает случайный элемент массива, указанного в парметре array */
  var getRandomArrayElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    PERCENTAGES: PERCENTAGES,
    getRandomMinMax: getRandomMinMax,
    getRandomArrayElement: getRandomArrayElement
  };

})();
