#!/usr/bin/env node

// grunt is messy, shelljs is great

require('shelljs/make');

var gaze = require('gaze'),
    stylus = require('stylus'),
    header = ";(function(top) {",
    footer = '})(typeof top == "object" ? window : exports);';


// Make a single file out of everything
function concat() {

  mkdir("-p", "dist");

  // riot.js
  var js = cat("bower_components/riotjs/riot.js")

  // api
  js += header + cat("src/api/*.js") + footer;

  // ui
  js+= cat(["src/ext/*.js", "src/ui/*.js"])

  // dist
  js.to("dist/admin.js")

}

target.test = function() {

  mkdir("-p", "dist");

  // generate API files
  (header + cat("src/api/*.js") + footer).to("dist/api.js");

  // run tests
  require("./test/index.js");
}


// return target.test();


// Compile stylus file
function styl(source, target) {
  var dir = source.split("/").slice(0, -1).join("/");

  stylus(cat(source), { compress: true }).include(dir).render(function(err, css) {
    if (err) throw err;
    css.to(target);
  });

}

// ./make.js concat
target.concat = concat;

// ./make.js watch
target.watch = function() {

  gaze("src/**/*.js", function() {
    this.on('all', function(e, file) {
      concat()
    });
  })

  gaze("style/*.styl", function() {
    this.on('changed', function(e, file) {
      styl("style/style.styl", "style/style.css")
    })
  })

}


