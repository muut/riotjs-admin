
/*
  Handle view switching, aka. "routing"
  The transition effect is done with CSS
*/
admin(function(app) {

  var is_active = "is-active";

  // 1. select elements from the page to call riot.route(path)
  app.root.on("click", "[href^='#/']", function(e) {

    e.preventDefault();

    var link = $(this);

    // no action
    if (link.hasClass(is_active)) return;

    // loading indicator
    link.addClass("is-loading");

    // Riot changes the URL, notifies listeners and takes care of the back button
    riot.route(link.attr("href"));

  });


  // 2. listen to route clicks and back button
  riot.route(function(path) {

    // Call API method to load stuff from server
    app.load(path.slice(2));

  });

  // 3. Set "is-active" class name for the active page and navi element
  app.on("before:load", function() {

    // remove existing class
    $("." + is_active).removeClass(is_active);


  }).on("load", function(view) {

    // set a new class
    $("#" + view.type + "-page").add("#" + view.type + "-nav").addClass(is_active);

    // remove loading indicator
    $("nav .is-loading").removeClass("is-loading");

  });

});

