
// Current user (logged in or anonymous)
function User(app, data, backend) {

  var self = $.observable(this);

  $.extend(self, data);

  self.login = function(params, fn) {

    self.one("login", fn);

    return backend.call("login", params, function(data) {
      self.trigger("login", data);
    });

  };

  self.logout = function(fn) {

    self.one("logout", fn);

    return backend.call("logout", {}, function(data) {
      self.trigger("logout");
    });

  };

}