'use strict';

(function () {

  var imgFilter = document.querySelector('.img-filters');
  var imgFilterForm = imgFilter.querySelector('.img-filters__form');
  var imgFilterButtons = imgFilterForm.querySelectorAll('.img-filters__button');
  var filterButtonActive = imgFilter.querySelector('.img-filters__button--active');


  var imgFilterFormClickHandler = function (evt) {
    imgFilterButtons.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    if (evt.target.id === 'filter-discussed') {
      window.pictures.getListPhotos.userPhotos;
    }
  };

  imgFilter.classList.remove('img-filters--inactive');
  imgFilterForm.addEventListener('click', imgFilterFormClickHandler);

  window.filters = {
    imgFilterFormClickHandler: imgFilterFormClickHandler
  }

})();
