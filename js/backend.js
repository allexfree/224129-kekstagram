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

  var load = function (onLoad, onError) {
    createRequest(onLoad, onError, 'GET', URL + '/data');
  };

  var save = function (onLoad, onError, data) {
    createRequest(onLoad, onError, 'POST', URL, data);
  };

  var windowError = function () {
    var template = document.querySelector('#picture').content.querySelector('.img-upload__message--error');
    var block = template.cloneNode(true);
    block.classList.remove('hidden');
    block.setAttribute('style', 'z-index: 1000');
    document.body.appendChild(block);
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
