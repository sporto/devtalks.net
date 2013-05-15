module.exports = {
	create:           require('./videos/create'),
	update:           require('./videos/update'),
	search:           require('./videos/search'),
	latest:           require('./videos/latest'),
	mark_seen:        require('./videos/mark_seen'),
	mark_favourite:   require('./videos/mark_favourite'),
	approve:          require('./videos/approve'),
	destroy:          require('./videos/destroy')
}