Namespacer('APP');

APP = {
	flashError: function (msg) {
		toastr.error(msg);
	},
	flashSuccess: function (msg) {
		toastr.success(msg);
	}
}