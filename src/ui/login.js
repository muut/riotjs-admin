
// Login and logout features

admin(function(app) {

  var user = app.user,
    loading = "is-loading";

  // login
  $("#login").submit(function(e) {
    e.preventDefault();

    var el = $(this).addClass("is-loading");

    user.login({
      username: this.username.value,
      password: this.password.value,
      page: app.page

    }).fail(function() {
      console.info("login failed");

    }).done(function() {
      el.removeClass("is-loading");

    });

  });

  // logout
  $("#logout").click(function(e) {
    e.preventDefault();
    var el = $(this).addClass("is-loading");

    user.logout(function() {
      el.removeClass("is-loading");
    });

  });

  function toggle(is_logged) {
    app.root.toggleClass("is-logged", is_logged).toggleClass("is-not-logged", !is_logged);
  }

  user.on("login logout", function(type) {
    toggle(type == 'login');
  });

  toggle(!!user.username);

});