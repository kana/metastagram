describe('Explorer', function () {
  describe('(constructor)', function () {
    it('should return a new explorer', function () {
      var e = new Metastagram.Explorer();
      expect(typeof e.explorePhotos).toBe('function');
    });
    it('should return a new explorer with given options', function () {
      var options = {
        x: 1234
      };
      var e = new Metastagram.Explorer(options);
      for (var key in options) {
        expect(e.options[key]).toBe(options[key]);
      }
    });
  });
  describe('explorePhotos', function () {
    it('should archive found photos by a given librarian', function () {
      var e = new Metastagram.Explorer();
      var l = new Metastagram.Librarian();

      expect(Object.keys(l.photoArchive).length).toBe(0);

      e.explorePhotos('dummyQuery', l);
      expect(Object.keys(l.photoArchive).length).toBeGreaterThan(0);
    });
    it('may not find new photos', function () {
      var e = new Metastagram.Explorer();
      var l = new Metastagram.Librarian();

      var newCount = Object.keys(l.photoArchive).length;
      var oldCount = newCount;
      for (var i = 0; i < 10; i++) {
        e.explorePhotos('dummyQuery', l);

        newCount = Object.keys(l.photoArchive).length;
        expect(newCount).not.toBeLessThan(oldCount);

        oldCount = newCount;
      }
    });
    it('should call a given continuation', function () {
      var e = new Metastagram.Explorer();
      var l = new Metastagram.Librarian();
      var spy = jasmine.createSpy();

      e.explorePhotos('dummyQuery', l, spy);
      expect(spy).toHaveBeenCalled();
    });
    it('should archive photos in Metastagram own format', function () {
      var e = new Metastagram.Explorer();
      var l = new Metastagram.Librarian();

      e.explorePhotos('dummyQuery', l);
      var photoPageUris = Object.keys(l.photoArchive);
      expect(photoPageUris.length).toBeGreaterThan(0);

      var photo = l.photoArchive[photoPageUris[0]];
      var keys = [
        'authorName',
        'authorUri',
        'largeThumbnailUri',
        'pageUri',
        'smallThumbnailUri',
        'title'
      ];
      for (var i in keys)
        expect(photo[keys[i]]).not.toBeNull();
    });
  });
});




// __END__
// vim: expandtab shiftwidth=2 softtabstop=2
// vim: foldmethod=expr
// vim: foldexpr=getline(v\:lnum)=~#'\\v<x?(describe|it)>.*<function>\\s*\\([^()]*\\)\\s*\\{'?'a1'\:(getline(v\:lnum)=~#'^\\s*});'?'s1'\:'=')
