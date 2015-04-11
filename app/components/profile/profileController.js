angular.module('provoPantry').controller('ProfileController',
    ['$scope', '$http','$cookies','UserFactory', function($scope,$http,$cookies,UserFactory){
		UserFactory.getUser(function() {
        		$scope.user = UserFactory.user;
			console.log($scope.user);
			if($scope.user.length == 0){
				window.location = "/#/login";
			}
			
    		});
		
   }])
.config(function($httpProvider) {
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
