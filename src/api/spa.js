
// The ability to split the application into loosely-coupled modules

// Works on client and server
var top = is_node ? exports : window,
  instance;


top.admin = $.observable(function(arg) {

  // admin() --> return instance
  if (!arg) return instance;

  // admin(fn) --> add a new module
  if ($.isFunction(arg)) {
    admin.on("ready", arg);

  // admin(conf) --> initialize the application
  } else {

    instance = new Admin(arg);

    instance.on("ready", function() {
      admin.trigger("ready", instance);
    });

  }

});

