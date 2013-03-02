angular.module('APP')
	.controller('admin.suggestions.IndexCtrl', function ($scope, $http, $element, notifyUserService, Suggestion) {

		//notifyUserService.flashError('hello');
		// $scope.suggestions = $element.data('suggestions');
		$scope.suggestions = Suggestion.query();

		$scope.clickApprove = function (ev, ix, suggestion) {
			ev.preventDefault();
			// console.log(suggestion)
			suggestion.$approve(function (doc) {
				notifyUserService.flashSuccess('Approved');
				$scope.suggestions.splice(ix, 1);
			}, function (res) {
				notifyUserService.flashError(res.data);
			});

			// pro.then(function (doc) {
			// 	console.log(doc);
			// })
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

	});

/*
Namespacer('APP.modules.admin.suggestions');

APP.modules.admin.suggestions.index = (function () {
	'use strict';

	var Control = can.Control({

		init: function (ele, options) {

		},

		'.btn_approve click': function ($ele, ev) {
			var $tr = $ele.closest('tr');
			var id = $tr.data('id');
			var url = '/api/v1/suggestions/' + id + '/approve';

			$.ajax({
				url: url,
				success: function(data, textStatus, xhr) {
					APP.flashSuccess('Done');
					$tr.remove();
				},
				error: function(xhr, textStatus, errorThrown) {
					APP.flashError(errorThrown);
				}
			});

			return false;
		},

		'.btn_delete click': function ($ele, ev) {
			if (confirm("Are you sure?")) {
				var $tr = $ele.closest('tr');
				var id = $tr.data('id');
				var url = '/api/v1/suggestions/' + id;
				$.ajax({
					url: url,
					type: 'DELETE',
					success: function(data, textStatus, xhr) {
						APP.flashSuccess('Done');
						$tr.remove();
					},
					error: function(xhr, textStatus, errorThrown) {
						APP.flashError(errorThrown);
					}
				});
			}
			return false;
		}

	});

	return {
		init: function (viewId) {
			var control = new Control($(viewId));
		}
	}

}());
*/