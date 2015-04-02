angular.module('provoPantry').factory('UserFactory', ['$http', function($http) {
    
    var userData = {
        user: {}
    }
    
    userData.validateUser = function(data, next) {
        return $http.post('/api/v1/login', data).success(function(data) {
            angular.copy(data, userData.user);
	    next(userData.user);
        });
    }    
    
    return userData;
}]);
