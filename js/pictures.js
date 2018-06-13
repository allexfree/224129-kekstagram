'use strict';

// Объявление переменных

var userPhotos = [];
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var description = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'
];


// Вершины
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
var listElement = document.querySelector('.pictures');
var blockBigPicture = document.querySelector('.big-picture');
var visibleElement = document.querySelectorAll('.social__comment-count, .social__loadmore');


// Определение ф-ций

/* Ф-ция getRandomMinMax получает случайное число от min до max */
var getRandomMinMax = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/* Ф-ция getRandomArrayIndex получает случайный индекс элемента массива, указанного в парметре array */
var getRandomArrayIndex = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

/* Ф-ция showAndHideElements показывает и скрывает элементы блоков.
  Параметры:
    invisibleElement - элемент, который нужно показать;
    visibleElement - элемент, который нужно спрятать. */
var showAndHideElements = function (invisibleElement, visibleElement) {
  invisibleElement.classList.remove('hidden');
  for (var i = 0; i < visibleElement.length; i++) {
    visibleElement[i].classList.add('visually-hidden');
  }
};

/* Ф-ция fillBlockPicturesElements выполняет заполнение блока элементами на основе массива userPhotos */
var fillBlockPicturesElements = function (element) {
  element.querySelector('.picture__img').src = userPhotos[i].url;
  element.querySelector('.picture__stat--comments').textContent = userPhotos[i].comments;
  element.querySelector('.picture__stat--likes').textContent = userPhotos[i].likes;
};

/* Ф-ция fillBlockBigPictureElements выполняет заполнение элементов блока .big-picture */
var fillBlockBigPictureElements = function () {
  blockBigPicture.querySelector('img').src = 'photos/' + getRandomMinMax(1, 25) + '.jpg';
  document.querySelector('.likes-count').textContent = userPhotos[i].likes;
  document.querySelector('.comments-count').textContent = userPhotos[i].comments;
  document.querySelector('.social__picture').src = 'img/avatar-' + getRandomMinMax(1, 6) + '.svg';
  document.querySelector('.social__text').textContent = getRandomArrayIndex(comments);
  document.querySelector('.social__caption').textContent = getRandomArrayIndex(description);
};

/* Ф-ция addElements добавляет заполненые DOM-элементы в блок .pictures */
var addElements = function (element) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(element);
  listElement.appendChild(fragment);
};


// вызов ф-ций

for (var i = 1; i <= 25; i++) {
  userPhotos.push({url: 'photos/' + i + '.jpg', likes: getRandomMinMax(15, 200), comments: comments[getRandomMinMax(0, 5)], description: description[getRandomMinMax(0, 5)]}); // формирование массива userPhotos
}

for (i = 0; i < userPhotos.length; i++) {
  var clone = photoTemplate.cloneNode(true);
  addElements(clone);
  fillBlockPicturesElements(clone);
  fillBlockBigPictureElements();
}

showAndHideElements(blockBigPicture, visibleElement);
