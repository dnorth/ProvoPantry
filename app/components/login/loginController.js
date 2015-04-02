angular.module('provoPantry').controller('LoginController', 
    ['$scope', '$http', 'UserFactory',  function($scope, $http, UserFactory){

	$scope.validateUser = function(){
	    
	    //TODO validate properly
        UserFactory.validateUser({
            username: $scope.username,
            password: $scope.password
        });
        $scope.user = UserFactory.user;
        
        console.log($scope.user);
		alert("Validated!!");
	}
        
        $scope.submitRegistration = function(){
            alert("Registered!!");
        }
}]);