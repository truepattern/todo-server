var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

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
  var content = req.query['content'];
  var done = req.query['done'];
  var order = req.query['order'];
  var id = req.query['id'];
  createOrUpdate(id, content, done, order, function(err, newTodo) {
      if(!err) res.send(newTodo);
    });
};

exports.create = function(req, res){
  var content = req.body['content'];
  var done = req.body['done'];
  var order = req.body['order'];
  var id = req.body['id'];
  createOrUpdate(id, content, done, order, function(err, newTodo) {
      if(!err) res.send(newTodo);
    });
};

exports.show = function(req, res){
  res.send(convertOutput(req.todo));
};

exports.update = function(req, res){
  var newcontent = req.query['content'] || req.body['content'];
  var newdone = req.query['done'] || req.body['done'];
  var neworder = req.query['order'] || req.body['order'];
  var id = req.query['id'] || req.body['id'];
  if(req.todo) {
    createOrUpdate(id, newcontent, newdone, neworder, function(err, newTodo) {
        if(!err) res.send(newTodo);
      });
  }
};

exports.destroy = function(req, res){
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

function createOrUpdate(id, content, done, order, cb) {
  var todoObj;
  if(id) {
    Todo.findById(id, function(err, obj) {
        if(!err) {
          todoObj=obj;
          if(content) todoObj.content = content;
          if(done) todoObj.done = done;
          if(order) todoObj.order = order;
          console.log(' updating :' + todoObj);
          todoObj.save(function(err) { cb(err, convertOutput(todoObj)); });
        }
      });
  } else {
    todoObj = new Todo( {content:content, done: done, order: order} );
    console.log(' creating :' + todoObj);
    todoObj.save(function(err) { cb(err, convertOutput(todoObj)); });
  }
} 

