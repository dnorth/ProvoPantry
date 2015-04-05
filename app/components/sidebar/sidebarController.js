angular.module('provoPantry').controller('SidebarController', 
					 ['$scope', '$http', '$cookies', 'recipeFactory', 'UserFactory', function($scope, $http, $cookies, recipeFactory, UserFactory){

	$scope.placeholder = "Add Ingredient";
	var appId  = '8722cb52';
	var apiKey = '07e376a569ffb79e44e7122e1abe9b0a';
	$scope.searchTypes = [
		{
			name:'include',
			list: [],
			color: "#5A764B",
			placeholder: "Add Ingredient",
			title: "Include these ingredients",
			apiTag: "&allowedIngredient[]="
		},
		{
			name:'exclude',
			list: [],
			color: "#BF4D48",
			placeholder: "Exclude Ingredient",
			title: "Exclude these ingredients",
			apiTag: "&excludedIngredient[]="
		}
	];
	$scope.searchType = $scope.searchTypes[0].name;
	$scope.updateType = function(index) {
		$scope.searchType = $scope.searchTypes[index].name;
		$scope.placeholder = $scope.searchTypes[index].placeholder;
	};

	$scope.addIngredient = function(type, newIngredient) {
		var index = 0;
		for(var i = 0; i < $scope.searchTypes.length; i++) {
			if($scope.searchTypes[i].name == type) {
				index = i;
				break;
			}
		}
		$scope.searchTypes[index].list.push(newIngredient);
		$scope.ingredientInput = "";
	};

	$scope.removeIngredient = function(type, ingredient) {
		var index = 0;
		for(var i = 0; i < $scope.searchTypes.length; i++) {
			if($scope.searchTypes[i].name == type) {
				index = i;
				break;
			}
		}
		var ingredientIndex = $scope.searchTypes[index].list.indexOf(ingredient);
		$scope.searchTypes[index].list.splice(ingredientIndex, 1);
	};

	$scope.sessionUser = UserFactory.user;

	$scope.search = function() {
		if($scope.searchTypes[0].list.length < 1) {
			alert('Please add some ingredients to include in your recipe!');
			return;
		}
		var query = "";
		for(var i=0; i < $scope.searchTypes.length; i++) {
			for(var j=0; j < $scope.searchTypes[i].list.length; j++) {
				query += $scope.searchTypes[i].apiTag + $scope.searchTypes[i].list[j];
			}
		}
		var url = 'https://api.yummly.com/v1/api/recipes?_app_id='+appId+'&_app_key='+apiKey+query;
		$http.get(url).success(function(data) {
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
