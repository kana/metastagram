var Metastagram = (function ($) {
  var M = {};
  return $.extend(M, {
    Artist: function (newOptions) {
      var defaultOptions = {
        explorationInterval: 5 * 60 * 1000,
        hotBoxes: $([]),
        normalBoxes: $([]),
        updateInterval: 3000
      };

      $.extend(this, {
        explorationTimer: null,
        librarian: new M.Librarian(),
        options: $.extend({}, defaultOptions, newOptions),
        perform: function () {
          // TODO: Refresh boxes in nice order.
          this.refresh(this.options.normalBoxes);
          this.refresh(this.options.hotBoxes);
        },
        refresh: function (boxes) {
          // TODO: Add nice effect to refresh a box.
          // TODO: Do not show the same photo in two or more boxes.
          var a = this.librarian.photoArchive;
          var photo = a[M.Maid.choose(Object.keys(a))];
          var box = M.Maid.choose(boxes);
          box.text(photo.title);  // TODO: Show photo properly.
        },
        start: function () {
          var _this = this;
          var dummyQuery = 'meta';  // TODO: Use given query.
          this.librarian.initializePhotoArchive(
            dummyQuery,
            this.options.hotBoxes.length + this.options.normalBoxes.length,
            function () {
              var fillWithPhotos = function (boxes) {
                boxes.each(function () {
                  _this.refresh($(this));
                });
              };
              fillWithPhotos(_this.options.hotBoxes);
              fillWithPhotos(_this.options.normalBoxes);

              if (!_this.explorationTimer) {
                _this.explorationTimer = setInterval(
                  function () {
                    var dummyQuery = 'meta';  // TODO: Use given query.
                    _this.librarian.explorePhotos(dummyQuery);
                  },
                  _this.options.explorationInterval
                );
              }
              if (!_this.updateTimer) {
                _this.updateTimer = setInterval(
                  function () {_this.perform();},
                  _this.options.updateInterval
                );
              }
            }
          );
        },
        updateTimer: null
      });
    },
    Explorer: function (newOptions) {
      var defaultOptions = {
      };

      $.extend(this, {
        explorePhotos: function (query, librarian, continuation) {
          // TODO: Use Flickr, instagr.am and/or other services.
          // TODO: Use given query.

          var newPhotoId = ++(this.lastPhotoId);
          var photoPageUri = newPhotoId;
          var a = M.Maid.random(0, 10);
          var i = M.Maid.random(0, 10);
          var t = M.Maid.random(0, 10);
          librarian.archivePhoto({
            authorName: 'Author' + a,
            authorUri: '/authors/' + a,
            largeThumbnailUri: '/thumbnails/large' + i,
            pageUri: photoPageUri,
            smallThumbnailUri: '/thumbnails/small' + i,
            title: 'Title' + t
          });

          if (continuation)
            continuation();
        },
        lastPhotoId: 0,
        options: $.extend({}, defaultOptions, newOptions)
      });
    },
    Librarian: function (newOptions) {
      var defaultOptions = {
      };

      $.extend(this, {
        archivePhoto: function (photo) {
          this.photoArchive[photo.pageUri] = photo;
        },
        explorePhotos: function (query, continuation) {
          this.explorer.explorePhotos(query, this, continuation);
        },
        explorer: new M.Explorer(),
        initializePhotoArchive: function (query, requiredCount, continuation) {
          var _this = this;
          this.explorePhotos(
            query,
            function () {
              if (requiredCount <= Object.keys(_this.photoArchive).length) {
                if (continuation)
                  continuation();
              } else {
                _this.initializePhotoArchive(
                  query,
                  requiredCount,
                  continuation
                );
              }
            }
          );
        },
        options: $.extend({}, defaultOptions, newOptions),
        photoArchive: null,
        resetPhotoArchive: function () {
          this.photoArchive = {/* 'id': {photoMetadata} */};
        }
      });
      this.resetPhotoArchive();
    },
    Maid: {
      choose: function (array) {
        var n = M.Maid.random(0, array.length);
        return array.slice(n, n + 1);
      },
      format: function (format, values) {
        return format.replace(/{(\w+)}/g, function (_, key) {
          return values[key];
        });
      },
      getFlickrUri: function (photo, type) {
        if (type == 'author') {
          return M.Maid.format(
            'http://www.flickr.com/photos/{owner}/',
            photo
          );
        } else if (type == 'large') {
          return M.Maid.format(
            'http://farm{farm}.static.flickr.com/{server}/{id}_{secret}_t.jpg',
            photo
          );
        } else if (type == 'photo') {
          return M.Maid.format(
            'http://www.flickr.com/photos/{owner}/{id}/',
            photo
          );
        } else if (type == 'small') {
          return M.Maid.format(
            'http://farm{farm}.static.flickr.com/{server}/{id}_{secret}_s.jpg',
            photo
          );
        } else {
          throw M.Maid.format('Unknown type "{type}"', {'type': type});
        }
      },
      random: function (minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum)) + minimum;
      }
    }
  });
})(jQuery);

// vim: expandtab softtabstop=2 shiftwidth=2
