angular.module('provoPantry').controller('LoginController', 
    ['$scope', '$http', 'UserFactory',  function($scope, $http, UserFactory){

	$scope.validateUser = function(){
	    
	    UserFactory.validateUser({
		    username: $scope.username,
		    password: $scope.password
		}, function(data) {
		    if(data.username == 'fail') {
		$scope.invalidUserMessage = 'Invalid Username or Password.';
		    }
		});
	    $scope.user = UserFactory.user;
	}	
        
        $scope.submitRegistration = function(){
            alert("Registered!!");
        }
}]);