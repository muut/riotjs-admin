
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
