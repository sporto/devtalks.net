angular.module('APP')
	.controller('admin.suggestions.IndexCtrl',
		['$scope', '$http', '$element', 'notifyUserService', 'Suggestion',
		function ($scope, $http, $element, notifyUserService, Suggestion) {

		$scope.suggestions = Suggestion.query();

		$scope.clickApprove = function (ev, ix, suggestion) {
			ev.preventDefault();

			suggestion.$approve(function (doc) {
				notifyUserService.flashSuccess('Approved');
				$scope.suggestions.splice(ix, 1);
			}, function (res) {
				notifyUserService.flashError(res.data);
			});

		}

		$scope.clickDelete = function (ev, ix, suggestion) {
			ev.preventDefault();
			if (confirm("Are you sure?")) {
				suggestion.$delete(function () {
					$scope.suggestions.splice(ix, 1);
				}, function (res) {
					notifyUserService.flashError(res.data);
				});
			}
		}

	}]);