'use strict';

(function () {

  var scale = {default: 100, min: 25, max: 100, step: 25};
  var resize;

  var resizeMinus = function () {
    resize = Math.max(parseInt(window.gallery.resizeControl.value, 10) - scale.step, scale.min);
    window.gallery.resizeControl.value = resize + '%';
    return transformImg();
  };

  var resizePlus = function () {
    resize = Math.min(parseInt(window.gallery.resizeControl.value, 10) + scale.step, scale.max);
    window.gallery.resizeControl.value = resize + '%';
    return transformImg();
  };

  var transformImg = function () {
    var transform = resize / 100;
    window.gallery.imageUploadPreview.style.transform = 'scale(' + transform + ')';
  };

  window.resize = {
    scale: scale,
    resize: resize,
    resizeMinus: resizeMinus,
    resizePlus: resizePlus
  };

})();
