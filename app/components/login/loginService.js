angular.module('provoPantry').factory('UserFactory', ['$http', function($http) {
    
    var userData = {
        user: {}
    }
    
    userData.validateUser = function(data) {
        return $http.post('/api/v1/login', data).success(function(data) {
            angular.copy(data, userData.user);
        });
    }    
    
    return userData;
}]);
