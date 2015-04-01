var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('users');
//sessions or cookies? Rediect to where?
function hashPW(pwd){
  return crypto.createHash('sha256').update(pwd).
         digest('base64').toString();
}

exports.register = function(req,res){
        var regObj = req.body;
                var username = regObj.username;
                users.findOne({username:username},function(err,result){
                	if(err) throw err;
                        if(result!=null){
                        	console.log('username in use');
                                console.log(result);
                                res.writeHead(200);
                                res.end('invalid');
				//consider res.redirect('regsiter url');
                        }
                        else{
                        	var newUser = new users(regObj);
				newUser.password = hashPW(regObj.password);
                                newUser.save(function(err,user){
                                        console.log('Added user '+ username);
                                        res.redirect('/');
                                });
                        }

                });
        });
}

exports.login = function(req,res){
	//might be able to use req.body as our object
        var lgnObj = req.body;
        var username = lgnObj.username;
        var pswrd = hashPW(lgnObj.password);

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
                                res.redirect('/');
                        }
                        else{
                              	console.log('incorrect password');
                                res.writeHead(200);
                                res.end('incorrect password');
                        }
                }
	});
}








