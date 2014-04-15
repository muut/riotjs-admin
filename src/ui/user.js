
// Presenter for single user
admin(function(app) {

  var root = $("#user-page"),
    tmpl = $("#user-tmpl").html();

  app.on("load:user", function(data) {
    data.joined = util.timeformat(data.joined);
    root.html(riot.render(tmpl, data));

    // not real banning feature on this demo
    $("button", root).click(function() {
      $(this).text("User is banned!");
    });

  });

});