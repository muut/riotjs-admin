/*
	Riot.js 0.9.7 | moot.it/riotjs | @license MIT
	(c) 2013 Tero Piirainen, Moot Inc and other contributors.
*/
(function($) { "use strict";

$.observable = function(el) {
  var callbacks = {}, slice = [].slice;

  el.on = function(events, fn) {

    if (typeof fn === "function") {
      events = events.split(/\s+/);

      for (var i = 0, len = events.length, type; i < len; i++) {
        type = events[i];
        (callbacks[type] = callbacks[type] || []).push(fn);
        if (len > 1) fn.typed = true;
      }
    }
    return el;
  };

  el.off = function(events) {
    events = events.split(/\s+/);

    for (var i = 0; i < events.length; i++) {
      callbacks[events[i]] = [];
    }

    return el;
  };

  // only single event supported
  el.one = function(type, fn) {
    if (fn) fn.one = true;
    return el.on(type, fn);

  };

  el.trigger = function(type) {

    var args = slice.call(arguments, 1),
      fns = callbacks[type] || [];

    for (var i = 0, fn; i < fns.length; ++i) {
      fn = fns[i];

      if (fn.one && fn.done) continue;

      // add event argument when multiple listeners
      fn.apply(el, fn.typed ? [type].concat(args) : args);

      fn.done = true;
    }

    return el;
  };

  return el;

};

// Precompiled templates (JavaScript functions)
var FN = {};

// Render a template with data
$.render = function(template, data) {
  if(!template) return '';

  FN[template] = FN[template] || new Function("_",
    "return '" + template
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/'/g, "\\'")
      .replace(/\{\s*(\w+)\s*\}/g, "'+(_.$1?(_.$1+'').replace(/&/g,'&amp;').replace(/\"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'):(_.$1===0?0:''))+'") + "'"
  );

  return FN[template](data);
};


// browsers only
if (typeof top != "object") return;

// cross browser popstate
var currentHash,
  pops = $.observable({}),
  listen = window.addEventListener,
  doc = document;

function pop(hash) {
  hash = hash.type ? location.hash : hash;
  if (hash != currentHash) pops.trigger("pop", hash);
  currentHash = hash;
}

if (listen) {
  listen("popstate", pop, false);
  doc.addEventListener("DOMContentLoaded", pop, false);

} else {
  doc.attachEvent("onreadystatechange", function() {
    if (doc.readyState === "complete") pop("");
  });
}

// Change the browser URL or listen to changes on the URL
$.route = function(to) {
  // listen
  if (typeof to === "function") return pops.on("pop", to);

  // fire
  if (history.pushState) history.pushState(0, 0, to);
  pop(to);

};})(typeof top == "object" ? window.$ || (window.$ = {}) : exports);
;(function(is_node) {
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


// session management goes here, needs some cleanup to make it easier to read / understand
function Backend(conf) {

  var self = this,
    cache = {};

  self.call = function(method, arg, fn) {

    console.info("->", method, arg);

    var logged_in = method == 'init' && localStorage.sessionId,
        ret = test_data[method](arg, logged_in),
        promise = new Promise(fn);

    promise.done(fn);

    // optional caching
    if (conf.cache && method == 'load') {
      if (cache[arg]) return promise.done(cache[arg])
      cache[arg] = ret;
    }

    // session management
    if (ret.sessionId) localStorage.sessionId = ret.sessionId;
    if (method == 'logout') localStorage.removeItem("sessionId")

    setTimeout(function() {
      promise.always(ret);
      promise[ret === false ? 'fail' : 'done'](ret);

      console.info("<-", ret);

    }, 400)

    return promise;

  }

}


// Another good use case for observables
function Promise(fn) {
  var self = $.observable(this);

  $.each(['done', 'fail', 'always'], function(i, name) {
    self[name] = function(arg) {
      return self[$.isFunction(arg) ? 'on' : 'trigger'](name, arg);
    };

  });

}


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



// Test data ("fixtures")

function graph(mult) {
  var arr = [];

  for (var i = 0; i < 30; i++) {
    arr[i] = Math.random() * mult * i;
  }

  return arr;
}

function customers() {
  return [
    { id: 34, img: 'img/tipiirai.jpg', name: 'Machinery', val: 398 },
    { id: 60, img: 'img/tipiirai.jpg', name: 'Big Robots', val: 318 },
    { id: 89, img: 'img/tipiirai.jpg', name: 'Monsterous', val: 267 }
  ];
}

function user(id) {
  return {
    id: 809,
    img: 'img/tipiirai.jpg',
    name: 'Tero Piirainen',
    desc: 'Elit hoodie pickled, literally church-key whatever High Life skateboard tofu actually reprehenderit. Id slow-carb asymmetrical accusamus Portland, flannel tempor proident odio esse quis.'
  }
}

var test_data = {

  // load new "page"
  load: function(path) {

    var els = path.split("/"),
      page = els[0];

    return {
      path: path,
      type: page || "stats",
      data: page == "stats" ? [ graph(100), graph(100), graph(200) ] :
            page == "customers" ? customers() :
            page == "user" ? user(els[1]) : []
    }

  },

  // init
  init: function(page, logged_in) {

    return !logged_in ? false : {
      user: {
        email: "joe@riotjs.com",
        name: "Joe Rebellous",
        username: "riot"
      },
      sessionId: 'riot-test-id',
      view: test_data.load(page)
    }

  },

  search: function(query) {
    return customers();
  },

  login: function(params) {
    return test_data.init(params.page, params.username == 'riot')
  },

  logout: function() {
    return true;
  }

}


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

}})(typeof exports == "object")
// A minimalistic line graph tool, not tested
$.fn.graph2 = function(data, color) {

  var graph = this;
      padd = 35,
      c = graph[0].getContext("2d"),
      max = Math.max.apply(0, data),
      width = graph.width(),
      height = graph.height(),
      len = data.length;

  // re-render? -> clear
  c.clearRect (0, 0, width, height);

  function getX(val) {
    return ((width - padd) / len) * val + (padd * 1.5);
  }

  function getY(val) {
    return height - (((height - padd) / max) * val) - padd;
  }

  c.strokeStyle = "#999";
  c.font = "12px " + $("body").css("fontFamily");
  c.fillStyle = "#666"
  c.textAlign = "center";

  // axises
  c.lineWidth = .5;
  c.beginPath();
  c.moveTo(padd, 0);
  c.lineTo(padd, height - padd);
  c.lineTo(width, height - padd);
  c.stroke();

  // x labels
  for(var i = 0; i < len; i++) {
    c.fillText(i, getX(i), height - padd + 20);
  }

  // y labels
  c.textAlign = "right"
  c.textBaseline = "middle";

  var steps = Math.round(max / 6 / 100) * 100;

  for(var i = 0; i < max; i += steps) {
    c.fillText(i, padd - 10, getY(i));
  }

  // lines
  c.lineWidth = 1;
  c.beginPath();
  c.moveTo(getX(0), getY(data[0]));

  for(var i = 1; i < len; i ++) {
    c.lineTo(getX(i), getY(data[i]));
  }

  c.strokeStyle = color;
  c.stroke();

};



