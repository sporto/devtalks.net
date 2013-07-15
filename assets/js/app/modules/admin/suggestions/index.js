angular.module('APP')
	.controller('admin.suggestions.IndexCtrl',
		[
		'$scope',
		'$http',
		'notifyUserService',
		'Video',
		'approveVideoService',
		'deleteVideoService',
		function ($scope, $http, notifyUserService, Video, approveVideoService, deleteVideoService) {

			// load the seeded data;
			$scope.videos = _.map($scope.seed_videos, function (data) { return new Video(data) });

			$scope.approve = function (ix, video) {
				approveVideoService(video)
					.then(function () {
						$scope.videos.splice(ix, 1);
					});
			}

			$scope.remove = function (ix, video) {
				deleteVideoService(video)
					.then(function () {
						$scope.videos.splice(ix, 1);
					});
			}

	}]);