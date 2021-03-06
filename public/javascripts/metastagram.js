var Metastagram = (function ($) {
  var M = {};
  return $.extend(M, {
    Artist: function (newOptions) {
      var defaultOptions = {
        boxes: $([]),
        explorationInterval: 5 * 60 * 1000,
        updateInterval: 3000
      };

      $.extend(this, {
        explorationTimer: null,
        librarian: new M.Librarian(),
        options: $.extend({}, defaultOptions, newOptions),
        perform: function () {
          // TODO: Refresh boxes in nice order.
          this.refresh(this.options.boxes);
        },
        refresh: function (boxes) {
          // TODO: Add nice effect to refresh a box.
          // TODO: Do not show the same photo in two or more boxes.
          var a = this.librarian.photoArchive;
          var photo = a[M.Maid.choose(Object.keys(a))];
          var box = M.Maid.choose(boxes);
          box.html(M.Maid.format(
            '<a href="{pageUri}"><img alt="{title}" src="{imageUri}"/></a>',
            $.extend(
              {imageUri: photo.largeThumbnailUri},
              photo
            )
          ));
        },
        start: function () {
          var _this = this;
          var dummyQuery = 'meta';  // TODO: Use given query.
          this.librarian.initializePhotoArchive(
            dummyQuery,
            this.options.boxes.length,
            function () {
              var fillWithPhotos = function (boxes) {
                boxes.each(function () {
                  _this.refresh($(this));
                });
              };
              fillWithPhotos(_this.options.boxes);

              if (!_this.explorationTimer) {
                _this.explorationTimer = setInterval(
                  function () {
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
        flickrApiKey: '203e3a11d79c8092eb14386f79b0a69a'
      };

      $.extend(this, {
        explorePhotos: function (query, librarian, continuation) {
          // TODO: How about other photo sharing service such as instagr.am?
          this.explorePhotosInFlickr(query, function (foundPhotos) {
            $.each(foundPhotos, function (_, photo) {
              librarian.archivePhoto({
                authorName: photo.owner,  // TODO: Fix.
                authorUri: M.Maid.getFlickrUri(photo, 'author'),
                largeThumbnailUri: M.Maid.getFlickrUri(photo, 'large'),
                pageUri: M.Maid.getFlickrUri(photo, 'photo'),
                smallThumbnailUri: M.Maid.getFlickrUri(photo, 'small'),
                title: photo.title
              });
            });
            if (continuation)
              continuation();
          });
        },
        explorePhotosInFlickr: function (query, continuation) {
          // TODO: Think over request failure.
          $.getJSON(
            'http://api.flickr.com/services/rest/?jsoncallback=?',
            {
              api_key: this.options.flickrApiKey,
              format: 'json',
              method: 'flickr.photos.search',
              text: query
            },
            function (data) {
              var foundPhotos = data.photos.photo;
              continuation(foundPhotos);
            }
          );
        },
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
