var should = require('chai').should(),
    kismet = require('../index');

describe('#parse', function() {
    it('performs arithmetic', function() {
      kismet.parse('2+2').should.equal(4);
      kismet.parse('5-3').should.equal(2);
      kismet.parse('3-5').should.equal(-2);
      kismet.parse('3*4').should.equal(12);
      kismet.parse('2+3*4+5').should.equal(19);
      kismet.parse('(2+3)*4+5').should.equal(25);
      kismet.parse('4^3').should.equal(64);
      kismet.parse('16^0.5').should.equal(4);
    });
});
