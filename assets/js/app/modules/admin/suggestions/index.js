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

		'.btn_delete click': function (ele, ev) {
			console.log(ele)
			return false;
		}

	});

	return {
		init: function (viewId) {
			var control = new Control($(viewId));
		}
	}

}());