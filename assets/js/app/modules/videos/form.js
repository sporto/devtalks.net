angular.module('APP')
	.controller('videos.FormCtrl', 
	['$scope',
		'$http',
		'$element',
		'notifyUserService',
		'logger',
		'Video',
	function ($scope, $http, $element, notifyUserService, logger, Video) {

		logger.info('videos.FormCtrl');
		var $selectTags = $('.select_tags', $element);

		$scope.state = {};
		$scope.video = new Video($scope.videoSeed);

		// if video has _id then we are editing
		// otherwise creating new ones
		$scope.state.editing = ($scope.video._id != null);

		setupTags();
		reset();

		////// UI handlers

		$scope.retrieve = function () {
			$scope.state.retrieving = true;

			var params = {url: $scope.video.url};

			$http.get('/api/v1/urls', {params: params})
				.success(function (data, status, headers, config) {
					$scope.video.title = data.title;
					$scope.video.presenter = data.presenter;
					$scope.video.description = data.description;
					$scope.video.thumbS = data.thumbS;
					$scope.video.thumbM = data.thumbM;
					$scope.video.thumbL = data.thumbL;
					$scope.state.retrieving = false;
				})
				.error(function(data, status, headers, config) {
					notifyUserService.flashError("Sorry we couldn't find this video, please add the information manually.");
					$scope.state.retrieving = false;
				});
		};

		$scope.save = function () {
			$scope.state.saving = true;

			$scope.video.$save(function (response) {
				onSaved(response);
			}, function (response) {
				notifyUserService.flashError(response.data);
				$scope.state.saving = false;
			});
		};

		$scope.approve = function () {

		}

		$scope.remove = function () {

		}

		/// utility functions

		function reset() {
			$scope.state.retrieving = false;
			$scope.state.saving = false;

			$selectTags.select2('val', $scope.video.tags);
		}

		function setupTags() {
			//var tags = $element.data('tags');

			$selectTags.select2({
				tags: $scope.tags
			});

			$selectTags
				.on('change', function (event) {
					var tags = event.val;
					$scope.video.tags = tags;
					$scope.$digest();
				});
		}

		function onSaved(response) {
			logger.info('onSaved');
			notifyUserService.flashSuccess('Saved');
			$scope.state.saving = false;

			logger.info($scope.state.editing);

			if (!$scope.state.editing) {
				logger.info('not editing');
				$scope.video = new Video();
				reset();
			}
		}

}]);
