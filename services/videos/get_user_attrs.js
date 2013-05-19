// Get the attributes for a video for a particular user
// e.g see, favourite

var when =                    require('when');
var getSeenServ =             require('./get_seen');
var getFavValServ =           require('./get_favourite_val');

module.exports = {
	run: function (id, user, cb) {
		console.log('getUserAttrs run');
		
		var defSeen =   when.defer();
		var defFav =    when.defer();
		var all =       when.all([defSeen, defFav]);

		all.then(function (arr) {
			console.log('all called');
			console.log(arr);
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
			getSeenServ.run(id, userId, function (err, val) {
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
			getFavValServ.run(id, userId, function (err, val) {
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
