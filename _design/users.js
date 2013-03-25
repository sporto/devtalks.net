module.exports = {
	_id: "_design/users",
	views: {
		provider: {
			map: function (doc) {
				if (doc.kind === "user") {
					emit([doc.provider, doc.providerId], null);
				}
			}
		}
	}
}