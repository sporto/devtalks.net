var bar = 1;
var foo = {
	bar: bar
}

module.exports = {
	getBar: function () {
		return bar;
	},
	getFoo: function () {
		return foo;
	}
};