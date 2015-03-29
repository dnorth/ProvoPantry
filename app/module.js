var home = {
    name: 'home',
    url: '/home',
    templateUrl: 'components/home/homeView.html',
    controller: 'HomeController'
}

angular.module('provoPantry', ['ui.router'])
    .config([
	     '$stateProvider',
	     '$urlRouterProvider',
	     function($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state(home);
            
            $urlRouterProvider.otherwise('home');
	     }]);