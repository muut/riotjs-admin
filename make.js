#!/usr/bin/env node

require('shelljs/make');

// grunt is messy, shelljs is great

var gaze = require('gaze'),
    stylus = require('stylus');

function concat() {

  // Riot
  var js = cat("../riot.js", "../ext/render.js")

  // api
  js += ";(function(is_node) {" + cat("src/api/*.js") + '})(typeof exports == "object")'

  // ui
  js+= cat(["src/ext/*.js", "src/ui/*.js"])

  // dist
  js.to("dist/admin.js")

}

function styl(source, target) {
  var dir = source.split("/").slice(0, -1).join("/");

  stylus(cat(source), { compress: true }).include(dir).render(function(err, css) {
    if (err) throw err;
    css.to(target);
  });

}

target.concat = concat;

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

