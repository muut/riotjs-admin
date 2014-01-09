
/*jshint multistr:true */

// Fake server responses (aka. "fixtures"),

var customers = $.map([
  'Acme, inc.',
  'Widget Corp',
  '123 Warehousing',
  'Demo Company',
  'Smith and Co.',
  'Foo Bars',
  'ABC Telecom',
  'Fake Brothers',
  'QWERTY Logistics',
  'Demo, inc.',
  'Sample Company',
  'Sample, inc',
  'Acme Corp',
  'Allied Biscuit',
  'Ankh-Sto Associates',
  'Extensive Enterprise',
  'Galaxy Corp',
  'Globo-Chem',
  'Mr. Sparkle',
  'Globex Corporation',
  'LexCorp',
  'LuthorCorp',
  'Praxis Corporation',
  'Sombra Corporation',
  'Sto Plains Holdings'

], function(name, i) {
  return { name: name, id: i + 1, val: 100 - (i * 4) + (5 * Math.random()) };

});

function customer(id) {
  return $.extend(customers[id - 1], {

    img: 'img/company.png',
    joined: (+new Date() - 100000),
    email: 'demo@company.it',

    desc: 'Elit hoodie pickled, literally church-key whatever High Life skateboard \
      tofu actually reprehenderit. Id slow-carb asymmetrical accusamus \
      Portland, flannel tempor proident odio esse quis.',

    invoices: $.map([200, 350, 150, 600], function(total, i) {
      return { id: i + 1, total: total, time: (+new Date() - 1234567890 * i) };
    }),

    users: users

  });

}

var users = $.map([
  'Cheryll Egli',
  'Dominque Larocca',
  'Judie Flaugher',
  'Leonard Fason',
  'Lia Monteith',
  'Lindsy Woolard',
  'Rosanna Broadhead',
  'Sharyl Finlayson',
  'Spencer Zeller',
  'Zelda Fazenbaker'

], function(name, i) {
  return { name: name, id: i + 1, img: 'img/tipiirai.jpg' };

});

function user(id) {

  return $.extend(users[id - 1], {
    username: 'dominique2',
    email: 'demo.user@riotjs.com',
    joined: (+new Date() - 100000),

    desc: 'Elit hoodie pickled, literally church-key whatever High Life skateboard \
      tofu actually reprehenderit. Id slow-carb asymmetrical accusamus \
      Portland, flannel tempor proident odio esse quis.'
  });

}

function graph(multiplier) {
  var arr = [];

  for (var i = 0; i < 30; i++) {
    arr[i] = Math.random() * multiplier * i;
  }

  return arr;
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
            page == "customers" ? customers :
            page == "customer" ? customer(els[1]) :
            page == "user" ? user(els[1]) : []
    };

  },

  // init
  init: function(page, sessionId) {

    return !sessionId ? false : {
      user: {
        email: "joe@riotjs.com",
        name: "Joe Rebellous",
        username: "riot"
      },
      sessionId: sessionId,
      view: test_data.load(page)
    };

  },

  search: function(query) {
    return users;
  },

  login: function(params) {
    return test_data.init(params.page, params.username == 'riot');
  },

  logout: function() {
    return true;
  }

};
