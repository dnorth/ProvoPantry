angular.module('provoPantry').controller('LoginController', 
    ['$scope', '$http', function($scope, $http){
        $scope.test = "PROVO PANTRY FOR LIFE!";

	$scope.validateUser = function(){
	    
	    //TODO validate properly
	    if($scope.username == "dnorth2" && $scope.password == "test"){
		alert("Validated!!");
	    }
	    else {
		alert("Not Validated! try username: dnorth2 and password: test");
	    }
	}
        
        $scope.submitRegistration = function(){
            alert("Registered!!");
        }
}]);