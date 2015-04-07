var users = require('../models/users');
var mongoose = require('mongoose');
var User = mongoose.model('users');
var crypto = require('crypto');
function hashPW(pwd){
  return crypto.createHash('sha256').update(pwd).
         digest('base64').toString();
}

exports.login = function(req, res){
	var lgnObj = req.body;
	var username = lgnObj.username;
	var pswrd = lgnObj.password;
	if(username == 'rick' && pswrd == 'roll'){
		res.header('Access-Control-Allow-Origin', '*');
		res.redirect('http://bringvictory.com/');
	}
	else{
	    users.findOne({username:username},function(err,user){
		    if(err) throw err;
		    if(user==null){
			console.log(username + " does not exist.")
			    res.json({});
		    }
		    else{
			if(user.password==hashPW(pswrd)){
			    req.session.regenerate(function() {
				    req.session.user = user.id;
				    req.session.username = user.username;
				    console.log(username + " authenticated!");
				    res.cookie('username',username);
				    res.json({'redirect' : '/home'});
				});
			    //res.json(user.withoutPassword());
			}
			else{
			    console.log(username + " failed authentication.")
                req.session.regenerate(function() {
			        res.json({});
                }
			}
		    }
		});
	}
}



exports.register = function(req,res){
	var regObj = req.body;
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
			newUser.password = hashPW(pswrd);
			console.log(newUser)
			newUser.save(function(err,user){
				console.log('Added user '+ username);
				req.session.user = user.id;
      				req.session.username = user.username;
				res.cookie('username',username);
				res.writeHead(200);
				res.end('WERK');
			});
		}
	});
}

exports.logout = function(req,res){
	req.session.destroy(function(){
		res.clearCookie('username');
		res.redirect('/login#/login');
	});
}
