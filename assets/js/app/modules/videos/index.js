angular.module('APP')
	//declare a route so angular knows to broadcast about it when it's hit
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/latest', {})
			.when('/search', {})
			.otherwise({redirectTo: '/latest'});
	}])
	.controller('videos.IndexCtrl',
		['$scope', '$element', '$http', '$location', '$route',
		function ($scope, $element, $http, $location, $route) {
			// the $route needs to be injected so angular will trigger the route events

		$scope.location = $location;
		$scope.videos = [];
		$scope.allTags = $element.data('tags');
		$scope.query = {tags: []};
		$scope.state = {
			retrieving: false
		}

		$scope.addTag = function (ix, tag) {
			addTagToRoute(ix, tag.key);
		}

		$scope.removeTag = function (ix, tag) {
			removeTagFromRoute(ix, tag);
		}

		$scope.selected = function (item) {
			return item.selected;
		}

		$scope.unselected = function (item) {
			return !item.selected;
		}

		$scope.$on('$routeChangeSuccess', function (scope, next, current) {
			processRoute();
		});

		// at the moment angular doesn't handle arrays in routes at it should
		function getSelectedTagsFromRoute() {
			var params = $location.search();
			var tags = params.tags || [];
			if (_.isArray(tags)) {
				return tags;
			} else {
				return tags.split(',');
			}
		}

		function addTagToRoute(ix, tag) {
			$location.path('/search');
			var tags = getSelectedTagsFromRoute();
			// do no push if already there
			if (_.contains(tags, tag)) return;
			tags.push(tag);
			$location.search({tags: tags});
		}

		function removeTagFromRoute(ix, tag) {
			var tags = getSelectedTagsFromRoute();
			tags.splice(ix, 1);
			
			if (tags.length === 0) {
				$location.path('/latest');
				$location.search({});
			} else {
				$location.search({tags: tags});
			}
		}

		function getQueryFromRoute() {
			var tags = getSelectedTagsFromRoute();
			return {tags: tags};
		}

		function processRoute() {
			refreshQuery();
			fetch();
		}

		function refreshQuery() {
			$scope.query = getQueryFromRoute();
			// refreh the list of tags in the ui
			_.each($scope.allTags, function (ele) {
				if (_.contains($scope.query.tags, ele.key)) {
					ele.selected = true;
				} else {
					ele.selected = false;
				}
			});
		}

		function fetch(url) {
			var url = "/api/v1/videos" + $location.path();
			
			$scope.state.retrieving = true;
			var config = {
				params: $scope.query
			}
			$http.get(url, config)
			.success(function (data, status, headers, config) {
				$scope.videos = data;
				$scope.state.retrieving = false;
			})
			.error(function(data, status, headers, config) {
				$scope.state.retrieving = false;
			});
		}
	
	}]);