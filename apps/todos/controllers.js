var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
var _ = require('underscore');

exports.index = function(req, res){
  Todo.find({}, function(err, objs) {
      if(!err) {
        oobjs=[];
        for(var i=0;i<objs.length;i++) oobjs.push(convertOutput(objs[i]));
        res.send(oobjs);
      }
    });
};

exports.new = function(req, res){
  var id;
  createOrUpdate(req, id, function(err, newTodo) {
      if(!err) res.send(newTodo);
    });
};

exports.create = function(req, res){
  var id;
  createOrUpdate(req, id, function(err, newTodo) {
      if(!err) res.send(newTodo);
    });
};

exports.show = function(req, res){
  res.send(convertOutput(req.todo));
};

exports.update = function(req, res){
  if(req.todo) {
    createOrUpdate(req, req.todo, function(err, newTodo) {
        if(!err) res.send(newTodo);
      });
  }
};

exports.destroy = function(req, res){
  console.log('destroy called');
  if(req.todo) {
    var todo = req.todo;
    console.log('removed: ' + todo);
    todo.remove(function(err) { if(!err) res.send(200); });
  }
};

exports.load = function(id, fn){
  process.nextTick(function(){
      console.log(" ... find " + id);
      Todo.findById(id, function(err, obj) {
          console.log(" ... result " + obj);
          fn(null, obj);
        });
  });
};

function convertOutput(obj) {
  var o=obj.toObject(); 
  o.id=o._id; 
  delete o._id; 
  return o;
}

function createOrUpdate(req, record, cb) {
  var body = req.body;
  if(body && body['todo']) {
    body = body.todo;
  }
  var query = req.query;
  if(query && query['todo']) {
    query = query.todo;
  }
  var params = _.extend(query, body);
  console.log('... inside create or update ...');
  var title = params['title'];
  var isDone = params['isDone'];
  var order = params['order'];

  if(!record) {
    record = new Todo( {title:title} );
    console.log(' creating :' + record);
  }
  if(title) record.title = title;
  if(isDone) record.isDone = isDone;
  if(order) record.order = order;
  console.log(' updating :' + record);
  record.save(function(err) { cb(err, convertOutput(record)); });
} 

