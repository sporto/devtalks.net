Namespacer('APP.modules.tags');

APP.modules.tags.index = (function () {
	var Control = can.Control({

		init: function (el, options) {
			$('.cloud a').tagcloud();
			$('.videos', this.element).append(can.view('videosTemplate', [{url: 'ddd'}]));
		},

		'.cloud a click': function(ele, ev) {
			var id = $(ele).data('id');
			var url = '/api/v1/tags/' + id + '/videos';
			$.ajax({
				url : url,
				type: 'GET', // 'POST'
				success: function(data, textStatus, xhr) {
					console.log(data);
					// console.log(textStatus);
					// console.log(xhr);
				},
				error: function(xhr, textStatus, errorThrown) {
					// console.log(xhr);
					// console.log(textStatus);
					// console.log(errorThrown);
				}
			});
			return false;
		}
	});

	return {
		init: function (viewId) {
			var control = new Control($(viewId));
		}
	}
}());