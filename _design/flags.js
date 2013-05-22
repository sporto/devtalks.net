module.exports = {
	_id: "_design/flags",
	views: {

		by_user: {
			map: function (doc) {
				if (doc.kind === "flag") {
					emit([doc.videoId, doc.userId, doc.flag], null);
				}
			}
		}

	}
}