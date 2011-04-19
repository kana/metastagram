describe('Maid', function () {
  describe('choose', function () {
    var x0 = 123;
    var x1 = 'abc';
    var x2 = ['array'];
    var x3 = {'object': x2};
    var xs = [x0, x1, x2, x3];
    var trialCount = 10;
    it('should randomly return an element as array', function () {
      for (var i = 0; i < trialCount; i++) {
        var x = Metastagram.Maid.choose(xs);
        expect(x.length).toBe(1);
        expect(xs).toContain(x[0]);
      }
    });
  });
  describe('format', function () {
    it('should format with given values', function () {
      expect(Metastagram.Maid.format(
        '{foo}.{bar}.{baz}',
        {foo: 'a', bar: 'b', baz: 'c'}
      )).toEqual('a.b.c');
    });
  });
  describe('getFlickrUri', function () {
    var g = Metastagram.Maid.getFlickrUri;
    var photo = {
      id: '5621993782',
      owner: '12516383@N07',
      secret: 'f0c027a687',
      server: '5190',
      farm: 6,
      title: 'All your base are belong to mugs - 10',
      ispublic: 1,
      isfriend: 0,
      isfamily: 0
    };
    it('should create author page uri', function () {
      expect(g(photo, 'author')).toEqual('http://www.flickr.com/photos/12516383@N07/');
    });
    it('should create large image uri', function () {
      expect(g(photo, 'large')).toEqual('http://farm6.static.flickr.com/5190/5621993782_f0c027a687_t.jpg');
    });
    it('should create photo page uri', function () {
      expect(g(photo, 'photo')).toEqual('http://www.flickr.com/photos/12516383@N07/5621993782/');
    });
    it('should create small image uri', function () {
      expect(g(photo, 'small')).toEqual('http://farm6.static.flickr.com/5190/5621993782_f0c027a687_s.jpg');
    });
    it('should throw error for unknown type', function () {
      expect(function () {g(photo, 'unknown');}).toThrow();
    });
  });
  describe('random', function () {
    var trialCount = 2011;
    var minimum = 4;
    var maximum = 17;
    it('should return a random integer in [minimum, maximum)', function () {
      for (var i = 0; i < trialCount; i++) {
        var n = Metastagram.Maid.random(minimum, maximum);
        expect(n).toEqual(Math.floor(n));
        expect(n).not.toBeLessThan(minimum);
        expect(n).toBeLessThan(maximum);
      }
    });
  });
});




// __END__
// vim: expandtab shiftwidth=2 softtabstop=2
// vim: foldmethod=expr
// vim: foldexpr=getline(v\:lnum)=~#'\\v<x?(describe|it)>.*<function>\\s*\\([^()]*\\)\\s*\\{'?'a1'\:(getline(v\:lnum)=~#'^\\s*});'?'s1'\:'=')
