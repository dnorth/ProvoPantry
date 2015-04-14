angular.module('provoPantry').factory('UserFactory', ['$http', '$cookies', function($http, $cookies) {
    
    var userData = {
        user: {}
    }
    
    userData.validateUser = function(data, next) {
        return $http.post('/api/v1/login', data).success(function(res) {
            next(res);
        });
    }    
    
    userData.getUser = function(next) {
	var url = '/api/v1/users/' + $cookies.username;
	return $http.get(url).success(function(data) {
		angular.copy(data, userData.user);
        next();
	    });
    }

    userData.registerUser = function(data, next) {
        return $http.post('/api/v1/register',data).success(function(res){
                next(res);
        });     
    }

    userData.logout = function(next) {
	return $http.post('/api/v1/logout').success(function(){
		angular.copy({}, userData.user)
	    });
    }

    return userData;
}]);
