
// jQuery object with Riot functions
global.$ = require("../bower_components/riotjs/riot.js");

// $ utility functions used by API (from uderscore)
var _ = require("lodash");

_.each(['map', 'isFunction', 'extend'], function(name) {
  $[name] = _[name];
})

// the admin interface
var admin = require("../dist/api.js").admin;;

// run tests
admin(function(app) {
  console.info(app);
});

// initialize
admin({ page: "stats", debug: true, cache: false })
