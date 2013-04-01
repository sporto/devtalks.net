module.exports = {
	_id: "_design/sights",
	views: {

		by_user: {
			map: function (doc) {
				if (doc.kind === "sight") {
					emit([doc.videoId, doc.userId], null);
				}
			}
		}

	}
}