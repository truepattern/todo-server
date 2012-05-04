/**
 * Todo Server.js main file
 */
var config        = require('./config/settings.js');
var aonx          = require('aonx');

// init the server
aonx.init(config);

global.app=aonx.app;
global.config=config;
global.apiresource = aonx.apiresource;

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
