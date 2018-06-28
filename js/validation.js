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

    /*if (tags.length > MOUNT_HASHTAG) {
      msg = 'Кол-во хештегов не должно быть больше пяти';
    }*/

    tags.forEach(function (item) {

      switch (true) {
        case (item.length > MOUNT_HASHTAG):
          msg = 'Кол-во хештегов не должно быть больше пяти';
         // return msg;
          break;
        case ((item.charAt(0) !== '#') || (item === '')):
          msg = 'Хэштег должен начинаться с символа #';
          //return msg;
          break;
        case (item.indexOf('#', 1) > 1):
          msg = 'Разделите хештеги пробелами';
          //return msg;
          break;
        case (item.length < MIN_SYMBOLS):
          msg = 'Хэштег должен содержать не менее 2х символов, не считая символ #';
          //return msg;
          break;
        case (item.length > MAX_SYMBOLS):
          msg = 'В хештеге должно быть не более 20 символов включая #';
          //return msg;
          break;
        default:
          msg = '';
          break;
      }

      tags.forEach(function(subitem) {
        if (subitem.toLowerCase() === subitem.toLowerCase()) {
          msg = 'Есть одинаковые хештеги, пожалуйста, исправьте';
        }
      })

      return msg;
    })
    /*for (var i = 0; i < tags.length; i++) {
      if ((tags[i].charAt(0) !== '#') || (tags[i] === '')) {
        return 'Хэштег должен начинаться с символа #';
      }
      if (tags[i].indexOf('#', 1) > 1) {
        return 'Разделите хештеги пробелами';
      }
      if (tags[i].length < MIN_SYMBOLS) {
        return 'Хэштег должен содержать не менее 2х символов, не считая символ #';
      }
      if (tags[i].length > MAX_SYMBOLS) {
        return 'В хештеге должно быть не более 20 символов включая #!';
      }
      for (var j = i + 1; j < tags.length; j++) {
        if (tags[i].toLowerCase() === tags[j].toLowerCase()) {
          return 'Есть одинаковые хештеги, пожалуйста, исправьте';
        }
      }
    }*/
    //return '';
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

  //window.gallery.hashtagField.addEventListener('input', hashtagInputHandler);

  window.validation = {
    validateHashtagHandler: validateHashtagHandler,
    validateCommentHandler: validateCommentHandler
  };

})();
