module.exports = {
	_id: "_design/videos",
	views: {
		
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