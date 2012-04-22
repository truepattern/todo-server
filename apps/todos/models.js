// list the models for 'todo' module
var mongoose = require('mongoose'), 
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

/* schema definitions go here */
var Todo = new Schema({
    content  : { type:String, required:true, index: true },
    done     : { type:Boolean, default: false  },
    order    : Number
  });


// methods for the model

/* Now define the model into mongoose */
mongoose.model('Todo', Todo);
