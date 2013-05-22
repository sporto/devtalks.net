// Get the attributes for a video for a particular user
// e.g see, favourite

var when =                    require('when');
var getFlagServ =             require('./get_flag');

module.exports = {
	run: function (id, user, cb) {
		console.log('getUserAttrs run');
		
		var defSeen =   when.defer();
		var defFav =    when.defer();
		var all =       when.all([defSeen, defFav]);

		all.then(function (arr) {
			// console.log('all called');
			// console.log(arr);
			var attrs = {
				seen: arr[0],
				favourite: arr[1]
			}
			cb(null, attrs);
		}, function () {
			cb(new Error("Error"));
		});

		// get video seen only if there is a logged in user
		if (user) {
			var userId = user._id;
			getFlagServ.run(id, userId, 'seen', function (err, val) {
				// console.log('getSeenServ cb');
				// console.log('val = ', val);

				if (err) {
					// console.log(err);
					defSeen.reject(err);
				} else {
					// console.log('val = ' + val);
					defSeen.resolve(val);
				}
			});
			getFlagServ.run(id, userId, 'favourite', function (err, val) {
				// console.log('getFavValServ cb');
				// console.log('val = ', val);

				if (err) {
					// console.log(err);
					defFav.reject(err);
				} else {
					// console.log('val = ' + val);
					defFav.resolve(val);
				}
			});
		} else {
			// no user
			defSeen.resolve(false);
			defFav.resolve(false);
		}
	}
}
