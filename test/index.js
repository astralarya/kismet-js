var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    kismet = require('../index');

describe('#parse', function() {
    it('ignores whitespace', function() {
      kismet.parse('').should.deep.equal({formula: null, value: null});
      kismet.parse('\t2  +\t\t 3').should.deep.equal({formula: '2+3', value: 5});
    });
    it('performs arithmetic', function() {
      kismet.parse('2+2').value.should.equal(4);
      kismet.parse('5-3').value.should.equal(2);
      kismet.parse('3-5').value.should.equal(-2);
      kismet.parse('3*4').value.should.equal(12);
      kismet.parse('2+3*4+5').value.should.equal(19);
      kismet.parse('(2+3)*4+5').value.should.equal(25);
      kismet.parse('4^3').value.should.equal(64);
      kismet.parse('16^0.5').value.should.equal(4);
      kismet.parse('1.23e-10*100').value.should.equal(1.23e-8);
    });
    it('generates random numbers', function() {
      for(var i = 0; i < 100; i++) {
        kismet.parse('d20').value.should.within(1,20);
        kismet.parse('2d4').value.should.within(2,8);
        kismet.parse('d%').value.should.within(1,100);
        kismet.parse('(d6)d10').value.should.within(1,60);
        kismet.parse('d8+4').value.should.within(5,12);
      }
    });
});
