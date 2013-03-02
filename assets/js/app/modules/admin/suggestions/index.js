angular.module('APP')
	.controller('admin.suggestions.IndexCtrl', function ($scope, $http, notifyUserService) {

		$scope.a = 'A'

			//notifyUserService.flashError('hello');

			$scope.clickApprove = function (ev, id) {
				ev.preventDefault();
				console.log(id);
				var ele = ev.currentTarget;
				var $el = $(ele);
				var $tr = $el.closest('tr');
				var id = $tr.data('id');
				console.log(id);
			}

			$scope.clickDelete = function (ev) {
				ev.preventDefault();
				var $tr = $ele.closest('tr');
				var id = $tr.data('id');
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