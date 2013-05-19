angular.module('APP').controller('videos.ShowCtrl', 
	['$scope', 
		'$element', 
		'$http', 
		'notifyUserService', 
		'markAsFavouriteService', 
		'markAsSeenService',
	function($scope, 
		$element, 
		$http, 
		notifyUserService, 
		markAsFavouriteService, 
		markAsSeenService) {

	$scope.video = $element.data('video');

	$scope.markAsFavourite = markAsFavouriteService;
	$scope.markAsSeen = markAsSeenService;

}]);