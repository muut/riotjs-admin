
// The ability to split your single-page application (SPA) into loosely-coupled modules

var instance;

top.admin = riot.observable(function(arg) {

  // admin() --> return instance
  if (!arg) return instance;

  // admin(fn) --> add a new module
  if ($.isFunction(arg)) {
    top.admin.on("ready", arg);

  // admin(conf) --> initialize the application
  } else {

    instance = new Admin(arg);

    instance.on("ready", function() {
      top.admin.trigger("ready", instance);
    });

  }

});

