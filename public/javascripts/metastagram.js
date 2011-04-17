var Metastagram = (function (M, $) {
  return $.extend(M, {
    Artist: {
      create: function (newOptions) {
        var defaultOptions = {
          hotBoxes: $([]),
          normalBoxes: $([]),
          updateInterval: 3000
        };
        var me = {};
        return $.extend(me, {
          options: $.extend({}, defaultOptions, newOptions),
          perform: function () {
            // TODO: Refresh boxes in nice order.
            me.refresh(me.options.normalBoxes);
            me.refresh(me.options.hotBoxes);
          },
          refresh: function (boxes) {
            // TODO: Add nice effect to refresh a box.
            // TODO: Use images from Librarian.
            var box = M.Maid.choose(boxes);
            box.text(M.Maid.random(0, 10));
          },
          start: function () {
            if (!me.timer)
              me.timer = setInterval(me.perform, me.options.updateInterval);
          },
          timer: null
        });
      },
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
})({}, jQuery);

// vim: expandtab softtabstop=2 shiftwidth=2
