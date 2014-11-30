var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    kismet = require('../index');

describe('#parse', function() {
    it('ignores whitespace', function() {
      expect(kismet.parse('')).to.be.null;
      kismet.parse('\t2  +\t\t 3').should.equal(5);
    });
    it('performs arithmetic', function() {
      kismet.parse('2+2').should.equal(4);
      kismet.parse('5-3').should.equal(2);
      kismet.parse('3-5').should.equal(-2);
      kismet.parse('3*4').should.equal(12);
      kismet.parse('2+3*4+5').should.equal(19);
      kismet.parse('(2+3)*4+5').should.equal(25);
      kismet.parse('4^3').should.equal(64);
      kismet.parse('16^0.5').should.equal(4);
      kismet.parse('1.23e-10*100').should.equal(1.23e-8);
    });
});
