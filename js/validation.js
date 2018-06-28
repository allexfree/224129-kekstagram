'use strict';
(function () {


  var MOUNT_HASHTAG = 5;
  var MIN_SYMBOLS = 3;
  var MAX_SYMBOLS = 20;
  var MAX_LENGTH_COMMENT_FIELD = 140;
  var COMMENT_INVALID = 'Длина текста не должна превышать 140 символов';
  var COMMENT_VALID = '';

  var checkHashtags = function (element) {
    var tags = element.split(' ');
    var msg = '';

    tags.forEach(function (item) {

      switch (true) {
        case (item.length > MOUNT_HASHTAG):
          msg = 'Кол-во хештегов не должно быть больше пяти';
          break;
        case ((item.charAt(0) !== '#') || (item === '')):
          msg = 'Хэштег должен начинаться с символа #';
          break;
        case (item.indexOf('#', 1) > 1):
          msg = 'Разделите хештеги пробелами';
          break;
        case (item.length < MIN_SYMBOLS):
          msg = 'Хэштег должен содержать не менее 2х символов, не считая символ #';
          break;
        case (item.length > MAX_SYMBOLS):
          msg = 'В хештеге должно быть не более 20 символов включая #';
          break;
        default:
          msg = '';
          break;
      }
    })

    return msg;
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
    validateCommentHandler: validateCommentHandler
  };

})();
