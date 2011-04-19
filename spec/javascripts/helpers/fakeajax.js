var fakeajax = {
  fake_jQuery_getJSON: function (uri, data, callback) {
    callback(fakeajax.fakeResponse);
  },
  fakeResponse: null,
  original_jQuery_getJSON: jQuery.getJSON,
  successResponseFromFlickr: {
    'photos': {
      'page': 1,
      'pages': 1,
      'perpage': 100,
      'total': '40',
      'photo': (function () {
        var photos = [];
        for (var i = 0; i < 40; i++) {
          var s = i.toString();
          var dummyPhoto = {
            'id': s,
            'owner': s,
            'secret': s,
            'server': s,
            'farm': 6,
            'title': s,
            'ispublic': 1,
            'isfriend': 0,
            'isfamily': 0
          };
          photos.push(dummyPhoto);
        }
        return photos;
      })()
    },
    'stat': 'ok'
  }
};

beforeEach(function () {
  fakeajax.fakeResponse = fakeajax.successResponseFromFlickr;
  jQuery.getJSON = fakeajax.fake_jQuery_getJSON;
});
afterEach(function () {
  jQuery.getJSON = fakeajax.original_jQuery_getJSON;
});

// __END__
// vim: expandtab shiftwidth=2 softtabstop=2
