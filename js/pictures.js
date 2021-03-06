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
  var pictureList = document.querySelector('.pictures');
  var blockBigPicture = document.querySelector('.big-picture');
  var bigPicturePreview = blockBigPicture.querySelector('.big-picture__preview');
  var bigPictureCancel = blockBigPicture.querySelector('.big-picture__cancel');
  var visibleList = blockBigPicture.querySelectorAll('.social__comment-count, .social__loadmore');


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

  var renderComments = function (item) {
    var liNode = document.createElement('li');
    liNode.classList.add('social__comment', 'social__comment--text');

    var imageNode = document.createElement('img');
    imageNode.classList.add('social__picture');
    imageNode.src = 'img/avatar-' + window.utils.getRandomMinMax(1, SVG_QUANTITY) + '.svg';
    liNode.appendChild(imageNode);

    var paragraphNode = document.createElement('p');
    paragraphNode.classList.add('social__text');
    paragraphNode.textContent = item;

    liNode.appendChild(paragraphNode);

    return liNode;
  };

  /* по клику на миниатюру показывает большую фотографию */
  var renderBigPhoto = function (evt) {
    bigPictureCancel.addEventListener('click', closeHandler);
    showAndHideElements(blockBigPicture, visibleList);
    var target = evt.target;
    var id = parseInt(target.src.substring(target.src.lastIndexOf('/') + 1, target.src.indexOf('.')), 10) - 1;
    var sourceitem = window.pictures.userPhotos[id];

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

    for (var i = 0; i < MAX_COMMENT_LENGTH && i < sourceitem.comments.length; i++) {
      commentFragment.appendChild(renderComments(sourceitem.comments[i]));
    }

    listSocialCommentNode.appendChild(commentFragment);
  };

  var photoClickHandler = function (evt) {
    renderBigPhoto(evt);
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

  var hideBigPicture = function () {
    blockBigPicture.classList.add('hidden');
  };

  var closeHandler = function () {
    hideBigPicture();
    bigPictureCancel.removeEventListener('click', closeHandler);
  };


  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      blockBigPicture.classList.add('hidden');
    }
  });

  var loadErrorHandler = function () {
    var template = document.querySelector('#picture').content.querySelector('.img-upload__message--error');
    var block = template.cloneNode(true);
    block.classList.remove('hidden');
    block.setAttribute('style', 'z-index: 1000');
    document.body.appendChild(block);
    setTimeout(function () {
      block.setAttribute('style', 'display: none');
    }, 3000);
  };

  var loadSuccessHandler = function (photos) {
    window.pictures.userPhotos = photos;
    drawPhotos(photos);
  };

  var drawPhotos = function (photos) {

    pictureList.querySelectorAll('a').forEach(function (item) {
      pictureList.removeChild(item);
    });

    var fragment = document.createDocumentFragment();
    photos.forEach(function (item) {
      fragment.appendChild(fillBlockPicturesElements(item));
    });

    pictureList.appendChild(fragment);

  };


  window.backend.load(loadSuccessHandler, loadErrorHandler);


  window.pictures = {
    userPhotos: userPhotos,
    drawPhotos: drawPhotos,
  };

})();
