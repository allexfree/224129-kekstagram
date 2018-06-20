'use strict';

(function () {
  // Объявление переменных

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var scale = {default: 100, min: 25, max: 100, step: 25};
  var resize;

  // Вершины

  var body = document.querySelector('body');
  var uploadImgForm = document.querySelector('#upload-select-image');
  var imgUpload = uploadImgForm.querySelector('#upload-file');
  var imgUploadOverlay = uploadImgForm.querySelector('.img-upload__overlay');
  var imgUploadCancel = uploadImgForm.querySelector('#upload-cancel');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var buttonResizeMinus = imgUploadOverlay.querySelector('.resize__control--minus');
  var buttonResizePlus = imgUploadOverlay.querySelector('.resize__control--plus');
  var resizeControl = imgUploadOverlay.querySelector('.resize__control--value');


  // Объявление ф-ций

  var openDialogImg = function () {
    body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    resizeControl.setAttribute('value', scale.default + '%');
  };

  var closeDialogImg = function() {
    body.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    resizeControl.setAttribute('value', scale.default + '%');
    imgUploadPreview.setAttribute('style', 'transform: 1');
  };

  var dialogImgPressEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeDialogImg();
    }
  };

  var makeResizeMinus = function () {
    resize = Math.max(parseInt(resizeControl.value) - scale.step, scale.min);
    resizeControl.value = resize + '%';

    return transformImg();
  };

  var makeResizePlus = function () {
    resize = Math.min(parseInt(resizeControl.value) + scale.step, scale.max);
    resizeControl.value = resize + '%';

    return transformImg();
  };

  var transformImg = function () {
    var transform = resize / 100;
    imgUploadPreview.style.transform = 'scale(' + transform + ')';
  };


  // Обработчики событий
  imgUpload.addEventListener('change', openDialogImg);
  imgUploadCancel.addEventListener('click', closeDialogImg);
  document.addEventListener('keydown', dialogImgPressEsc);
  buttonResizeMinus.addEventListener('click', makeResizeMinus);
  buttonResizePlus.addEventListener('click', makeResizePlus);


  // Вызов ф-ций
})();
