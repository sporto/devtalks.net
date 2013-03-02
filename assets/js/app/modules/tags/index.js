angular.module('APP')
	.controller('tags.IndexCtrl', function ($scope, $element, $http) {

		var $tags = $('.cloud a', $element);
		$tags.tagcloud();

		$scope.videos = [];
		$scope.selectedTag = '';

		$scope.clickTag = function (ev, tag) {
			ev.preventDefault();
			$scope.selectedTag = tag;
			$http.get('/api/v1/tags/' + tag + '/videos', {})
			.success(function (data, status, headers, config) {
				$scope.videos = data;
			})
			.error(function(data, status, headers, config) {
				
			});
		}
	});