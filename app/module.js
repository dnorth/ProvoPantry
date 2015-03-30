var home = {
    name: 'home',
    url: '/home',
    views: {
        'content': {
            templateUrl: 'components/home/homeView.html',
            controller: 'HomeController'
        },
        'sidebar': {
            templateUrl: 'components/sidebar/sidebarView.html',
            controller: 'SidebarController'
        }
    },
}

//var register = {
//    
//}

angular.module('provoPantry', ['ui.router'])
    .config([
	     '$stateProvider',
	     '$urlRouterProvider',
	     function($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state(home);
            //.state(register);
            
            $urlRouterProvider.otherwise('home');
	     }]);