angular.module('APP')
	.controller('videos.FormCtrl', 
	['$scope', '$http', '$element', 'notifyUserService', 'Video',
		function ($scope, $http, $element, notifyUserService, Video) {

		var $selectTags = $('.select_tags', $element);

		$scope.video = new Video($scope.videoSeed);

		setupTags();
		reset();

		////// UI handlers

		$scope.clickRetrieve = function (ev) {
			ev.preventDefault();
			retrieve();
		};

		$scope.clickSave = function (ev) {
			ev.preventDefault();
			save();
		};

		/// utility functions

		function reset() {
			$scope.state = {
				retrieving: false,
				saving: false
			};

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

		//retrieve info about a video
		function retrieve() {
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
		}

		function save() {
			$scope.state.saving = true;

			$scope.video.$save(function (video) {
				notifyUserService.flashSuccess('Saved');
				$scope.state.saving = false;
			}, function (xhr) {
				notifyUserService.flashError(xhr.data);
				$scope.state.saving = false;
			});

		}

}]);
