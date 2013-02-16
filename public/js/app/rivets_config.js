rivets.configure({
	prefix: 'rv',
	adapter: {
		subscribe: function(obj, keypath, callback) {
			obj.bind('change', function(ev, attr, how, newVal, oldVal) {
				callback(newVal);
			});
		},
		unsubscribe: function(obj, keypath, callback) {
			obj.unbind('change', callback);
		},
		read: function(obj, keypath) {
			return obj.attr(keypath);
		},
		publish: function(obj, keypath, value) {
			obj.attr(keypath, value);
		}
	}
});