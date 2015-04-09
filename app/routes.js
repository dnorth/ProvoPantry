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
		    console.log("Trying to get the user: " + userName);
		    if (err) return err;
		    if (user == null) {
			res.json([]); 
		    }
		    else {
			res.json(user.withoutPassword());
		    }
		});
	});

	router.post('/api/v1/favorite',function(req, res){
               console.log("in favorites route");
		
                    var regObj = req.body;
       		    var favorote_id = regObj.id;
		    var name = regObj.name;
		    var url = regObj.url;	
                    console.log(regObj);             
		    var user_id = req.session.user;		
                                
		     users.findOne({username:req.session.username},function(err,result){
			//if(err) throw err;
		        //if(result != null)
			//{
                             console.log('found the user');
			     //check if user has already faved it
			     //if(has not faved)
			     //put into faves array
			     //else
			     //exit
			     console.log(result);
			     res.writeHead(200);     		
			//}	           
			//else
			//{
			  // console.log('user does not exist');
			   //res.writeHead(200);
			   //res.end('invalid');	
			//}
	    });
	});

	router.post('/api/v1/login',usrCntrl.login);
	router.post('/api/v1/register',usrCntrl.register);
	router.post('/api/v1/logout',usrCntrl.logout);


    // application ------------------------------------
	router.get('*', function(req, res) {
		res.sendFile('./index.html', {root: "app"});
	});
};
