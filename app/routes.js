// setup ---------------------------------------------
var users = require('./models/users');
var cookieParser = require('cookie-parser');
module.exports = function(app) {

app.use(cookieParser);
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


app.post('/api/v1/login', function(req,res){
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
				console.log(user);
                                user.toArray(function(err,usrArray){
                                        console.log(usrArray);
                                        if(usrArray.length==0){
                                                console.log('username not found');
                                                res.writeHead(200);
                                                res.json([]);
                                        }
                                        else if(usrArray[0].password==pswrd){
                                                console.log('successful login');
                                                res.writeHead(200);
						res.cookie("di_angello_vickers","1",{age:60*5});
                                                res.end('success');
                                        }
                                        else{
                                                console.log('incorrect password');
                                                res.writeHead(200);
                                                res.end('incorrect password');
                                        }
                                });
                        });
                });

        });

app.post('/api/v1/register',function(req,res){
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
                	result.toArray(function(err,itemArr){
                        	if(itemArr.length>0){
                        		console.log('username in use');
                                        console.log(itemArr);
                                        res.writeHead(200);
                                        res.end('invalid');
                                }
                                else{
                                        users.insert(regObj,function(err,records){
                                        	console.log('Added user '+ username);
                                        });
                                }
                        });
                });
        });
});




    // application ------------------------------------
    app.get('*', function(req, res) {
	    res.sendfile('./html/index.html');
	});
};
