// Simple Promise pattern using riot.observable
function Promise() {
    var self = riot.observable(this);
    self.resolution = null;
    self.result = null;
    $.map(['done', 'fail', 'always'], function(name) {
        self[name] = function(arg) {
            if($.isFunction(arg)) {
                self.one(name, arg);
                if(self.resolution === name || (self.resolution !== null && name === 'always')) {
                    self.trigger(name, self.result);
                }
            } else {
                if(name === 'always') {
                    throw new Error('Invalid argument for "always" function: ' + arg);
                }
                if(self.resolution !== null) {
                    throw new Error('Can not resolve promise - already resolved to ' + self.resolution)
                }
                self.resolution = name;
                self.result = arg;
                self.trigger(name, self.result).trigger('always', self.result);
            }
            return self;
        };
    });
}