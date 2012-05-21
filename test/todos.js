/*
 * Unit test cases for todo api server
 */
var server = require('../server');
var berry = require('berry');

// configuration
var serverUrl = 'http://localhost:8080/api';

describe('todos - API server verification', function() {
  before(function(done) {
    process.nextTick(function() {
      done();
    });
  });
  describe('/general queries', function() {
    it('/api', function(done) {
      berry.request.get(serverUrl).end(function(res) {
        var versionObj = {version:'0.1.0'};  // just verify the version
        //console.log('res:'+JSON.stringify(res.body));
        berry.assert.ok(berry.checkObject(versionObj, res.body), 'response mismatch');
        done();
      });
    });
  });
  var url = serverUrl + '/v1/todos';
  var todoObj = {title:'Hello Todo'};
  var todoObj1 = {title:'Updated Hello Todo'};
  var crudfn = berry.crudTester(url, todoObj, todoObj1);
  describe('/CRUD tests', crudfn);
});
