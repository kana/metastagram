var Metastagram = (function ($) {
  var M = {};
  return $.extend(M, {
    Artist: function (newOptions) {
      var defaultOptions = {
        hotBoxes: $([]),
        normalBoxes: $([]),
        updateInterval: 3000
      };

      $.extend(this, {
        options: $.extend({}, defaultOptions, newOptions),
        perform: function () {
          // TODO: Refresh boxes in nice order.
          this.refresh(this.options.normalBoxes);
          this.refresh(this.options.hotBoxes);
        },
        refresh: function (boxes) {
          // TODO: Add nice effect to refresh a box.
          // TODO: Use images from Librarian.
          var box = M.Maid.choose(boxes);
          box.text(M.Maid.random(0, 10));
        },
        start: function () {
          if (!this.timer) {
            var _this = this;
            this.timer = setInterval(
              function () {_this.perform();},
              this.options.updateInterval
            );
          }
        },
        timer: null
      });
    },
    Explorer: {
    },
    Librarian: {
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