// List of customers
admin(function(app) {

  var root = $("#bars", app.root),
    tmpl = $("#bars-tmpl").html();

  app.on("load:customers", function(view) {

    var max;

    // clear existing data
    root.empty();

    $.each(view, function(i, entry) {
      var val = entry.val;
      if (!i) max = val;

      entry.width = Math.round(val / max * 100);

      root.append($.render(tmpl, entry))
    })

  })

})

// login and logout

admin(function(app) {

  var user = app.user;

  // login
  $("#login").submit(function(e) {
    e.preventDefault();

    user.login({
      username: this.username.value,
      password: this.password.value,
      page: app.page

    }).fail(function() {
      console.info("login failed");
    })

  })

  // logout
  $("#logout").click(function(e) {
    e.preventDefault();
    user.logout();
  })

  function toggle(is_logged) {
    app.root.toggleClass("is-logged", is_logged).toggleClass("is-not-logged", !is_logged)
  }

  user.on("login logout", function(type) {
    toggle(type == 'login');
  })

  toggle(!!user.username);

})

// Search dropdown
admin(function(app) {

  var form = $("#search"),
      tmpl = $("#result-tmpl").html(),
      results = $("#results");

  form.submit(function(e) {

    e.preventDefault();

    var form = $(this),
        val = $.trim(this.q.value);

    if (!val) return;

    form.addClass("is-loading");

    app.search(val, function(arr) {
      form.removeClass("is-loading");
      results.empty().show();

      $.each(arr, function(i, res) {
        results.append($.render(tmpl, res))
      })
    })

    $(document).one("click keypress", function() {
      results.hide();
    })

  })

})

// Draw stats
admin(function(app) {

  var canvas = $("canvas", app.root),
    colors = ['#be0000', '#4cbe00', '#1fadc5'];

  app.on("load:stats", function(stats) {

    $.each(stats, function(i, data) {
      canvas.eq(i).graph2(data, colors[i])
    });

  })

})

// Single user
admin(function(app) {

  var root = $("#user"),
    tmpl = $("#user-tmpl").html()

  app.on("load:user", function(data) {
    console.info(data);
    root.html($.render(tmpl, data))
  })

});

// Handle (animated) view switching, aka. routing
admin(function(app) {

  // 1. select elements from the page to call $.route(path)
  $(document).on("click", "a[href^='#/']", function() {

    // Riot changes the URL, notifies listeners and takes care of the back button
    $.route($(this).attr("href"));

  });


  // 2. listen to route clicks and back button
  $.route(function(path) {

    // Call API method to load stuff from server
    app.load(path.slice(2));

  });

  // assign is-active class name after server responds
  app.on("before:load", function() {

    // is-active CSS class name deals with page switch animation
    $(".page.is-active").removeClass("is-active");

  }).on("load", function(view) {

    $("#" + view.type + "-page").addClass("is-active");

  });

});

