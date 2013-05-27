module.exports = {
	_id: "_design/videos",
	views: {

		all: {
			map: function (doc) {
				if (doc.kind === "video" && doc.approved && !doc.deleted) {
					emit(doc, null);
				}
			}
		},

		// docs mapped by createdAt so we can get a list sorted by latest additions
		byCreatedAt: {
			map: function (doc) {
				if (doc.kind === "video" && doc.approved && !doc.deleted) {
					emit(doc.createdAt, null);
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