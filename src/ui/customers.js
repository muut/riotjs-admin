
// Presenter for customer list
admin(function(app) {

  var root = $("#bars", app.root),
    tmpl = $("#bars-tmpl").html();

  app.on("load:customers", function(view) {

    var max;

    // clear existing data
    root.empty();

    // add new ones
    $.each(view, function(i, entry) {
      if (!i) max = entry.val;

      entry.width = Math.round(entry.val / max * 100);

      root.append($.render(tmpl, entry));

    });

  });

});