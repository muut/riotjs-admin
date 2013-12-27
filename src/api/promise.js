
// A generic promiese interface by using $.observable

function Promise(fn) {
  var self = $.observable(this);

  $.map(['done', 'fail', 'always'], function(name) {
    self[name] = function(arg) {
      return self[$.isFunction(arg) ? 'on' : 'trigger'](name, arg);
    };

  });

}
