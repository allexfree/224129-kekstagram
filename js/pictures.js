'use strict';
(function () {

  // Объявление переменных


  var userPhotos = [];
  var SVG_QUANTITY = 6;
  var MAX_COMMENT_LENGTH = 5;
  var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'
  ];


  // Вершины

  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var listElement = document.querySelector('.pictures');
  var blockBigPicture = document.querySelector('.big-picture');
  var bigPicturePreview = blockBigPicture.querySelector('.big-picture__preview');
  var bigPictureCancel = blockBigPicture.querySelector('.big-picture__cancel');
  var visibleElement = blockBigPicture.querySelectorAll('.social__comment-count, .social__loadmore');

  var imgFilter = document.querySelector('.img-filters');

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

  /* по клику на миниатюру показывает большую фотографию */
  var photoClickHandler = function (evt) {
    showAndHideElements(blockBigPicture, visibleElement);
    var target = evt.target;
    var id = parseInt(target.src.substring(target.src.lastIndexOf('/') + 1, target.src.indexOf('.')), 10);
    var sourceitem = userPhotos[id];

    blockBigPicture.querySelector('img').src = target.src;
    bigPicturePreview.querySelector('.social__picture').src = 'img/avatar-' + window.utils.getRandomMinMax(1, SVG_QUANTITY) + '.svg';
    bigPicturePreview.querySelector('.social__caption').textContent = window.utils.getRandomArrayElement(descriptions);
    bigPicturePreview.querySelector('.likes-count').textContent = sourceitem.likes;

    var listSocialComment = blockBigPicture.querySelectorAll('.social__comment');
    var listSocialCommentNode = document.querySelector('.social__comments');

    listSocialComment.forEach(function (item) {
      listSocialCommentNode.removeChild(item);
    });

    // add fragment
    var commentFragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_COMMENT_LENGTH; i++) {

      var item = sourceitem.comments[i];
      var liNode = document.createElement('li');
      liNode.classList.add('social__comment', 'social__comment--text');
      commentFragment.appendChild(liNode);

      var imageNode = document.createElement('img');
      imageNode.classList.add('social__picture');
      imageNode.src = 'img/avatar-' + window.utils.getRandomMinMax(1, SVG_QUANTITY) + '.svg';
      liNode.appendChild(imageNode);


      var paragraphNode = document.createElement('p');
      paragraphNode.classList.add('social__text');
      paragraphNode.textContent = item;

      liNode.appendChild(paragraphNode);

    }

    listSocialCommentNode.appendChild(commentFragment);

  };

  /* Ф-ция fillBlockPicturesElements рисует миниатюрки, т.е. выполняет заполнение блока элементами на основе массива из параметра sourceitem */
  var fillBlockPicturesElements = function (sourceitem) {
    var photos = photoTemplate.cloneNode(true);
    photos.querySelector('.picture__img').src = sourceitem.url;
    photos.querySelector('.picture__stat--comments').textContent = sourceitem.comments.length;
    photos.querySelector('.picture__stat--likes').textContent = sourceitem.likes;


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


  var drawPhotos = function (photos, targetId) {

    // если вызван из load
    if (targetId === undefined) {
      userPhotos = photos;
    }

    var filteredPhotos = window.filters.filterPhotos(photos, targetId);

    listElement.querySelectorAll('a').forEach(function (item) {
      listElement.removeChild(item);
    });

    var fragment = document.createDocumentFragment();
    filteredPhotos.forEach(function (item) {
      fragment.appendChild(fillBlockPicturesElements(item));
    });

    listElement.appendChild(fragment);

  };

  window.backend.load(drawPhotos, windowError);


  window.pictures = {
    userPhotos: userPhotos,
    drawPhotos: drawPhotos,
  };

})();
