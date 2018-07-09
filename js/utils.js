'use strict';

(function () {

  var LEFT_KEYCODE = 37; // gallery.js
  var RIGHT_KEYCODE = 39; // gallery.js
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
    LEFT_KEYCODE: LEFT_KEYCODE,
    RIGHT_KEYCODE: RIGHT_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    PERCENTAGES: PERCENTAGES,
    getRandomMinMax: getRandomMinMax,
    getRandomArrayElement: getRandomArrayElement
  };

})();
