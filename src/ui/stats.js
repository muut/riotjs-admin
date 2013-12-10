
// Draw stats
admin(function(app) {

  var canvas = $("canvas", app.root),
    colors = ['#be0000', '#4cbe00', '#1fadc5'];

  app.on("load:stats", function(stats) {

    $.each(stats, function(i, data) {
      canvas.eq(i).graph2(data, colors[i])
    });

  })

})