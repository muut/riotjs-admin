
// A generic promiese interface by using riot.observable

function Promise(fn) {
  var self = riot.observable(this);

  $.map(['done', 'fail', 'always'], function(name) {
    self[name] = function(arg) {
      return self[$.isFunction(arg) ? 'on' : 'trigger'](name, arg);
    };
  });

}
