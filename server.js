#!/bin/env node

var express = require('express');
var fs      = require('fs');
var _ = require('lodash');

var PawsApp = function() { 

  //  Scope.
  var self = this;

  self.setupVariables = function() {
    //  Set the environment variables we need.
    self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
    self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

    if (typeof self.ipaddress === "undefined") {
      self.ipaddress = "127.0.0.1";
    };
  };

  self.populateCache = function() {
    if (typeof self.zcache === "undefined") {
      self.zcache = { 'index.html': '' };
    }

    self.zcache['index.html'] = fs.readFileSync('./public/index.html');
  };

  self.cache_get = function(key) { return self.zcache[key]; };

  self.createRoutes = function() {
    self.routes = { };

    self.routes['/'] = function(req, res) {
      res.setHeader('Content-Type', 'text/html');
      res.send(self.cache_get('index.html') );
    };
		
		self.routes['/uploadImage'] = function(req, res) {
      console.log('inside uploadimg');
			if(req && req.files && req.files.uploadedFile && req.files.uploadedFile.path) {
        fs.readFile(req.files.uploadedFile.path, function (err, data) {
          // ...
          var newPath = __dirname + "/uploads/" + req.files.uploadedFile.name;
          fs.writeFile(newPath, data, function (err) {
            if (!err) {
              res.send("Image Uploaded Successfully!", 202);
            } else {
              res.send("Image Upload failed", 406);
            }

          });
        });
      } else {
        res.send("Image Upload failed", 406);
      }

      res.end();
    };
  };

  self.pluginMiddleware = function() {
    var app = self.app;

    app.use(express.compress());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(express.cookieParser('TopSecret+DoNotRevealIt+Promise!!!+:-)'));

    app.use(function(req, res, next) {
      res.setHeader('Content-Type', 'text/html');
      res.send(self.cache_get('404.html'));
    });
  };

  self.initializeServer = function() {
    self.createRoutes();
    self.app = express();

        //  Add handlers for the app (from the routes).
    for (var r in self.routes) {
      self.app.get(r, self.routes[r]);
    }

    // middleware
    self.pluginMiddleware();
  };

  self.initialize = function() {
    self.setupVariables();
    self.populateCache();

    // Create the express server and routes.
    self.initializeServer();
  };

  self.start = function() {
    //  Start the app on the specific interface (and port).
    self.app.listen(self.port, self.ipaddress, function() {
    console.log('%s: Node server started on %s:%d ...',
           Date(Date.now() ), self.ipaddress, self.port);
    });
  }; 
};

var pawsApp = new PawsApp();
pawsApp.initialize();
pawsApp.start();

