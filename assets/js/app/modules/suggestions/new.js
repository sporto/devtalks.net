angular.module('APP')
	.controller('suggestions.NewCtrl', 
		['$scope', '$http', '$element', 'notifyUserService',
		function ($scope, $http, $element, notifyUserService) {

		var $selectTags = $('.select_tags', $element);

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

			$scope.model = {
				url: '',
				title: '',
				presenter: '',
				description: '',
				thumbM: '',
				tags: []
			};

			$selectTags.select2('val', '');
		}

		function setupTags() {
			var tags = $element.data('tags');

			$selectTags.select2({
				tags: tags
			});

			$selectTags
				.on('change', function (event) {
					var tags = event.val;
					$scope.model.tags = tags;
					$scope.$digest();
				});
		}

		function retrieve() {
			$scope.state.retrieving = true;

			var params = {url: $scope.model.url};

			$http.get('/api/v1/urls', {params: params})
				.success(function (data, status, headers, config) {
					$scope.model.title = data.title;
					$scope.model.presenter = data.presenter;
					$scope.model.description = data.description;
					$scope.model.thumbS = data.thumbS;
					$scope.model.thumbM = data.thumbM;
					$scope.model.thumbL = data.thumbL;
					$scope.state.retrieving = false;
				})
				.error(function(data, status, headers, config) {
					notifyUserService.flashError("Sorry we couldn't find this video, please add the information manually.");
					$scope.state.retrieving = false;
				});
		}

		function save() {
			$scope.state.saving = true;

			var data = {suggestion: $scope.model};

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
