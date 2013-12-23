
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

