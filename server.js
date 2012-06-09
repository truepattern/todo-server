/**
 * Todo Server.js main file
 */
var config        = require('./config/settings.js');
var aonx          = require('aonx');

// init the server
aonx.init(config);

// init the 'todo' module 
for(var i=0;i<config.server.modules.length;i++) {
  console.log('loading module ... ' + config.server.modules[i]);
  var m='./apps/'+config.server.modules[i]+'/urls';
  require(m);
}

// lets route default to index.html
app.get('/', function(req, res) {
  res.redirect('/index.html');
});

// run the server
aonx.run();
