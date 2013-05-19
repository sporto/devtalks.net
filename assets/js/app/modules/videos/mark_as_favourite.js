angular.module('APP')
	.factory('markAsFavouriteService', ['$http', 'notifyUserService', function ($http, notifyUserService) {
		return function (video, value) {
			var url = '/api/v1/videos/' + video._id + '/mark_favourite';
			var data = {
				value: value
			}
			$http.post(url, data)
				.success(function(data, status, headers, config) {
					video.favourite = true;
				})
				.error(function(data, status, headers, config) {
					notifyUserService.flashError(data);
				});
		}
	}]);