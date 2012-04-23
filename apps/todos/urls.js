require('./models');

var todo = app.resource('todos', require('./controllers'));
apiresource.add(todo);
