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
          if (!this.explorationTimer) {
            this.explorationTimer = setInterval(
              function () {
                var dummyQuery = 'meta';  // TODO: Use given query.
                _this.librarian.explorePhotos(dummyQuery);
              },
              this.options.explorationInterval
            );
          }
          if (!this.updateTimer) {
            this.updateTimer = setInterval(
              function () {_this.perform();},
              this.options.updateInterval
            );
          }
        },
        updateTimer: null
      });
    },
    Explorer: {
    },
    Librarian: function (newOptions) {
      var defaultOptions = {
      };

      $.extend(this, {
        explorePhotos: function (query, continuation) {
          // TODO: Use Explorer.
          var newPhotoId = ++(this.lastPhotoId);
          this.photoArchive[newPhotoId] = {
            id: newPhotoId,
            title: newPhotoId + '-' + M.Maid.random(0, 10)
          };

          if (continuation)
            continuation();
        },
        lastPhotoId: null,
        options: $.extend({}, defaultOptions, newOptions),
        photoArchive: null,
        resetPhotoArchive: function () {
          this.lastPhotoId = 0;
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
      random: function (minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum)) + minimum;
      }
    }
  });
})(jQuery);

// vim: expandtab softtabstop=2 shiftwidth=2
