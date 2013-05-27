var _               = require('underscore');
var logger          = require('../../logger');
var nconf           = require('nconf');
var ADMIN_USERS     = nconf.get('ADMIN_USERS');

function getAdminUsers() {
	return ADMIN_USERS.split(',');
}

module.exports = {
	run: function (user, resource, action, cb) {
		if (user) {
			if (resource === 'video' && action === 'manage') {
				if (_.contains(getAdminUsers(), user.username)) {
					return cb(null, true);
				}
			}
			return cb(null, false);
		} else {
			return cb(null, false);
		}
	}
}