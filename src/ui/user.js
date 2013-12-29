
// Single user
admin(function(app) {

  var root = $("#user-page"),
      tmpl = $("#user-tmpl").html();

  app.on("load:user", function(data) {
    data.joined = util.timeformat(data.joined);
    root.html($.render(tmpl, data));

    $("button", root).click(function() {
      $(this).text("User is banned!");
    });

  });

});