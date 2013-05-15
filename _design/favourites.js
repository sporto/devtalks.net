module.exports = {
	_id: "_design/favourites",
	views: {

		by_user: {
			map: function (doc) {
				if (doc.kind === "favourite") {
					emit([doc.videoId, doc.userId], null);
				}
			}
		}

	}
}