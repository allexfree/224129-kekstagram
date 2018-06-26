'use strict';

(function () {
  var SUCCES_RESPONSE = 200;
  var NOT_FOUND_RESPONSE = 404;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/code-and-magick/data';
    var timeout = xhr.timeout;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      switch (xhr.status) {
        case SUCCES_RESPONSE:
          onLoad(xhr.response);
          break;
        case NOT_FOUND_RESPONSE:
          onError('Документ не найден');
          break;
        default:
          onError('Ответ сервера: ' + xhr.status + '' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка загрузки данных');
    });

    xhr.addEventListener('timeout', function () {
      onError('Загрузка не успела произойти за ' + timeout + 'мс');
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://https://js.dump.academy/kekstagram';
    var timeout = xhr.timeout;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      switch (xhr.status) {
        case SUCCES_RESPONSE:
          onLoad(xhr.response);
          break;
        case NOT_FOUND_RESPONSE:
          onError('Документ не найден');
          break;
        default:
          onError('Ответ сервера: ' + xhr.status + '' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка загрузки данных');
    });

    xhr.addEventListener('timeout', function () {
      onError('Загрузка не успела произойти за ' + timeout + 'мс');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var windowError = function (errorMessage) {
    var block = document.createElement('div');
    block.style = 'display: block; width: 280px; height: 150px; position: absolute; left: 0; right: 0; margin: 100px auto; padding: 10px; font-size: 16px; color: black; text-align: center; background-color: white; border: 3px dashed red; z-index: 1000';
    block.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', block);
  };

  window.backend = {
    load: load,
    save: save,
    windowError: windowError
  };
})();
