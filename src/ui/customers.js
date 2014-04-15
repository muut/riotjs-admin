
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

      // first one is the largest
      if (!i) max = entry.val;

      entry.width = Math.round(entry.val / max * 100);

      root.append(riot.render(tmpl, entry));

    });

  });

});