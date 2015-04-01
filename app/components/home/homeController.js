angular.module('provoPantry').controller('HomeController', 
    ['$scope', '$http', 'recipeFactory', function($scope, $http, recipeFactory){
	$scope.results = recipeFactory.recipes;
	var appId  = '8722cb52';
	var apiKey = '07e376a569ffb79e44e7122e1abe9b0a';

	$scope.getRecipe = function(id) {
		console.log(id);
	};

	$scope.$watch(function() { return recipeFactory.recipes;}, function(newVal, oldVal) {
		$scope.results = recipeFactory.recipes;
	});
}])
.config(function($httpProvider) {
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
