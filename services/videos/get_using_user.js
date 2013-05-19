var when =                    require('when');
var _ =                       require('underscore');
var getVideoService =         require('./get');
var getAttrsServ =            require('./get_user_attrs');

module.exports = {
	run: function (id, user, cb) {

		var defVideo =  when.defer();
		var defAttrs =   when.defer();
		var all =       when.all([defVideo, defAttrs]);

		all.then(function (arr) {
			// console.log('all called');
			// console.log(arr);
			var doc = arr[0];
			var attrs = arr[1];
			_.extend(doc, attrs);
			cb(null, doc);
		}, function () {
			cb(new Error("Error"));
		});

		getVideoService.run(id, function (err, doc) {
			//console.log('getVideoService cb')
			//console.log(err);
			//console.log(doc);

			if (err) {
				defVideo.reject(err);
			} else {
				defVideo.resolve(doc);
			}
		});

		getAttrsServ.run(id, user, function (err, val) {
			if (err) {
				console.log(err);
				defAttrs.reject(err);
			} else {
				console.log('val = ' + val);
				defAttrs.resolve(val);
			}
		});

	}
}