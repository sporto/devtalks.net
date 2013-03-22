angular.module('APP')
	.controller('videos.IndexCtrl', function ($scope, $element, $http) {

		// var $tags = $('.cloud a', $element);
		// $tags.tagcloud();

		$scope.videos = [];
		$scope.tags = $element.data('tags');

		$scope.clickTag = function (ix, tag) {
			tag.selected = !tag.selected;
			getVideos();
		}

		$scope.selected = function (item) {
			return item.selected;
		}

		$scope.unselected = function (item) {
			return !item.selected;
		}

		function getVideos() {
			var tags = [];
			_.each($scope.tags, function (ele) {
				if (ele.selected) tags.push(ele._id);
			});
			var config = {
				params: {
					tags: tags
				}
			}
			$http.get('/api/v1/videos/search', config)
			.success(function (data, status, headers, config) {
				$scope.videos = data;
			})
			.error(function(data, status, headers, config) {
				
			});
		}
	
	});