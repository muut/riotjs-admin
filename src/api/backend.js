
// session management goes here, needs some cleanup to make it easier to read / understand
function Backend(conf) {

  var self = this,
    cache = {};

  self.call = function(method, arg, fn) {

    console.info("->", method, arg);

    var logged_in = method == 'init' && localStorage.sessionId,
        ret = test_data[method](arg, logged_in),
        promise = new Promise(fn);

    promise.done(fn);

    // optional caching
    if (conf.cache && method == 'load') {
      if (cache[arg]) return promise.done(cache[arg])
      cache[arg] = ret;
    }

    // session management
    if (ret.sessionId) localStorage.sessionId = ret.sessionId;
    if (method == 'logout') localStorage.removeItem("sessionId")

    setTimeout(function() {
      promise.always(ret);
      promise[ret === false ? 'fail' : 'done'](ret);

      console.info("<-", ret);

    }, 400)

    return promise;

  }

}
