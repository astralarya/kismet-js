var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    kismet = require('../index');

describe('#parse', function() {
    it('ignores whitespace', function() {
      expect(kismet.parse('')).null;
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
    it('generates random numbers', function() {
      for(var i = 0; i < 100; i++) {
        kismet.parse('d20').should.within(1,20);
        kismet.parse('2d4').should.within(2,8);
        kismet.parse('d%').should.within(1,100);
        kismet.parse('(d6)d10').should.within(1,60);
        kismet.parse('d8+4').should.within(5,12);
      }
    });
});
