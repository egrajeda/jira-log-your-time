var chai = require('chai')
  , chaiAsPromised = require('chai-as-promised')
  , fixtures = require('./fixtures/jira.js')
  , Jira = require('../src/jira.js');

chai.use(chaiAsPromised);

var should = chai.should();

describe('Jira', function() {
  const URL = 'https://hello.atlassian.net';

  describe('#myUsername()', function() {

    it('should return the logged-in username', function() {
      var username = Jira.myUsername(URL);
      return username.should.eventually.equal('juan.perez');
    });

  });

  describe('#loggedTimeOf()', function() {

    it('should return the logged time for an user on a given day', function() {
      var loggedTime = Jira.loggedTimeOf(URL, 'juan.perez', new Date(2016, 11, 5));
      return loggedTime.should.eventually.equal(27000);
    });

  });

  describe('#inProgressIssuesOf()', function() {

    it('should return the in progress issues for an user', function(done) {
      Jira.inProgressIssuesOf(URL, 'juan.perez')
        .should.be.fulfilled.then(function(inProgressIssues) {
          inProgressIssues.should.have.length(2);
          inProgressIssues[0].should.have.property('key', 'XX-100');
          inProgressIssues[0].should.have.deep.property('fields.summary', 'XX-100 Summary');
          inProgressIssues[1].should.have.property('key', 'XX-200');
          inProgressIssues[1].should.have.deep.property('fields.summary', 'XX-200 Summary');
        }).should.notify(done);
    });

  });
});
