module.exports = {
	_id: "_design/actions",
	views: {

		seen: {
			map: function (doc) {
				if (doc.kind === "action" && doc.action === 'seen') {
					emit([doc.videoId, doc.userId], null);
				}
			}
		}

	}
}