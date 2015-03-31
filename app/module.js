var home = {
    name: 'home',
    url: '/home',
    views: {
        '@': {
            templateUrl: 'components/home/homeView.html',
            controller: 'HomeController'
        },
        'sidebar@': {
            templateUrl: 'components/sidebar/sidebarView.html',
            controller: 'SidebarController'
        }
    },
}

var login = {
    name: 'login',
    url: '/login',
    views: {
        '@': {
            templateUrl: 'components/login/loginView.html',
            controller: 'LoginController'
        },
        'register@': {
            templateUrl: 'components/register/registerView.html',
            controller: 'LoginController'
        },
        'sidebar@': {
            templateUrl: 'components/sidebar/sidebarView.html',
            controller: 'SidebarController'
        }
    }    
}

angular.module('provoPantry', ['ui.router'])
    .config([
	     '$stateProvider',
	     '$urlRouterProvider',
	     function($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state(home)
            .state(login);
            
            $urlRouterProvider.otherwise('/home');
	     }]);