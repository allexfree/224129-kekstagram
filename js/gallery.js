'use strict';

(function () {


  // Объявление переменных
  var SCALE_MIN = 0;
  var SCALE_MAX = 100;
  var SCALE_STEP = 5;

  var EFFECT_ORIGINAL = 'none';
  var EFFECT_HEAT = 'effects__preview--heat';
  var EFFECT_PHOBOS = 'effects__preview--phobos';
  var EFFECT_MARVIN = 'effects__preview--marvin';
  var EFFECT_SEPIA = 'effects__preview--sepia';
  var EFFECT_CHROME = 'effects__preview--chrome';
  var DEFAULT_EFFECT_VALUE = 100;
  var WIDTH_BLOCK_SCALE = 453;
  var MAX_BRIGHTNESS = 2;
  var MAX_BLUR = 3;
  var effectClassName;
  var startCoordinateX;
  var shift;
  var position;


  // Вершины

  var body = document.querySelector('body');
  var uploadImageForm = document.querySelector('#upload-select-image');
  var imageUpload = uploadImageForm.querySelector('#upload-file');
  var imageUploadLabel = uploadImageForm.querySelector('.img-upload__label');
  var imageUploadOverlay = uploadImageForm.querySelector('.img-upload__overlay');
  var imageUploadCancel = uploadImageForm.querySelector('#upload-cancel');
  var imageUploadPreview = imageUploadOverlay.querySelector('.img-upload__preview');
  var imageEditable = imageUploadPreview.querySelector('img');
  var buttonResizeMinus = imageUploadOverlay.querySelector('.resize__control--minus');
  var buttonResizePlus = imageUploadOverlay.querySelector('.resize__control--plus');
  var resizeControl = imageUploadOverlay.querySelector('.resize__control--value');
  var scaleLineBlock = imageUploadOverlay.querySelector('.img-upload__scale');
  var scaleValue = imageUploadOverlay.querySelector('.scale__value');
  var scalePin = imageUploadOverlay.querySelector('.scale__pin');
  var scaleLevel = imageUploadOverlay.querySelector('.scale__level');
  var effectSliderItems = imageUploadOverlay.querySelectorAll('input[type=radio]');
  var effectValue = imageUploadOverlay.querySelector('input[type=radio]:checked').value;

  var hashtagField = imageUploadOverlay.querySelector('.text__hashtags');
  var commentField = imageUploadOverlay.querySelector('.text__description');


  // Объявление ф-ций

  var imageUploadChangeHandler = function () {
    imageUpload.addEventListener('change', function () {

      setRealPhoto();

      body.classList.add('modal-open');
      imageUploadOverlay.classList.remove('hidden');
      scaleLineBlock.classList.add('hidden');
      resizeControl.setAttribute('value', window.resize.scale.default + '%');

      imageUploadCancel.addEventListener('click', imageUploadCancelClickHandler);
      document.addEventListener('keydown', documentKeydownHandler);
      buttonResizeMinus.addEventListener('click', buttonResizeMinusClickHandler);
      buttonResizePlus.addEventListener('click', buttonResizePlusClickHandler);
      scalePin.addEventListener('mousedown', scalePinMousedownHandler);
      document.addEventListener('keydown', documentKeydownLeftRightHandler);

      effectSliderItems.forEach(function (item) {
        item.addEventListener('click', makeChangeEffectHandler);
      });

    });

    initBigPicture();
  };

  var setRealPhoto = function () {
    var types = ['gif', 'jpg', 'jpeg', 'png'];
    var file = imageUpload.files[0];
    var fileName = file.name.toLowerCase();
    var effectList = document.querySelector('.effects__list');
    var effectsPreview = effectList.querySelectorAll('.effects__preview');

    var matches = types.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imageEditable.src = reader.result;
        effectsPreview.forEach(function (item) {
          item.setAttribute('style', 'background-image: url(' + reader.result + ')');
        });
      });
      reader.readAsDataURL(file);
    }

  };

  var imageUploadCancelClickHandler = function () {
    closeDialogImg();
  };

  var documentKeydownHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE && evt.target !== hashtagField && evt.target !== commentField) {
      closeDialogImg();
    }
  };

  var buttonResizeMinusClickHandler = function () {
    window.resize.resizeMinus();
  };

  var buttonResizePlusClickHandler = function () {
    window.resize.resizePlus();
  };

  var makeChangeEffectHandler = function () {
    resetEffect();
    if (effectValue === EFFECT_ORIGINAL) {
      scaleLineBlock.classList.add('hidden');
    } else {
      scaleLineBlock.classList.remove('hidden');
    }
    effectClassName = 'effects__preview--' + effectValue;
    imageEditable.className = '';
    imageEditable.classList.add(effectClassName);
    imageEditable.removeAttribute('style');
  };

  var documentKeydownLeftRightHandler = function (evt) {
    if (evt.target === scalePin) {
      if (evt.keyCode === window.utils.LEFT_KEYCODE) {
        scaleValue.value = Math.max(parseInt(scaleValue.value, 10) - SCALE_STEP, SCALE_MIN);
      } else if (evt.keyCode === window.utils.RIGHT_KEYCODE) {
        scaleValue.value = Math.min(parseInt(scaleValue.value, 10) + SCALE_STEP, SCALE_MAX);
      }
      setPositionPin(scaleValue.value);
      changeEffectIntensity();
    }
  };

  var scalePinMousedownHandler = function (evt) {
    evt.preventDefault();
    startCoordinateX = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      shift = startCoordinateX - moveEvt.clientX;
      startCoordinateX = moveEvt.clientX;

      position = (scalePin.offsetLeft - shift) * window.utils.PERCENTAGES / WIDTH_BLOCK_SCALE;
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

  var closeDialogImg = function () {
    body.classList.remove('modal-open');
    imageUploadOverlay.classList.add('hidden');
    resizeControl.setAttribute('value', window.resize.scale.default + '%');
    imageUploadPreview.setAttribute('style', 'transform: 1');
    scaleLineBlock.classList.remove('hidden');
    setPositionPin(DEFAULT_EFFECT_VALUE);
    imageEditable.setAttribute('class', 'effects__preview--none');
    imageEditable.removeAttribute('style');
    imageUpload.value = '';


    imageUploadCancel.removeEventListener('click', imageUploadCancelClickHandler);
    document.removeEventListener('keydown', documentKeydownHandler);
    buttonResizeMinus.removeEventListener('click', buttonResizeMinusClickHandler);
    buttonResizePlus.removeEventListener('click', buttonResizePlusClickHandler);
    scalePin.removeEventListener('mousedown', scalePinMousedownHandler);
    document.removeEventListener('keydown', documentKeydownLeftRightHandler);

    effectSliderItems.forEach(function (item) {
      item.removeEventListener('click', makeChangeEffectHandler);
    });
  };

  var setPositionPin = function (currentPosition) {
    if (currentPosition > DEFAULT_EFFECT_VALUE || currentPosition < 0) {
      return;
    }
    scalePin.style.left = currentPosition + '%';
    scaleLevel.style.width = currentPosition + '%';
    scaleValue.value = currentPosition;
  };

  var resetEffect = function () {
    imageUploadPreview.removeAttribute('style');
    setPositionPin(DEFAULT_EFFECT_VALUE);
    effectValue = document.querySelector('input[type=radio]:checked').value;
  };

  var changeEffectIntensity = function () {
    switch (imageEditable.getAttribute('class')) {
      case EFFECT_HEAT:
        imageEditable.style.filter = 'brightness(' + (scaleValue.value * MAX_BRIGHTNESS / 100 + 1).toFixed(1) + ')';
        break;
      case EFFECT_PHOBOS:
        imageEditable.style.filter = 'blur(' + (scaleValue.value * MAX_BLUR / 100).toFixed(1) + 'px)';
        break;
      case EFFECT_MARVIN:
        imageEditable.style.filter = 'invert(' + Math.round(scaleValue.value) + '%)';
        break;
      case EFFECT_SEPIA:
        imageEditable.style.filter = 'sepia(' + (scaleValue.value / 100).toFixed(2) + ')';
        break;
      case EFFECT_CHROME:
        imageEditable.style.filter = 'grayscale(' + (scaleValue.value / 100).toFixed(2) + ')';
        break;
    }
  };

  var initBigPicture = function () {
    hashtagField.addEventListener('input', window.validation.validateHashtagHandler);
    commentField.addEventListener('input', window.validation.validateCommentHandler);
  };

  // Обработчики событий
  imageUploadLabel.addEventListener('click', imageUploadChangeHandler);

  makeChangeEffectHandler();

  uploadImageForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    hashtagField.value = '';
    commentField.value = '';

    window.backend.save(closeDialogImg, window.backend.windowError, new FormData(uploadImageForm));
  });


  window.gallery = {
    imageUploadPreview: imageUploadPreview,
    resizeControl: resizeControl,
    commentField: commentField,
    hashtagField: hashtagField
  };

})();
