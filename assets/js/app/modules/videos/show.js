angular.module('APP').controller('videos.ShowCtrl', 
	['$scope', '$element', '$http', 'notifyUserService', 'markAsFavouriteService',
	function($scope, $element, $http, notifyUserService, markAsFavouriteService) {

	$scope.video = $element.data('video');

	$scope.markAsFavourite = function () {
		markAsFavouriteService($scope.video);
	}

	$scope.markAsSeen = function () {
		var url = '/api/v1/videos/' + $scope.video._id + '/mark_seen';
		var data = {

		}
		$http.post(url, data)
			.success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.video.seen = true;
			})
			.error(function(data, status, headers, config) {
				notifyUserService.flashError(data);
			});
	}

}]);