angular.module('provoPantry').controller('LoginController', 
    ['$scope', '$http', 'UserFactory',  function($scope, $http, UserFactory){

	$scope.validateUser = function(){
	    
	    UserFactory.validateUser({
		    username: $scope.username,
		    password: $scope.password
		});
	    $scope.user = UserFactory.user;

	    if($scope.user.username == 'fail')
		{
		    $scope.invalidUserMessage = 'Invalid Username or Password.';
		}
	}
        
        $scope.submitRegistration = function(){
            alert("Registered!!");
        }
}]);