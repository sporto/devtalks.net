angular.module('APP')
	.controller('videos.IndexCtrl', function ($scope, $element, $http) {

		var $tags = $('.cloud a', $element);
		$tags.tagcloud();

		$scope.videos = [];
		$scope.selectedTag = '';

		$scope.clickTag = function (ev, tag) {
			ev.preventDefault();
			$scope.selectedTag = tag;
			var config = {
				params: {
					tags: [tag, 'hi']
				}
			}
			$http.get('/api/v1/tags/search', config)
			.success(function (data, status, headers, config) {
				$scope.videos = data;
			})
			.error(function(data, status, headers, config) {
				
			});
		}

		$scope.filter = function (ev, value) {
			ev.preventDefault();
			console.log(value);
		}
	
	});