
// Single user
admin(function(app) {

  var root = $("#customer-page"),
      tmpl = $("#customer-tmpl").html();

  app.on("load:customer", function(data) {
    root.html($.render(tmpl, data));

  });

});