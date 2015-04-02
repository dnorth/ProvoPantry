// setup ---------------------------------------------
var users = require('./models/users');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var User = mongoose.model('users');
var usrCntrl = require('./controllers/user_controller');

module.exports = function(router) {

    // api -------------------------------------------
    router.get('/api/v1/users/:username', function(req, res) {
	    var userName = req.param('username');
	    users.findOne({ username: userName }, function (err, user) {
			if (err) return err;
			if (err == null) {
			    res.json([]); 
			}
			else {
			res.json(user.withoutPassword());
			}
		    });
	});


	router.post('/api/v1/login',usrCntrl.login);
	router.post('/api/v1/register',usrCntrl.register);



    // application ------------------------------------
	router.get('*', function(req, res) {
		res.sendFile('./index.html', {root: "app"});
	});
};
