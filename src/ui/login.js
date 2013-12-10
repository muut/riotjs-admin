
// login and logout

admin(function(app) {

  var user = app.user;

  // login
  $("#login").submit(function(e) {
    e.preventDefault();

    user.login({
      username: this.username.value,
      password: this.password.value,
      page: app.page

    }).fail(function() {
      console.info("login failed");
    })

  })

  // logout
  $("#logout").click(function(e) {
    e.preventDefault();
    user.logout();
  })

  function toggle(is_logged) {
    app.root.toggleClass("is-logged", is_logged).toggleClass("is-not-logged", !is_logged)
  }

  user.on("login logout", function(type) {
    toggle(type == 'login');
  })

  toggle(!!user.username);

})