/**
 * Todo Server.js main file
 */
var config        = require('./config/settings.js');
var aonx          = require('aonx');


// init the server
aonx.init(config);

global.app=aonx.app;
global.config=config;

// enable authentication
// load any authentication modules available
if(config.authentication.enabled) {
  console.log("Loading authentication modules");
  var m='./apps/' + config.authentication.module + '/urls';
  require(m);
}

var api = {
  index: function(req,res) {
    var obj={app:config.app.title, version:config.app.version};
    res.json(obj);
  }
};

var apiresource = app.resource('api', api);
global.apiresource = apiresource;

// init all the modules configured (api routes)
for(var i=0;i<config.server.modules.length;i++) {
  console.log('loading module ... ' + config.server.modules[i]);
  var m='./apps/'+config.server.modules[i]+'/urls';
  require(m);
}


// init the server
if (!module.parent) {
  aonx.run();
}
