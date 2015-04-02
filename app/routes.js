// setup ---------------------------------------------
var users = require('./models/users');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var User = mongoose.model('users')
module.exports = function(router) {

//	app.use(cookieParser);
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

	router.post('/api/v1/login', function(req,res){
        	var jsonData = "";
        	req.on('data',function (chunk){
                	jsonData += chunk;
        	});
        	req.on('end',function(){
                	var lgnObj = JSON.parse(jsonData);
                	var username = lgnObj.username;
                	var pswrd = lgnObj.password;


                        users.findOne({username:username},function(err,user){
                                if(err) throw err;
				if(user==null){
                    console.log(username + " does not exist.")
                    res.json({});
				}
				else{
					if(user.password==pswrd){
                                                console.log(username + " authenticated!")
                                                res.json(user.withoutPassword());
                                         }
                                         else{
                                                console.log(username + " failed authentication.")
                                                res.json({'failure' : 'failure'});
                                        }
				}
                        });
                });

        });

	router.post('/api/v1/register',function(req,res){
        	console.log('In register route');
		var jsonData = "";
        	req.on('data',function (chunk){
                	jsonData += chunk;
        	});
        	req.on('end',function(){
                	var regObj = JSON.parse(jsonData);
                	var name_f = regObj.first;
                	var name_l = regObj.last;
                	var username = regObj.username;
                	var pswrd = regObj.password;
			console.log(regObj);
                	users.findOne({username:username},function(err,result){
                		if(err) throw err;
				if(result!=null){
                        		console.log('username in use');
                                        console.log(result);
                                        res.writeHead(200);
                                        res.end('invalid');
				}
				else{
					var newUser = new users(regObj);
					newUser.save(function(err,user){
                                        	console.log('Added user '+ username);
                                                res.writeHead(200);
                                                res.end('WERK');
                                        });
                                }

                	});
        	});
	});
	
	router.post('/api/v1/favorite',function(req, res){
               console.log("in favorites route");
		var jsonData = "";
               req.on('data', function (chunk){
		     jsonData += chunk;
		});
		req.on('end', function(){
                    var regObj = JSON.parse(jsonData);
       		    var id = regObj.id;
		    var name = regObj.name;
		    var url = regObj.url;	
                    console.log(regObj)             
		
		users.findOne(username:req.session.username},function(err,result){
			if(err) throw err;
			if(result != null){
                             console.log('found the user');
			     //check if user has already faved it
			     //if(has not faved)
			     //put into faves array
			     //else
			     //exit
			     console.log(result);
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
	});



    // application ------------------------------------
	router.get('*', function(req, res) {
		res.sendFile('./index.html', {root: "app"});
	});
};
