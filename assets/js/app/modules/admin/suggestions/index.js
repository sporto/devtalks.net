angular.module('APP')
	.controller('admin.suggestions.IndexCtrl',
		['$scope', '$http', '$element', 'notifyUserService', 'Video',
		function ($scope, $http, $element, notifyUserService, Video) {

			// load the seeded data;
			$scope.videos = _.map($scope.seed_videos, function (data) { return new Video(data) });

			$scope.clickApprove = function (ix, video) {
				video.busy = true;
				video.$approve(function (doc) {
					notifyUserService.flashSuccess('Approved');
					$scope.videos.splice(ix, 1);
				}, function (res) {
					notifyUserService.flashError(res.data);
				})
				.always(function () {
					video.busy = true;
				});

			}

			$scope.clickDelete = function (ix, video) {
				if (confirm("Are you sure?")) {
					video.busy = true;
					video.$delete(function () {
						$scope.videos.splice(ix, 1);
					}, function (res) {
						notifyUserService.flashError(res.data);
					})
					.always(function () {
						video.busy= false;
					});
				}
			}

	}]);