'use strict'

// Объявление переменных

var userPhotos = [];
var url = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg'];
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var description = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'
];


// Вершины
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
var listElement = document.querySelector('.pictures');


// Определение ф-ций

/* Ф-ция getRandomMinMax получает случайное число от min до max */
var getRandomMinMax = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/* Ф-ция getRandomArrayIndex получает случайный индекс элемента массива, указанного в парметре array */
var getRandomArrayIndex = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

/* Ф-ция showElements показывает элементы блоков, у которых проставлен class="hidden" */
var showElements = function () {
 document.querySelector('.big-picture').classList.remove('hidden');
};

/* Ф-ция hideElements визуально прячет элементы блоков, добавляя им class="visually-hidden"*/
var hideElements = function () {
  var visibleElement = document.querySelectorAll('.social__comment-count, .social__loadmore');
  for (var i = 0; i < visibleElement.length; i++) {
    visibleElement[i].classList.add('visually-hidden');
  }
}

/* Ф-ция fillBlockPicturesElements выполняет заполнение блока элементами на основе массива userPhotos */
var fillBlockPicturesElements = function (element) {
  element.querySelector('.picture__img').src = userPhotos[i].url;
  element.querySelector('.picture__stat--comments').textContent = userPhotos[i].comments;
  element.querySelector('.picture__stat--likes').textContent = userPhotos[i].likes;
};

/* Ф-ция fillBlockBigPictureElements выполняет заполнение элементов блока .big-picture */
var fillBlockBigPictureElements = function () {
  document.querySelector('.big-picture__img > img').src = 'photos/' + getRandomArrayIndex(url);
  document.querySelector('.likes-count').textContent = userPhotos[i].likes;
  document.querySelector('.comments-count').textContent = userPhotos[i].comments;
  document.querySelector('.social__picture').src = 'img/avatar-' + getRandomMinMax(1, 6) + '.svg';
  document.querySelector('.social__text').textContent = getRandomArrayIndex(comments);
  document.querySelector('.social__caption').textContent = getRandomArrayIndex(description);
}

/* Ф-ция addElements добавляет заполненые DOM-элементы в блок .pictures */
var addElements = function (element) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(element);
  listElement.appendChild(fragment);
};


// вызов ф-ций

for (var i = 0; i < 25; i++) {
  userPhotos.push({url: 'photos/' + url[i], likes: getRandomMinMax(15, 200), comments: comments[getRandomMinMax(0, 5)], description: description[getRandomMinMax(0, 5)]}); // формирование массива userPhotos
}

for (var i = 0; i < userPhotos.length; i++) {
  var clone = photoTemplate.cloneNode(true);
  addElements(clone);
  fillBlockPicturesElements(clone);
  fillBlockBigPictureElements();
}

showElements();

hideElements();
