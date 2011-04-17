describe('Artist', function () {
  describe('create', function () {
    it('should return a new artist', function () {
      var a = Metastagram.Artist.create();
      expect(typeof a.start).toBe('function');
    });
    it('should return a new artist with given options', function () {
      var options = {
        hotBoxes: $([]),
        normalBoxes: $([]),
        updateInterval: 1234
      };
      var a = Metastagram.Artist.create(options);
      for (var key in options) {
        expect(a.options[key]).toBe(options[key]);
      }
    });
  });
});




// __END__
// vim: expandtab shiftwidth=2 softtabstop=2
// vim: foldmethod=expr
// vim: foldexpr=getline(v\:lnum)=~#'\\v<x?(describe|it)>.*<function>\\s*\\([^()]*\\)\\s*\\{'?'a1'\:(getline(v\:lnum)=~#'^\\s*});'?'s1'\:'=')
