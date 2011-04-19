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
