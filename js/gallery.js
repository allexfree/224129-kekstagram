'use strict';

(function () {


  // Объявление переменных

  var ESC_KEYCODE = 27;
  var DEFAULT_EFFECT_VALUE = 100;
  var PERCENTAGES = 100;
  var WIDTH_BLOCK_SCALE = 453;
  var scale = {default: 100, min: 25, max: 100, step: 25};
  var resize;
  var effectClassName;
  var startCoordX;
  var shift;
  var position;


  // Вершины

  var body = document.querySelector('body');
  var uploadImgForm = document.querySelector('#upload-select-image');
  var imgUpload = uploadImgForm.querySelector('#upload-file');
  var imgUploadLabel = uploadImgForm.querySelector('.img-upload__label');
  var imgUploadOverlay = uploadImgForm.querySelector('.img-upload__overlay');
  var imgUploadCancel = uploadImgForm.querySelector('#upload-cancel');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var imgEditable = imgUploadPreview.querySelector('img');
  var buttonResizeMinus = imgUploadOverlay.querySelector('.resize__control--minus');
  var buttonResizePlus = imgUploadOverlay.querySelector('.resize__control--plus');
  var resizeControl = imgUploadOverlay.querySelector('.resize__control--value');
  var scaleValue = document.querySelector('.scale__value');
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');
  var sliderEffects = document.querySelector('.img-upload__effects');
  var effectSliderItems = document.querySelectorAll('input[type=radio]');
  var effectValue = document.querySelector('input[type=radio]:checked').value;

  var hashtagField = imgUploadOverlay.querySelector('.text__hashtags');
  var commentField = imgUploadOverlay.querySelector('.text__description');


  // Объявление ф-ций

  var imgUploadChangeHandler = function () {
    imgUpload.addEventListener('change', openDialogImg);
  };

  var openDialogImg = function () {
    body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    resizeControl.setAttribute('value', scale.default + '%');
  };

  var closeDialogImg = function () {
    body.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    resizeControl.setAttribute('value', scale.default + '%');
    imgUploadPreview.setAttribute('style', 'transform: 1');
    sliderEffects.classList.remove('hidden');
    setPositionPin(DEFAULT_EFFECT_VALUE);
    imgEditable.setAttribute('class', 'effects__preview--none');
    imgEditable.removeAttribute('style');
  };

  var dialogImgPressEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== hashtagField && evt.target !== commentField) {
      closeDialogImg();
    }
  };

  var makeResizeMinus = function () {
    resize = Math.max(parseInt(resizeControl.value, 10) - scale.step, scale.min);
    resizeControl.value = resize + '%';
    return transformImg();
  };

  var makeResizePlus = function () {
    resize = Math.min(parseInt(resizeControl.value, 10) + scale.step, scale.max);
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
    }
    effectClassName = 'effects__preview--' + effectValue;
    imgEditable.className = '';
    imgEditable.classList.add(effectClassName);
    imgEditable.removeAttribute('style');
  };

  var scalePinMousedownHandler = function (evt) {
    evt.preventDefault();
    startCoordX = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      shift = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;

      position = (scalePin.offsetLeft - shift) * PERCENTAGES / WIDTH_BLOCK_SCALE;
      setPositionPin(position.toFixed());
      changeEffectIntensity();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var changeEffectIntensity = function () {
    switch (imgEditable.getAttribute('class')) {
      case 'effects__preview--heat':
        imgEditable.style.filter = 'brightness(' + (scaleValue.value * 2 / 100 + 1).toFixed(1) + ')';
        break;
      case 'effects__preview--phobos':
        imgEditable.style.filter = 'blur(' + (scaleValue.value * 3 / 100).toFixed(1) + 'px)';
        break;
      case 'effects__preview--marvin':
        imgEditable.style.filter = 'invert(' + Math.round(scaleValue.value) + '%)';
        break;
      case 'effects__preview--sepia':
        imgEditable.style.filter = 'sepia(' + (scaleValue.value / 100).toFixed(2) + ')';
        break;
      case 'effects__preview--chrome':
        imgEditable.style.filter = 'grayscale(' + (scaleValue.value / 100).toFixed(2) + ')';
        break;
    }
  };

  var initBigPicture = function () {
    hashtagField.addEventListener('input', window.validation.validateHashtagHandler);
    commentField.addEventListener('input', window.validation.validateCommentHandler);
  };

  // Обработчики событий
  imgUploadLabel.addEventListener('click', imgUploadChangeHandler);
  imgUploadLabel.addEventListener('click', initBigPicture);
  imgUploadCancel.addEventListener('click', closeDialogImg);
  document.addEventListener('keydown', dialogImgPressEsc);
  buttonResizeMinus.addEventListener('click', makeResizeMinus);
  buttonResizePlus.addEventListener('click', makeResizePlus);
  scalePin.addEventListener('mousedown', scalePinMousedownHandler);
  makeChangeEffectHandler();

  uploadImgForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(closeDialogImg, window.backend.windowError, new FormData(uploadImgForm));
  });


  // Вызов ф-ций
  for (var i = 0; i < effectSliderItems.length; i++) {
    effectSliderItems[i].addEventListener('click', makeChangeEffectHandler);
  }

  window.gallery = {
    ESC_KEYCODE: ESC_KEYCODE,
    dialogImgPressEsc: dialogImgPressEsc,
    commentField: commentField,
    hashtagField: hashtagField
  };

})();
