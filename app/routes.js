// setup ---------------------------------------------
var users = require('./models/users');

module.exports = function(app) {

    // api -------------------------------------------
    app.get('/api/v1/users/:username', function(req, res) {
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

    // application ------------------------------------
    app.get('*', function(req, res) {
	    res.sendfile('./html/index.html');
	});
};