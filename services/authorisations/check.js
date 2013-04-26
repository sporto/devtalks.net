// var db = require('../../db');

module.exports = {
	run: function (user, resource, action, cb) {
		if (user) {

			if (resource === 'suggestion' && action === 'manage') {
				//console.log(user);
				if (user.username === 'sporto') {
					return cb(null, true);
				}
			}

			return cb(null, false);
		} else {
			return cb(null, true); //TODO change this to false
		}
	}
}