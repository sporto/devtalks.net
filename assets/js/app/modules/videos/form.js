angular.module('APP')
	.controller('videos.FormCtrl', 
		['$scope', '$http', '$element', 'notifyUserService',
		function ($scope, $http, $element, notifyUserService) {

		var $selectTags = $('.select_tags', $element);

		// var data = $element.data('record');

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

		$scope.clickReset = function (ev) {
			ev.preventDefault();
			reset();
		};

		/// utility functions

		function reset() {
			$scope.state = {
				retrieving: false,
				saving: false
			};

			// $scope.video = {
			// 	url: '',
			// 	title: '',
			// 	presenter: '',
			// 	description: '',
			// 	thumbM: '',
			// 	tags: []
			// };

			$selectTags.select2('val', '');
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

			var data = {video: $scope.video};

			// TODO use angular resource instead

			$http.post('/api/v1/suggestions', data)
				.success(function (data, status, headers, config) {
					notifyUserService.flashSuccess('Saved');
					$scope.state.saving = false;
					reset();
				})
				.error(function(data, status, headers, config) {
					notifyUserService.flashError(data);
					$scope.state.saving = false;
				});
		}

}]);
