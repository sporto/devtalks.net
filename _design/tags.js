module.exports = {
	_id: "_design/tags",
	views: {
		// raw list of tags with duplicates
		all: {
			map: function(doc) {
				if(doc.kind === "video" && !doc.approved) {
					for(i in doc.tags) {
						emit(doc.tags[i], 1);
					}
				}
			}
		},

		weights: {
			map: function(doc) {
				if(doc.kind === "video" && !doc.approved) {
					for(i in doc.tags) {
						emit(doc.tags[i], 1);
					}
				}
			},
			reduce: function(tag, counts) {
				var sum = 0;
				for(var i=0; i < counts.length; i++) {
					sum += counts[i];
				}
				return sum;
			}
		}

	}
}
