angular.module('provoPantry').controller('LoginController', 
    ['$scope', '$http', function($scope, $http){
        $scope.test = "PROVO PANTRY FOR LIFE!";
        
        $scope.submitRegistration = function(){
            alert("Registered!!");
        }
}]);