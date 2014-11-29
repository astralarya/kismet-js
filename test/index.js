var should = require('chai').should(),
    kismet = require('../index');

describe('#parse', function() {
    it('performs addition', function() {
      kismet.parse('2+2').should.equal(4);
    });
});
