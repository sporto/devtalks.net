module.exports = {
	_id: "_design/videos",
	views: {

		all: {
			map: function (doc) {
				if (doc.kind === "video" && doc.approved) {
					emit(doc, null);
				}
			}
		},
		
		unapproved: {
			map: function (doc) {
				if (doc.kind === "video" && !doc.approved && !doc.deleted) {
					emit(doc, null);
				}
			}
		},

		url: {
			map: function (doc) {
				if (doc.kind === 'video') {
					emit(doc.url, null);
				}
			}
		}

	}
}