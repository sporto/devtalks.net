
/*
 * GET home page.
 */

exports.index = function(req, res){
	//console.log('USER > ')
	//console.log(req.user)
	res.render('index', {});
};