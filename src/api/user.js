
// Current user (logged in or anonymous)
function User(app, data, backend) {

  var self = $.observable(this);

  $.extend(self, data);

  self.login = function(params, fn) {

    backend.call("login", params, function(data) {
      self.trigger("login", data);
    });

    return self.one("login", fn);

  };

  self.logout = function(fn) {

    backend.call("logout", {}, function(data) {
      self.trigger("logout");
    });

    return self.one("logout", fn);
  };

}