angular.module('APP')
	//declare a route so angular knows to broadcast about it when it's hit
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/search', {});
	}])
	.controller('videos.IndexCtrl',
		['$scope', '$element', '$http', '$location', '$route',
		function ($scope, $element, $http, $location, $route) {
			// the $route needs to be injected so angular will trigger the route events

		$scope.videos = [];
		$scope.tags = $element.data('tags');

		$scope.clickTag = function (ix, tag) {
			tag.selected = !tag.selected;
			setRoute();
		}
		// TODO get the selected tags in the UI from the router
		// So when going back they shows as selected

		$scope.selected = function (item) {
			return item.selected;
		}

		$scope.unselected = function (item) {
			return !item.selected;
		}

		function getSelectedTags() {
			var tags = [];
			_.each($scope.tags, function (ele) {
				if (ele.selected) tags.push(ele.key);
			});
			return tags;
		}

		function setRoute() {
			$location.url('/search');
			$location.search({tags: getSelectedTags()});
		}

		$scope.$on('$routeChangeSuccess', function (scope, next, current) {
			search();
		});

		function search() {
			// get query from hash
			var params = $location.search();
			var config = {
				params: params
			}
			$http.get('/api/v1/videos/search', config)
			.success(function (data, status, headers, config) {
				$scope.videos = data;
			})
			.error(function(data, status, headers, config) {
				
			});
		}
	
	}]);