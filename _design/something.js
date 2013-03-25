module.exports = {
	_id: "_design/something",
	views: {
		all: {
			map: function (doc) {
				emit(doc, 1);
			}
		}
	}
}