'use strict';
(function () {

  // Объявление переменных


  var userPhotos = [];
  var PICTURES_QUANTITY = 25;
  var SVG_QUANTITY = 6;
  var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'
  ];


  // Вершины

  var fragment = document.createDocumentFragment();
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var listElement = document.querySelector('.pictures');
  var blockBigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = blockBigPicture.querySelector('.big-picture__cancel');
  var visibleElement = blockBigPicture.querySelectorAll('.social__comment-count, .social__loadmore');
  var listSocialComment = blockBigPicture.querySelectorAll('.social__comment');

  var imgFilter = document.querySelector('.img-filters');
  var imgFilterForm = imgFilter.querySelector('.img-filters__form');
  var imgFilterButtons = imgFilterForm.querySelectorAll('.img-filters__button');
  var filterButtonActive = imgFilter.querySelector('.img-filters__button--active');

  // Определение ф-ций

  /* Ф-ция showAndHideElements показывает и скрывает элементы блоков.
  Параметры:
    elementInvisible - элемент, который нужно показать;
    elementVisible - элемент, который нужно спрятать. */
    var showAndHideElements = function (elementInvisible, elementVisible) {
      elementInvisible.classList.remove('hidden');
      elementVisible.forEach(function (item) {
        item.classList.add('visually-hidden');
      });
    };

    var photoClickHandler = function (evt) {
      showAndHideElements(blockBigPicture, visibleElement);
      var target = evt.target;
      blockBigPicture.querySelector('img').src = target.id; /* 'photos/' + target.src.split(/(\d)/)[1] + '.jpg' */
      document.querySelector('.social__picture').src = 'img/avatar-' + window.utils.getRandomMinMax(1, SVG_QUANTITY) + '.svg';
      document.querySelector('.social__caption').textContent = window.utils.getRandomArrayElement(descriptions);
      document.querySelector('.likes-count').textContent = target.nextElementSibling.querySelector('.picture__stat--likes').textContent;
    };

    /* Ф-ция fillBlockPicturesElements выполняет заполнение блока элементами на основе массива из параметра array */
    var fillBlockPicturesElements = function (sourceitem) {
      var photos = photoTemplate.cloneNode(true);
      photos.querySelector('.picture__img').setAttribute('id', sourceitem.url);
      photos.querySelector('.picture__img').src = sourceitem.url;
      photos.querySelector('.picture__stat--comments').textContent = sourceitem.comments.length;
      photos.querySelector('.picture__stat--likes').textContent = sourceitem.likes;
      listSocialComment.forEach(function (item, i) {
        item.classList.add('social__comment--text');
        item.querySelector('.social__text').textContent = sourceitem.comments[i];
      });

      window.filters.imgFilter.classList.remove('img-filters--inactive');

      photos.addEventListener('click', photoClickHandler);
      window.filters.imgFilterForm.addEventListener('click', window.filters.imgFilterFormClickHandler);

      return photos;
    };

    var bigPictureClickHandler = function () {
      blockBigPicture.classList.add('hidden');
    };

    bigPictureCancel.addEventListener('click', bigPictureClickHandler);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        blockBigPicture.classList.add('hidden');
      }
    });


  window.pictures = {
    userPhotos: userPhotos,
    listElement: listElement,
    fragment: fragment,
    fillBlockPicturesElements: fillBlockPicturesElements
  };

})();
