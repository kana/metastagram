describe('Artist', function () {
  describe('(constructor)', function () {
    it('should return a new artist', function () {
      var a = new Metastagram.Artist();
      expect(typeof a.start).toBe('function');
    });
    it('should return a new artist with given options', function () {
      var options = {
        hotBoxes: $([]),
        normalBoxes: $([]),
        updateInterval: 1234
      };
      var a = new Metastagram.Artist(options);
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
