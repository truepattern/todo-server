/**
 * Server.js main file
 */
var express       = require('express');
var resource      = require('express-resource');
var config        = require('./config/settings.js');
var mongoose      = require('mongoose');

var app = module.exports = express.createServer();

// Custom error handlers

// create an error with .status. we
// can then use the property in our
// custom error handler (Connect respects this prop as well)
function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

// register these error handlers in the 
// express configuration
function errorHandlers() {
  // middleware with an arity of 4 are considered
  // error handling middleware. When you next(err)
  // it will be passed through the defined middleware
  // in order, but ONLY those with an arity of 4, ignoring
  // regular middleware.
  app.use(function(err, req, res, next){
      if(req.accepts('html')) {
        res.status(err.status || 500);
        res.render('500', { error: err });
        return;
      }
      res.send(err.status || 500, { error: err.message });
    });

  // our custom JSON 404 middleware. Since it's placed last
  // it will be the last middleware called, if all others
  // invoke next() and do not respond.
  app.use(function(req, res) {
      if(req.accepts('html')) {
        res.status(404);
        res.render('404', { url: req.url });
        return;
      }
      res.send(404, { error: "can't find the resource" });
    });
}

// Custom middlewares

// register all pre handlers here
function preHandlers() {

  if(config.api.keycheck) {
    console.log("Keycheck to API's installed");
    // here we validate the API key 
    app.use('/api', function(req, res, next){
        var key = req.query[config.api.KEYNAME] || req.body[config.api.KEYNAME];
        
        // key isnt present
        if (!key) return next(error(400, 'api key required'));
        
        // key is invalid
        if (!~config.api.keys.indexOf(key)) return next(error(401, 'invalid api key'));
        
        // all good, store req.key for route access
        req.key = key;
        next();
      });
  }
}


function postHandlers() {
}


// Configuration
app.configure(function() {
    // call favicon first
    app.use(express.favicon());
    app.use(express.logger('dev'));
    //app.use(express.logger('\x1b[33m:method\x1b[0m \x1b[32m:url\x1b[0m :response-time'));

    app.set('jsonp callback', true);

    app.use(express.bodyParser());
    app.use(express.methodOverride());  

    app.use(express.cookieParser());
  });

app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

app.configure('production', function() {
    app.use(express.errorHandler()); 
  });

// db init
mongoose.connect(config.db.url);
global.app=app;
global.config=config;

// set the session 
var session = express.session({
    key    : config.app.key,
    secret : config.app.secret
  });
app.use(session);

// enable authentication
// load any authentication modules available
if(config.authentication.enabled) {
  console.log("Loading authentication modules");
  var m='./apps/' + config.authentication.module + '/urls';
  require(m);
}

app.configure(function() {
    // register any pre-handlers
    preHandlers();
    
    app.use(app.router);

    // any static files go to 'public'
    app.use(express.static(__dirname + '/public'));

    // register any post-handlers
    postHandlers();
    
    // register the error handlers next to router
    errorHandlers();
  });


app.all('/api', function(req,res,next) {
    var obj={app:config.app.title, version:config.app.version};
    res.json(obj);
  });
// init all the modules configured (api routes)
for(var i=0;i<config.server.modules.length;i++) {
  console.log('loading module ... ' + config.server.modules[i]);
  var m='./apps/'+config.server.modules[i]+'/urls';
  require(m);
}

// init the server
if (!module.parent) {
  app.listen(Number(config.server.port));
  console.log("%s listening on port '%d' in '%s' mode", 
              config.app.title,
              app.address().port, 
              app.settings.env);
}
