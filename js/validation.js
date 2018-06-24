'use strict';
(function () {

  var MAX_LENGTH_COMMENT_FIELD = 140;

  var checkHashtags = function (tags) {
    if (tags.length > 5) {
      return 'Кол-во хештегов не должно быть больше пяти';
    }
    for (var i = 0; i < tags.length; i++) {
      if ((tags[i].charAt(0) !== '#') || (tags[i] === '')) {
        return 'Хэштег должен начинаться с символа #';
      }
      if (tags[i].indexOf('#', 1) > 1) {
        return 'Разделите хештеги пробелами';
      }
      if (tags[i].length < 3) {
        return 'Хэштег должен содержать не менее 2х символов, не считая символ #';
      }
      if (tags[i].length > 20) {
        return 'В хештеге должно быть не более 20 символов включая #!';
      }
      for (var j = i + 1; j < tags.length; j++) {
        if (tags[i].toLowerCase() === tags[j].toLowerCase()) {
          return 'Есть одинаковые хештеги, пожалуйста, исправьте';
        }
      }
    }
    return '';
  };

  var hashtagInputHandler = function (evt) {
    var tags = evt.target.value.split(' ');
    window.gallery.hashtagField.setCustomValidity(checkHashtags(tags));
  };

  var commentInputHandler = function () {
    if (window.gallery.commentField.value.length > MAX_LENGTH_COMMENT_FIELD) {
      window.gallery.commentField.setCustomValidity('Длина текста не должна превышать 140 символов');
    } else {
      window.gallery.commentField.setCustomValidity('');
    }
  };

  window.gallery.hashtagField.addEventListener('input', hashtagInputHandler);
  window.gallery.commentField.addEventListener('input', commentInputHandler);

})();