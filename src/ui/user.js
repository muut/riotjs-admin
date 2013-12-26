
// Single user
admin(function(app) {

  var root = $("#user-page"),
      tmpl = $("#user-tmpl").html();

  app.on("load:user", function(data) {
    root.html($.render(tmpl, data));
  });

});