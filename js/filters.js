'use strict';

(function () {

  var UNIQUE_PHOTOS_SIZE = 10;

  var imgFilter = document.querySelector('.img-filters');
  var imgFilterForm = imgFilter.querySelector('.img-filters__form');
  var imgFilterButtons = imgFilterForm.querySelectorAll('.img-filters__button');
  var filterButtonActive = imgFilter.querySelector('.img-filters__button--active');

  var imgFilterFormClickHandler = function (evt) {
      var className = 'img-filters__button--active';

      imgFilter.querySelector('.' + className).classList.remove(className);

      evt.target.classList.add(className);

  };

  var filterPhotos = function ( photos, targetId ) {

    var filteredPhotos = [];
    switch ( targetId ) {

      case 'filter-discussed':
        filteredPhotos = photos.slice().sort(function (left, right) {
          return right.comments.length - left.comments.length;
        });
        break;

      case 'filter-new':
        filteredPhotos = [ window.utils.getRandomArrayElement( photos ) ];
        var randomItem;

        while ( filteredPhotos.length < UNIQUE_PHOTOS_SIZE ) {
          randomItem = window.utils.getRandomArrayElement( photos );
          if ( filteredPhotos.indexOf ( randomItem ) === -1 ) {
            filteredPhotos.push ( randomItem );
          }
        };

        break;

        default:
          filteredPhotos = photos;
        break;
    }
    return filteredPhotos;
  }


  window.filters = {
    imgFilter: imgFilter,
    imgFilterForm: imgFilterForm,
    imgFilterFormClickHandler: imgFilterFormClickHandler,
    filterPhotos: filterPhotos
  }

})();
