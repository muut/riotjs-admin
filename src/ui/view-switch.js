
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

  // 3. Set "is-active" class name for the active page
  app.on("before:load", function() {

    // remove existing class
    $(".page.is-active").removeClass("is-active");

  }).on("load", function(view) {

    // set a new one
    $("#" + view.type + "-page").addClass("is-active");

  });

});

