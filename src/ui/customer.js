
// Presenter for single user
admin(function(app) {

  var root = $("#customer-page"),
    tmpl = $("#customer-tmpl").html(),
    user_tmpl = $("#user-link-tmpl").html(),
    invoice_tmpl = $("#invoice-tmpl").html();

  app.on("load:customer", function(data) {

    data.joined = util.timeformat(data.joined);
    root.html(riot.render(tmpl, data));

    // users
    var list = $("#user-list", root);

    $.each(data.users, function(i, el) {
      list.append(riot.render(user_tmpl, el));
    });

    // invoices
    list = $("#invoice-list ul", root);

    $.each(data.invoices, function(i, el) {
      el.time = util.timeformat(el.time);
      list.append(riot.render(invoice_tmpl, el));
    });

  });

});