
// The API
function Admin(conf) {

  var self = $.observable(this),
      backend = new Backend({ cache: true });

  $.extend(self, conf);

  self.load = function(page, fn) {

    self.trigger("before:load");

    self.one("load", fn);

    backend.call("load", page, function(view) {
      self.trigger("load", view)
    })
  };


  self.search = function(query, fn) {
    return backend.call("search", query, fn);
  };


  self.on("load", function(view) {
    self.trigger("load:" + view.type, view.data, view.path);
    self.page = view.type;
  });


  backend.call("init", conf.page).always(function(data) {
    self.user = new User(self, data ? data.user : {}, backend);
    self.trigger("ready");

  }).done(function(data) {
    self.trigger("load", data.view)

  }).fail(function() {

    // failed because
    self.user.one("login", function(data) {
      $.extend(self.user, data.user);
      self.trigger("load", data.view);

    });

  })

}
