module.exports = {

	getInfoByUrl: function (url, cb) {
		
		var res = {
			info: {
				description: 'HELLO ' + url
			}
		}
		return cb(null, res);
	}

}