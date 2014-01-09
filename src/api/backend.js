
// Fake backend to simulate a real thing
function Backend(conf) {

  var self = this,
    cache = {},
    storage = top.localStorage || { sessionId: conf.sessionId },
    debug = conf.debug && typeof console != 'undefined';


  // underlying implementation for `call` can change
  self.call = function(method, arg, fn) {

    var ret = test_data[method](arg, storage.sessionId),
        promise = new Promise(fn);

    // debug message
    if (debug) console.info("->", method, arg);

    // configurable caching for the "load" method
    if (conf.cache && method == 'load') {
      if (cache[arg]) return promise.done(cache[arg]);
      cache[arg] = ret;
    }

    // session management
    if (ret.sessionId) storage.sessionId = ret.sessionId;
    else if (method == 'logout') storage.removeItem("sessionId");

    // fake delay for the call
    setTimeout(function() {
      if (debug) console.info("<-", ret);

      promise.always(ret);
      promise[ret === false ? 'fail' : 'done'](ret);

    }, 400);

    // given callback
    promise.done(fn);

    return promise;

  };

}
