var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

exports.index = function(req, res){
  Todo.index(req,res);
};

exports.new = function(req, res){
  Todo.createObject(req, res);
};

exports.create = function(req, res){
  Todo.createObject(req, res);
};

exports.show = function(req, res){
  Todo.showObject(req.todo, req, res);
};

exports.update = function(req, res){
  Todo.updateObject(req.todo, req, res);
};

exports.destroy = function(req, res){
  Todo.removeObject(req.todo, req, res);
};

exports.load = function(id, fn) {
  Todo.findObject(id, fn);
};
