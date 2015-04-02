angular.module('provoPantry').controller('HomeController', 
    ['$scope', '$http', 'recipeFactory', function($scope, $http, recipeFactory){
	$scope.results = recipeFactory.recipes;
	var appId  = '8722cb52';
	var apiKey = '07e376a569ffb79e44e7122e1abe9b0a';

	$scope.getRecipe = function(id) {
		//get corresponding recipe index
		var index = 0;
		for(var i = 0; i < $scope.results.length; i++) {
			if($scope.results[i].id == id) {
				index = i;
				break;
			}
		}

		if($scope.results[index].queries > 0) {
			return;
		}
		$scope.results[index].queries++;
		var url = 'https://api.yummly.com/v1/api/recipe/'+id+'?_app_id=8722cb52&_app_key=07e376a569ffb79e44e7122e1abe9b0a';
		$http.get(url).success(function(data) {
			$scope.results[i].sourceURL  = data.source.sourceRecipeUrl;
			$scope.results[i].sourceName = data.source.sourceDisplayName;
			$scope.results[i].ingredientLines = data.ingredientLines;
		});
	};

	//update recipe list real-time
	$scope.$watch(function() { return recipeFactory.recipes;}, function(newVal, oldVal) {
		$scope.results = recipeFactory.recipes;
	});
}])
.config(function($httpProvider) {
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
