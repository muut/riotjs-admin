#!/usr/bin/env node

// grunt is messy, shelljs is not (https://github.com/arturadib/shelljs)

require('shelljs/make');

var gaze = require('gaze'),
  stylus = require('stylus'),
  header = ";(function(top) {",
  footer = '})(typeof top == "object" ? window : exports);';


// initialize repository
function init() {
  mkdir("-p", "dist");
}

// Make a single file out of everything
function concat() {

  init();

  // riot.js
  // var js = cat("bower_components/riotjs/riot.js");
  var js = cat("../riotjs/riot.js");

  // api
  js += header + cat("src/api/*.js") + footer;

  // ui
  js+= cat(["src/ext/*.js", "src/ui/*.js"]);

  // dist
  js.to("dist/admin.js");

}

// Test the API on server side (node.js)
target.test = function() {

  init();

  // generate API files
  (header + cat("src/api/*.js") + footer).to("dist/api.js");

  // run tests
  require("./test/index.js");
}


target.lint = function() {
  exec("jshint src");
}

// return target.test();

// Function to compile a single stylus file
function styl(source, target) {
  var dir = source.split("/").slice(0, -1).join("/");

  stylus(cat(source), { compress: true }).include(dir).render(function(err, css) {
    if (err) throw err;
    css.to(target);
  });

}

// concat target
target.concat = concat;


// generate application
target.gen = function() {
  concat();
  styl("style/index.styl", "dist/style.css");
  cp("-f", "bower_components/jquery/dist/jquery.min.js", "dist");
};

// watch for changes: ./make.js watch
target.watch = function() {

  // scripts
  gaze("src/**/*.js", function() {
    this.on('all', function(e, file) {
      concat();
    });
  });

  // styles
  gaze("style/*.styl", function() {
    this.on('changed', function(e, file) {
      styl("style/index.styl", "dist/style.css");
    });
  });

};


