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
                    //console.log(regObj);             
		    var user_id = req.session.user;
		    var id = regObj.id;
		    
		    console.log(req.session.username);	
		     users.findOne({username:req.session.username},function(err,result){
			if(err) throw err;
		        if(result != null)
			{
			     var user = new users(result);
			     console.log(user); 
                             console.log('found the user');
			     //check if user has already faved it
			     var favorites_array = user.favorites;
			     
			     var contains = false;
			     for(var i = 0; i < favorites_array.length; i++)
				{
				   if(favorites_array[i].id = id)
					{
						contains = true;
					}
				
				}
			     if(!contains)
			      {
				user.favorites.push(regObj);
				user.update({favorites:user.favorites},function(err){
                                          
				    if(err)
					console.log(err);
				    else
					console.log("added to faovrites");
				});
				console.log(user.favorites.length);	
			      }
				else
			      {
				console.log("item has already been favorited");	
			      }
			    
			     res.writeHead(200);     		
			}	           
			else
			{
			  console.log('user does not exist');
			   res.writeHead(200);
			   res.end('invalid');	
			}
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
