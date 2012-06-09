/**
 * Configuration settings
 */
var config = {};

// application data
config.app = {};
config.app.title = 'Todos Server';
config.app.version = '0.1.1';
config.app.key = 'todos';
config.app.secret = 'XoB_kCoL';
  
// api related configs
config.api = {};
config.api.path = '/api/*';
config.api.keycheck = false;

// server related settings
config.server =  {};
config.server.port = process.env.PORT || 8080;
config.server.path = __dirname + '/..';
config.server.views= config.server.path + '/views';
config.server.modules = [
  'todos'
];
config.server.jsonp = true;


// auth related settings
config.authentication = {};
config.authentication.enabled= false;
  
// db related settings
config.db = {};
config.db.enabled=true;
config.db.url = 'mongodb://localhost:27017/todos';

// production settings 
if(global.process.env.NODE_ENV == 'production') {
  // this is for heroku
  if(global.process.env.MONGOHQ_URL) {
    config.db.url=global.process.env.MONGOHQ_URL;
  }
}

// export the config
module.exports = config;
