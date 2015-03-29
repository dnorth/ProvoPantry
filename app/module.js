angular.module('provoPantry', ['ui.router'])
    .factory('homeService', function() {
      return {
            test: "wow!"
      };
    })
    .config([
	     '$stateProvider',
	     '$urlRouterProvider',
	     function($stateProvider, $urlRouterProvider) {
		 $stateProvider
		 .state('home', {
			 url: '/home',
			 templateUrl: '/app/components/home/homeView.html',
			 controller: 'HomeController'
		     });
		 $urlRouterProvider.otherwise('home');
	     }]);