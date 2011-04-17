describe('Librarian', function () {
  describe('(constructor)', function () {
    it('should return a new librarian', function () {
      var l = new Metastagram.Librarian();
      expect(typeof l.explorePhotos).toBe('function');
    });
    it('should return a new librarian with given options', function () {
      var options = {
        x: 1234
      };
      var l = new Metastagram.Librarian(options);
      for (var key in options) {
        expect(l.options[key]).toBe(options[key]);
      }
    });
  });
  describe('explorePhotos', function () {
    it('should archive found photos', function () {
      var l = new Metastagram.Librarian();

      expect(Object.keys(l.photoArchive).length).toBe(0);

      l.explorePhotos();
      expect(Object.keys(l.photoArchive).length).toBeGreaterThan(0);
    });
    it('may not find new photos', function () {
      var l = new Metastagram.Librarian();

      var newCount = Object.keys(l.photoArchive).length;
      var oldCount = newCount;
      for (var i = 0; i < 10; i++) {
        l.explorePhotos();

        newCount = Object.keys(l.photoArchive).length;
        expect(newCount).not.toBeLessThan(oldCount);

        oldCount = newCount;
      }
    });
  });
  describe('resetPhotoArchive', function () {
    it('should clear photoArchive', function () {
      var l = new Metastagram.Librarian();

      l.explorePhotos();
      l.explorePhotos();
      l.explorePhotos();
      expect(Object.keys(l.photoArchive).length).toBeGreaterThan(0);

      l.resetPhotoArchive();
      expect(Object.keys(l.photoArchive).length).toBe(0);
    });
  });
});




// __END__
// vim: expandtab shiftwidth=2 softtabstop=2
// vim: foldmethod=expr
// vim: foldexpr=getline(v\:lnum)=~#'\\v<x?(describe|it)>.*<function>\\s*\\([^()]*\\)\\s*\\{'?'a1'\:(getline(v\:lnum)=~#'^\\s*});'?'s1'\:'=')
