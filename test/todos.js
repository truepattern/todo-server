/*
 * Unit test cases for todo api server
 */
var server = require('../server');
var assert = require('chai').assert;
var expect = require('chai').expect;
var request = require('superagent');
var _ = require('underscore');

var serverUrl = 'http://localhost:8080/api';

/* Look for if all the keys in src are present in target.
 * The relation is all in keys, target can have extra values
 * -- Make it deep compare
 */
function objectPresent(src, target) {
  var mismatch=_.find(_.keys(src), function(key) { return src[key] !== target[key]; });
  return typeof mismatch==='undefined';
}

function objectPresentInArray(src, target) {
  var presence=_.find(target, function(obj) { return objectPresent(src, obj); });
  return typeof presence!=='undefined';
}

describe('todos - API server verification', function() {
  before(function(done) {
    process.nextTick(function() {
      done();
    });
  });
  describe('general queries', function() {
    it('/api', function(done) {
      request.get(serverUrl).end(function(res) {
        var versionObj = {version:'0.0.3'};  // just verify the version
        //console.log('res:'+JSON.stringify(res.body));
        assert.ok(objectPresent(versionObj, res.body), 'response mismatch');
        done();
      });
    });
  });
  describe('CRUD checks', function() {
    var url = serverUrl + '/v1/todos';
    var todoObj = {title:'Hello Todo'};
    it('new', function(done) {
      request.post(url)
        .send(todoObj)
        .end(function(res) {
          //console.log('res:'+JSON.stringify(res.body));
          assert.ok(objectPresent(todoObj, res.body), 'response mismatch');
          // update the todoObj with id
          todoObj.id = res.body.id;
          todoObj.isDone = false;
          done();
        });
    });

    // check in list
    it('index', function(done) {
      request.get(url)
        .end(function(res) {
          //console.log('res:'+JSON.stringify(res.body));
          assert.ok(objectPresentInArray(todoObj, res.body), 
                    'object NOT present - '+JSON.stringify(todoObj));
          done();
        });
    });

    // modify the todo
    it('update', function(done) {
      var uurl=url+'/'+todoObj.id;
      todoObj.title='New Title';
      request.put(uurl)
        .send(todoObj)
        .end(function(res) {
          //console.log('res:'+JSON.stringify(res.body));
          assert.ok(objectPresent(todoObj, res.body), 'response mismatch');
          done();
        });
    });

    // delete the todo
    it('delete', function(done) {
      var durl=url+'/'+todoObj.id;
      request.del(durl)
        .end(function(res) {
          assert.ok(res.ok, 'invalid status');
          done();
        });
    });


  });
  /*
    //beforeEach
    //afterEach
  */
});
