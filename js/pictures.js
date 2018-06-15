'use strict';

// Объявление переменных

var PICTURES_QUANTITY = 25;
var SVG_QUANTITY = 6;
var userPhotos = [];
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var description = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'
];


// Вершины
var fragment = document.createDocumentFragment();
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
var clone;
var listElement = document.querySelector('.pictures');
var blockBigPicture = document.querySelector('.big-picture');
var visibleElement = document.querySelectorAll('.social__comment-count, .social__loadmore');


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
  for (var i = 0; i < elementVisible.length; i++) {
    elementVisible[i].classList.add('visually-hidden');
  }
};

/* Ф-ция fillBlockPicturesElements выполняет заполнение блока элементами на основе массива из параметра array */
var fillBlockPicturesElements = function (element, sourceitem) {
  element.querySelector('.picture__img').src = sourceitem.url;
  element.querySelector('.picture__stat--comments').textContent = sourceitem.comments;
  element.querySelector('.picture__stat--likes').textContent = sourceitem.likes;
};

/* Ф-ция fillBlockBigPictureElements выполняет заполнение элементов блока .big-picture */
var fillBlockBigPictureElements = function (element) {
  blockBigPicture.querySelector('img').src = 'photos/' + getRandomMinMax(1, PICTURES_QUANTITY) + '.jpg';
  document.querySelector('.likes-count').textContent = element.likes;
  document.querySelector('.comments-count').textContent = element.comments;
  document.querySelector('.social__picture').src = 'img/avatar-' + getRandomMinMax(1, SVG_QUANTITY) + '.svg';
  document.querySelector('.social__text').textContent = getRandomArrayElement(comments);
  document.querySelector('.social__caption').textContent = getRandomArrayElement(description);
};

/* Ф-ция addElements добавляет заполненые DOM-элементы в блок .pictures */
var addElements = function (element) {
  fragment.appendChild(element);
};


// вызов ф-ций

for (var i = 1; i <= PICTURES_QUANTITY; i++) {
  userPhotos.push({url: 'photos/' + i + '.jpg', likes: getRandomMinMax(15, 200), comments: getRandomArrayElement(comments), description: getRandomArrayElement(description)}); // формирование массива userPhotos
  clone = photoTemplate.cloneNode(true);
  fillBlockPicturesElements(clone, userPhotos[i - 1]);
  addElements(clone);
}

listElement.appendChild(fragment);

fillBlockBigPictureElements(userPhotos[0]);

showAndHideElements(blockBigPicture, visibleElement);
