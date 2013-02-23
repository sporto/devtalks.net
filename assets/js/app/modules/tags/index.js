Namespacer('APP.modules.tags');

APP.modules.tags.index = (function () {
	var Control = can.Control({

		init: function (el, options) {
			$('.cloud a').tagcloud();
		},

		'.cloud a click': function(ele, ev) {
			console.log($(ele).data('id'));
			return false;
		}
	});

	return {
		init: function (viewId) {
			var control = new Control($(viewId));
		}
	}
}());