
// Page switching
admin(function(app) {

  // routing
  $(document).on("click", "a[href^='#/']", function() {
    $.route($(this).attr("href"))
  })

  $.route(function(path) {
    var page = path.slice(2);
    app.root.attr("id", page + "-page");
    app.load(page)
  })

  // assign body id
  app.on("load", function(view) {
    app.root.attr("id", view.type + "-page");
  })

});

