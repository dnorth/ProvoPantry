angular.module('provoPantry').controller('SidebarController', 
					 ['$scope', '$http', '$cookies', 'recipeFactory', 'UserFactory', function($scope, $http, $cookies, recipeFactory, UserFactory){

	$scope.ingredients = [];
	var appId  = '8722cb52';
	var apiKey = '07e376a569ffb79e44e7122e1abe9b0a';

	$scope.addIngredient = function(newIngredient) {
		$scope.ingredients.push(newIngredient);
		$scope.ingredientInput = "";
	};

	$scope.removeIngredient = function(ingredient) {
		var index = $scope.ingredients.indexOf(ingredient);
		$scope.ingredients.splice(index, 1);
	};

	$scope.sessionUser = UserFactory.user;

	$scope.search = function() {
		if($scope.ingredients.length < 1) {
			alert('Please add some ingredients to include in your recipe!');
			return;
		}
		var allowed = "";
		for(var i=0; i < $scope.ingredients.length; i++) {
			allowed += "&allowedIngredient[]="+$scope.ingredients[i];
		}
		var url = 'https://api.yummly.com/v1/api/recipes?_app_id='+appId+'&_app_key='+apiKey+allowed;
		$http.get(url).success(function(data) {
			console.log(data);
			var results = [];
			for(var i=0; i < data.matches.length; i++) {
				var result = {
					id: data.matches[i].id,
					name: data.matches[i].recipeName,
					imageURL: data.matches[i].smallImageUrls[0],
					source: data.matches[i].sourceDisplayName,
					ingredients: [],
					queries: 0
				};
				for(var j=0; j < data.matches[i].ingredients.length; j++) {
					result.ingredients.push(data.matches[i].ingredients[j]);
				}
				results.push(result);
			}
			recipeFactory.recipes = results;
		});
	}
}])
.factory('recipeFactory', [function() {
	var r = {
		recipes: []
	};
	return r;
}])
.config(function($httpProvider) {
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
