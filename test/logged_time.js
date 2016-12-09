var should = require('chai').should();

var LoggedTime = require('../src/logged_time.js');

describe('LoggedTime', function() {

  describe('#toString()', function() {

    it('should convert seconds to minutes', function() {
      LoggedTime.toString(30).should.equal('00h 00m');
      LoggedTime.toString(60).should.equal('00h 01m');
      LoggedTime.toString(60 * 10).should.equal('00h 10m');
      LoggedTime.toString(60 + 30).should.equal('00h 01m');
    });

    it('should convert seconds to hours', function() {
      LoggedTime.toString(60 * 60).should.equal('01h 00m');
      LoggedTime.toString(60 * 60 * 10).should.equal('10h 00m');
    });

    it('should convert seconds to hours and minutes', function() {
      LoggedTime.toString(60 * 60 + 60).should.equal('01h 01m');
      LoggedTime.toString(60 * 60 + 60 + 30).should.equal('01h 01m');
    });

  });

  describe('#hasEnoughBeenLoggedBy()', function() {

    it('should return true if work has not started yet', function() {
      LoggedTime.isEnough(60, new Date(2016, 0, 1, 6, 0, 0, 0)).should.be.true;
    });

    it('should return true if enough seconds have been logged by a certain hour', function() {
      LoggedTime.isEnough(2400, new Date(2016, 0, 1, 11, 0, 0, 0)).should.be.true;
      LoggedTime.isEnough(4800, new Date(2016, 0, 1, 12, 0, 0, 0)).should.be.true;
    });

    it('should return false if not enough seconds have been logged by a certain hour', function() {
      LoggedTime.isEnough(2200, new Date(2016, 0, 1, 11, 0, 0, 0)).should.be.false;
      LoggedTime.isEnough(2400, new Date(2016, 0, 1, 12, 0, 0, 0)).should.be.false;
    });


  });

});
