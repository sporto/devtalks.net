angular.module('APP')
	.controller('videos.IndexCtrl', function ($scope, $element, $http) {

		// var $tags = $('.cloud a', $element);
		// $tags.tagcloud();

		$scope.videos = [];
		$scope.selectedTags = [];
		$scope.unselectedTags = $element.data('tags');
		// $scope.unselectedTags.unshift({_id: 'all', value: 1});

		// $scope.$watch('selectedTags', function (newVal) {
		// 	console.log(newVal);
		// });

		$scope.clickTag = function (ev, ix, tag) {
			ev.preventDefault();
			$scope.selectedTags.push(tag);
			$scope.unselectedTags.splice(ix, 1);
			getVideos();
		}

		$scope.removeTag = function (ev, ix, tag) {
			ev.preventDefault();
			$scope.selectedTags.splice(ix, 1);
			$scope.unselectedTags.push(tag);
			getVideos();
		}

		$scope.filter = function (ev, value) {
			ev.preventDefault();
			// console.log(value);
		}

		function getVideos() {
			var tags = _.pluck($scope.selectedTags, '_id');
			var config = {
				params: {
					tags: tags
				}
			}
			$http.get('/api/v1/tags/search', config)
			.success(function (data, status, headers, config) {
				$scope.videos = data;
			})
			.error(function(data, status, headers, config) {
				
			});
		}
	
	});