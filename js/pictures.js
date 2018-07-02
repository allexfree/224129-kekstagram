'use strict';
(function () {

  // Объявление переменных


  var userPhotos = [];
  var PICTURES_QUANTITY = 25;
  var SVG_QUANTITY = 6;
  var description = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'
  ];


  // Вершины

  var fragment = document.createDocumentFragment();
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var listElement = document.querySelector('.pictures');
  var blockBigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = blockBigPicture.querySelector('.big-picture__cancel');
  var visibleElement = blockBigPicture.querySelectorAll('.social__comment-count, .social__loadmore');
  var listSocialComment = blockBigPicture.querySelectorAll('.social__comment');

  // Определение ф-ций

  /* Ф-ция getRandomMinMax получает случайное число от min до max */
  var getRandomMinMax = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /* Ф-ция getRandomArrayElement получает случайный элемент массива, указанного в парметре array */
  var getRandomArrayElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

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
    blockBigPicture.querySelector('img').src = 'photos/' + target.src.split(/(\d)/)[1] + '.jpg';
    document.querySelector('.social__picture').src = 'img/avatar-' + getRandomMinMax(1, SVG_QUANTITY) + '.svg';
    document.querySelector('.social__caption').textContent = getRandomArrayElement(description);
    document.querySelector('.likes-count').textContent = target.nextElementSibling.querySelector('.picture__stat--likes').textContent;
  };

  /* Ф-ция fillBlockPicturesElements выполняет заполнение блока элементами на основе массива из параметра array */
  var fillBlockPicturesElements = function (sourceitem) {
    var photos = photoTemplate.cloneNode(true);
    photos.querySelector('.picture__img').src = sourceitem.url;
    photos.querySelector('.picture__stat--comments').textContent = sourceitem.comments.length;
    photos.querySelector('.picture__stat--likes').textContent = sourceitem.likes;

    listSocialComment.forEach(function (item, i) {
      item.classList.add('social__comment--text');
      item.querySelector('.social__text').textContent = sourceitem.comments[i];
    });

    photos.addEventListener('click', photoClickHandler);
    return photos;
  };

  bigPictureCancel.addEventListener('click', function () {
    blockBigPicture.classList.add('hidden');
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.gallery.ESC_KEYCODE) {
      blockBigPicture.classList.add('hidden');
    }
  });

  // вызов ф-ций
  var getListPhotos = function (photo) {
    userPhotos = photo.slice().sort(function (left, right) {
        return right.comments.length - left.comments.length;
    });

    for (var i = 1; i <= PICTURES_QUANTITY; i++) {
      fragment.appendChild(fillBlockPicturesElements(photo[i - 1]));
      listElement.appendChild(fragment);
    }
  };

  window.backend.load(getListPhotos, window.backend.windowError);

  window.pictures = {
    getListPhotos: getListPhotos,
    userPhotos: userPhotos,
    listElement: listElement
  };

})();
