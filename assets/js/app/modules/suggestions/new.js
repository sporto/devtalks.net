angular.module('ANG', [])
	.controller('suggestions.NewCtrl', function ($scope, $http, $element) {

		var $selectTags = $('.select_tags', $element);

		setupTags();
		reset();

		////// UI handlers

		$scope.clickRetrieve = function (ev) {
			ev.preventDefault();
			retrieve();
		}

		$scope.clickSave = function (ev) {
			ev.preventDefault();
			save();
		}

		$scope.clickReset = function (ev) {
				ev.preventDefault();
				reset();
		}

		/// utility functions

		function reset() {
			$scope.state = {
				retrieving: false,
				saving: false,
				enableBtnRetrieve: function () {
					if ($scope.model.url) {
						return ($scope.model.url.indexOf('http://') > -1);
					} else {
						return false;
					}
				}
			};

			$scope.model = {
				url: '',
				title: '',
				description: '',
				thumbM: '',
				tags: []
			}

			$selectTags.select2('val','');
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
					$scope.model.description = data.description;
					$scope.model.thumbS = data.thumbS;
					$scope.model.thumbM = data.thumbM;
					$scope.model.thumbL = data.thumbL;
					$scope.state.retrieving = false;
				})
				.error(function(data, status, headers, config) {
					APP.flashError(status);
					$scope.state.retrieving = false;
				});
		}

		function save() {
			$scope.state.saving = true;

			var data = {suggestion: $scope.model};

			$http.post('/api/v1/suggestions', data)
				.success(function (data, status, headers, config) {
					APP.flashSuccess('Saved');
					$scope.state.saving = false;
					reset();
				})
				.error(function(data, status, headers, config) {
					APP.flashError(status);
					$scope.state.saving = false;
				});
		}

});
