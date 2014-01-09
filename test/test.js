
// BDD style testing
require("../bower_components/riotjs/bdd.js");

// jQuery object with Riot functions
global.$ = require("../bower_components/riotjs/riot.js");

// $ utility functions used by the API (from lodash)
var _ = require("lodash");

_.each(['map', 'isFunction', 'extend'], function(name) {
  $[name] = _[name];
});
