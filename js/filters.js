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
      drawPhotos (window.pictures.userPhotos, evt.target.id);

    };

  var drawPhotos = function ( photos, targetId ) {

    // если вызван из load
    if ( targetId === undefined ) {
      window.pictures.userPhotos = photos;
    }

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

    window.pictures.listElement.querySelectorAll( 'a' ).forEach ( function (item) {
      window.pictures.listElement.removeChild ( item );
    });

    filteredPhotos.forEach ( function ( item ) {
      window.pictures.fragment.appendChild(window.pictures.fillBlockPicturesElements(item ));
    })

    window.pictures.listElement.appendChild(window.pictures.fragment);

  };

  window.backend.load(drawPhotos, window.backend.windowError);

  window.filters = {
    imgFilter: imgFilter,
    imgFilterForm: imgFilterForm,
    imgFilterFormClickHandler: imgFilterFormClickHandler,
    drawPhotos: drawPhotos
  }

})();
