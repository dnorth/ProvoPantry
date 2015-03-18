/**
 * This is just a minimal angular file with examples
 * of the requests we can make and the data available.
 * There is more data available, but these are the main
 * things that we will need. You can look at the console
 * to see the entire json response. But to see how to
 * access each of the pieces and how to make the call
 * you can follow the example below. If you have
 * questions let me know.
 */


var app = angular.module('requestApp', []);
app.controller('requestCtrl', function($scope, $http) {
	$scope.id = 'French-Onion-Soup-1019866';
	var appId = '8722cb52';
	var apiKey = '07e376a569ffb79e44e7122e1abe9b0a';
	$scope.info = "";
	//The API call is made using this syntax
	//This is the call that would be made when selecting a particular recipe
	//https://api.yummly.com/v1/api/recipe/<id>?_app_id=<appId>&_app_key=<apiKey>
	$scope.getRecipe = function(id) {
		var url = 'https://api.yummly.com/v1/api/recipe/' + id
			 + '?_app_id=' + appId + '&_app_key=' + apiKey;
		$http.get(url).success(function(data) {
			console.log(data);
			var result = "<ul>";
			result += "<li><b>" + "attribution.html:</b> "+ data.attribution.html + "</li>";
			result += "<li><b>" + "image:</b> "+ data.images[0].hostedSmallUrl + "</li>";
			result += "<li><b>" + "name:</b> "+ data.name + "</li>";
			result += "<li><b>" + "source name:</b> "+ data.source.sourceDisplayName + "</li>";
			result += "<li><b>" + "recipe url:</b> "+ data.source.sourceRecipeUrl + "</li>";
			result += "<li><b>ingredients</b></li><ul>";
			for(var i = 0; i < data.ingredientLines.length; i++) {
				result += "<li>" + data.ingredientLines[i] + "</li>";
			}
			result += "</ul></ul>";
			//don't judge me on this, this isn't what you should do with angular, I know, it was just easier for demonstration purposes
			document.getElementById('recipe').innerHTML = result;
		});
	}

	$scope.ing1 = 'onion';
	$scope.ing2 = 'soup';
	//This function expects two ingredients, it could be changed
	//to expect an array of them, or any other way we choose to handle it
	//and will return the list of recipes matching the search terms
	//this could be expanded to include other search parameters as well
	//I just did it this way for demonstration purposes until we get the
	//front end working
	$scope.search = function(ingredient1, ingredient2) {
		var allowed = '&allowedIngredient[]='+ingredient1+'&allowedIngredient[]='+ingredient2;
		// request has the Form: 'https://api.yummly.com/v1/api/recipes?_app_id=<appId>&_app_key=<apiKey>&<query string>;
		var url = 'https://api.yummly.com/v1/api/recipes?_app_id='+appId+'&_app_key='+apiKey+allowed;
		$http.get(url).success(function(data) {
			console.log(data);
			var result = "<ul>";
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
			document.getElementById('search').innerHTML = result;
		});
	}
});
app.config(function($httpProvider) {
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
