describe('Maid', function () {
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
