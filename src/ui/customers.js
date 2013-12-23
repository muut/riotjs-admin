
// List of customers
admin(function(app) {

  var root = $("#bars", app.root),
    tmpl = $("#bars-tmpl").html();

  app.on("load:customers", function(view) {

    var max;

    // clear existing data
    root.empty();

    $.each(view, function(i, entry) {
      var val = entry.val;
      if (!i) max = val;

      entry.width = Math.round(val / max * 100);

      root.append($.render(tmpl, entry))
    })

  })

})