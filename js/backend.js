'use strict';

(function () {
  var SUCCES_RESPONSE = 200;
  var NOT_FOUND_RESPONSE = 404;
  var URL = 'https://js.dump.academy/kekstagram';

  var createRequest = function (onLoad, onError, method, url, data) {
    var xhr = new XMLHttpRequest();
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

    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError, url) {
    createRequest(onLoad, onError, 'GET', URL + '/data');
  };

  var save = function (onLoad, onError, data) {
    createRequest(onLoad, onError, 'POST', URL, data);
  };

  var windowError = function (errorMessage) {
    var block = document.createElement('div');
    block.style = 'display: block; width: 280px; height: 150px; position: absolute; left: 0; right: 0; margin: 100px auto; padding: 10px; font-size: 16px; color: black; text-align: center; background-color: white; border: 3px dashed red; z-index: 1000';
    block.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', block);
    setTimeout(function () {
      block.setAttribute('style', 'display: none');
    }, 3000);
  };

  window.backend = {
    load: load,
    save: save,
    windowError: windowError
  };
})();
