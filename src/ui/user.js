
// Single user
admin(function(app) {

  var root = $("#user-page"),
      tmpl = $("#user-tmpl").html();


  // date formatting goes to presenter layer, not inside model
  function formatTime(time) {

    // this is just a demo :)
    return "3 weeks ago";
  }

  app.on("load:user", function(data) {
    data.joined = formatTime(data.joined);
    root.html($.render(tmpl, data));
  });

});