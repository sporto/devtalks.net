angular.module('APP')
	.factory('markAsSeenService', ['$http', 'notifyUserService', function ($http, notifyUserService) {
		return function (video) {
			var url = '/api/v1/videos/' + video._id + '/mark_seen';
			var data = {

			}
			$http.post(url, data)
				.success(function(data, status, headers, config) {
					video.seen = true;
				})
				.error(function(data, status, headers, config) {
					notifyUserService.flashError(data);
				});
		}
	}]);