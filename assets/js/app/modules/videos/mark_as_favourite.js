angular.module('APP')
	.factory('markAsFavouriteService', ['$http', 'notifyUserService', function ($http, notifyUserService) {
		return function (video, value) {
			var url = '/api/v1/videos/' + video._id + '/mark_favourite';
			var config = {
				method: 'POST',
				url: url,
				data: {
					value: value
				}
			}
			$http(config)
				.success(function(data, status, headers, config) {
					video.favourite = value;
				})
				.error(function(data, status, headers, config) {
					notifyUserService.flashError(data);
				});
		}
	}]);