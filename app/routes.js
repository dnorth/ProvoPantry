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
					console.log('username not found');
                                        res.writeHead(200);
                                        res.json([]);
				}
				else{
					if(user.password==pswrd){
                                                console.log('successful login');
                                                res.writeHead(200);
                                                //res.cookie("di_angello_vickers","1",{age:60*5});
                                                res.end('success');
                                         }
                                         else{
                                                console.log('incorrect password');
                                                res.writeHead(200);
                                                res.end('incorrect password');
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




    // application ------------------------------------
	router.get('*', function(req, res) {
		res.sendFile('./index.html');
	});
};
