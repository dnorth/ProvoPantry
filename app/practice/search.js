angular.module("search", [])
.controller('searchCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.ingredients = [];
	$scope.results = [];
	var appId  = '8722cb52';
	var apiKey = '07e376a569ffb79e44e7122e1abe9b0a';

	$scope.addIngredient = function(newIngredient) {
		$scope.ingredients.push(newIngredient);
		$scope.ingredientInput = "";
	};

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
			for(var i=0; i < data.matches.length; i++) {
				var result = {
					id: data.matches[i].id,
					name: data.matches[i].recipeName
				};
				$scope.results.push(result);
			}
			/*var result = "<ul>";
			var match = data.matches[0];//the first search result
			result += "<li><b>id:</b> "+match.id+"</li>";
			result += "<li><b>image:</b> "+match.smallImageUrls[0]+"</li>";
			result += "<li><b>name:</b> "+match.recipeName+"</li>";
			result += "<li><b>course:</b> "+match.attributes.course+"</li>";
			result += "<ul>";
			for(var i = 0; i < match.ingredients.length; i++) {
				result += "<li>"+match.ingredients[i]+"</li>";
			}
			result += "</ul></ul>";
			document.getElementById('search').innerHTML = result;*/
		});
	}
}])
.config(function($httpProvider) {
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
