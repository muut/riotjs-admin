
// Another good use case for observables
function Promise(fn) {
  var self = $.observable(this);

  $.each(['done', 'fail', 'always'], function(i, name) {
    self[name] = function(arg) {
      return self[$.isFunction(arg) ? 'on' : 'trigger'](name, arg);
    };

  });

}
