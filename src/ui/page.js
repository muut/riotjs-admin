
// View switching (= routing)

admin(function(app) {

  // 1. select elements from the page that trigger view switchig
  $(document).on("click", "a[href^='#/']", function() {

    // Call $.route method with arbitary arguments
    // Riot takes care of the URL change behind the scenes
    $.route($(this).attr("href"));

  })


  // 2. unlimited $.route callbacks allowed
  $.route(function(path) {
    $(".page.is-active").removeClass("is-active");
    // app.root.attr("id", page + "-page").addClass("is-loading");
    app.load(path.slice(2))
  })

  // assign body id
  app.on("load", function(view) {
    console.info(view.type);
    $("#" + view.type).addClass("is-active")
    // app.root.attr("id", view.type + "-page").removeClass("is-loading");
  })

});

