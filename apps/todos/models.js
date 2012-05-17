// list the models for 'todo' module
var mongoose = require('mongoose'), 
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  aonx = require('aonx');

/* schema definitions go here */
var Todo = new Schema({
    title  : { type:String, required:true, index: true },
    isDone : { type:Boolean, default: false  },
    order  : Number
  });

// add the crud helper
Todo.plugin(aonx.crudHelpers);

/* Now define the model into mongoose */
mongoose.model('Todo', Todo);
