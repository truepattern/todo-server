/**
 * Configuration settings
 */
var config = {};

// application data
config.app = {};
config.app.title = 'Todos Server';
config.app.version = '0.0.2';
config.app.key = 'todos';
config.app.secret = 'XoB_kCoL';
  
// api related configs
config.api = {};
config.api.path = '/api/*';
config.api.keycheck = false;

// server related settings
config.server =  {};
config.server.port = process.env.PORT || 8080;
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

// export the config
module.exports = config;
