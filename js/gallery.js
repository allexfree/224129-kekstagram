'use strict';

(function () {
  // Объявление переменных

  var ESC_KEYCODE = 27;
  var DEFAULT_EFFECT_VALUE = 100;
  var PERCENTAGES = 100;
  var WIDTH_BLOCK_SCALE = 453;
  var scale = {default: 100, min: 25, max: 100, step: 25};
  var resize;
  var filters = {
    chrome: {name: 'grayscale', min: 0, max: 1},
    sepia: {name: 'sepia', min: 0, max: 1},
    marvin: {name: 'invert', min: 0, max: 100},
    fobos: {name: 'blur', min: 0, max: 3},
    znoy: {name: 'brightness', min: 1, max: 3}
  };
  var effectClassName;
  var startCoordX;
  var shift;
  var position;

  // Вершины

  var body = document.querySelector('body');
  var uploadImgForm = document.querySelector('#upload-select-image');
  var imgUpload = uploadImgForm.querySelector('#upload-file');
  var imgUploadOverlay = uploadImgForm.querySelector('.img-upload__overlay');
  var imgUploadCancel = uploadImgForm.querySelector('#upload-cancel');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var imgEditable = imgUploadPreview.querySelector('img');
  var imgUploadScale =  document.querySelector('.img-upload__scale');
  var buttonResizeMinus = imgUploadOverlay.querySelector('.resize__control--minus');
  var buttonResizePlus = imgUploadOverlay.querySelector('.resize__control--plus');
  var resizeControl = imgUploadOverlay.querySelector('.resize__control--value');
  var scaleValue = document.querySelector('.scale__value');
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');
  var sliderEffects = document.querySelector('.img-upload__effects');
  var effectSliderItems = document.querySelectorAll('input[type=radio]');
  var effectValue = document.querySelector('input[type=radio]:checked').value;
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

  var setPositionPin = function (currentPosition) {
    if (currentPosition > 100 || currentPosition < 0) {
      return;
    }
    scalePin.style.left = currentPosition + '%';
    scaleLevel.style.width = currentPosition + '%';
    scaleValue.value = currentPosition;
  };

  var resetEffect = function () {
    imgUploadPreview.removeAttribute('style');
    setPositionPin(DEFAULT_EFFECT_VALUE);
    effectValue = document.querySelector('input[type=radio]:checked').value;
  };

  var makeChangeEffectHandler = function () {
    resetEffect();
    if (effectValue === 'none') {
      sliderEffects.classList.add('hidden');
    } else {
      sliderEffects.classList.remove('hidden');
    }
    effectClassName = 'effects__preview--' + effectValue;
    imgEditable.className = '';
    imgEditable.classList.add(effectClassName);
  };

  var scalePinMousedownHandler = function (evt) {
    evt.preventDefault();

    startCoordX = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      shift = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;

      position = (scalePin.offsetLeft - shift) * PERCENTAGES / WIDTH_BLOCK_SCALE;
      setPositionPin(position);
    }

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  // Обработчики событий
  imgUpload.addEventListener('change', openDialogImg);
  imgUploadCancel.addEventListener('click', closeDialogImg);
  document.addEventListener('keydown', dialogImgPressEsc);
  buttonResizeMinus.addEventListener('click', makeResizeMinus);
  buttonResizePlus.addEventListener('click', makeResizePlus);
  makeChangeEffectHendler();
  scalePin.addEventListener('mousedown', scalePinMousedownHandler);

  // Вызов ф-ций
  for (i = 0; i < effectSliderItems.length; i++ ) {
    effectSliderItems[i].addEventListener('click', makeChangeEffectHandler);
  }
})();
