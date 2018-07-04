'use strict';
(function () {


  var MOUNT_HASHTAG = 5;
  var MIN_SYMBOLS = 3;
  var MAX_SYMBOLS = 20;
  var MAX_LENGTH_COMMENT_FIELD = 140;
  var COMMENT_INVALID = 'Длина текста не должна превышать 140 символов';
  var COMMENT_VALID = '';

  var checkHashtags = function (elementValue) {
    var tags = elementValue.toLowerCase().split(' ');
    var message = '';

    tags.every(function(item, i, dataTags) {
      var tagPosition = dataTags.indexOf(item);
      switch (true) {
        case (tagPosition !== -1 && tagPosition !== i):
          message = 'Одинаковые хештеги';
          break;
        case (tags.length > MOUNT_HASHTAG):
          message = 'Кол-во хештегов не должно быть больше пяти';
          break;
        case ((item.charAt(0) !== '#') || (item === '')):
          message = 'Хэштег должен начинаться с символа #';
          break;
        case (item.indexOf('#', 1) > 1):
          message = 'Разделите хештеги пробелами';
          break;
        case (item.length < MIN_SYMBOLS):
          message = 'Хэштег должен содержать не менее 2х символов, не считая символ #';
          break;
        case (item.length > MAX_SYMBOLS):
          message = 'В хештеге должно быть не более 20 символов включая #';
          break;
        default:
          message = '';
          break;
      }

      return message.length === 0;

    });

    return message;
  };


  var checkComment = function (comment) {
    return comment.length > MAX_LENGTH_COMMENT_FIELD ? COMMENT_INVALID : COMMENT_VALID;
  };

  var validateHashtagHandler = function (evt) {
    evt.target.setCustomValidity(checkHashtags(evt.target.value));
  };

  var validateCommentHandler = function (evt) {
    evt.target.setCustomValidity(checkComment(evt.target.value));
  };

  window.validation = {
    validateHashtagHandler: validateHashtagHandler,
    validateCommentHandler: validateCommentHandler,
  };

})();
