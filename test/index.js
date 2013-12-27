
// required stuff for tests
require("./test.js")

// the admin interface
var admin = require("../dist/api.js").admin;

// run tests
admin(function(app) {

  it("Should have proper initial values", function() {
    assert.equal(app.page, "stats");
    assert.equal(app.user.username, "riot");
  });

  it("Should have an initial view", function() {
    app.one("load", function(view) {
      assert.equal(view.type, "stats");
    })
  })

});

// initialize
admin({ page: "stats", debug: false, cache: false, sessionId: 'abc' })
