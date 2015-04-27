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
        'sidebar@': {
            templateUrl: 'components/sidebar/sidebarView.html',
            controller: 'SidebarController'
        }
    }    
}

var register = {
    name: 'register',
    url: '/register',
    views: {
        '@': {
            templateUrl: 'components/register/registerView.html',
            controller: 'LoginController'
        },
        'sidebar@': {
            templateUrl: 'components/sidebar/sidebarView.html',
            controller: 'SidebarController'
        }
    }
}

var profile = {
    name: 'profile',
    url: '/profile',
    views: {
        '@': {
            templateUrl: 'components/profile/profileView.html',
            controller: 'ProfileController'
        },
        'sidebar@': {
            templateUrl: 'components/sidebar/sidebarView.html',
            controller: 'SidebarController'
        }
    }
}

angular.module('provoPantry', ['ui.router','ngCookies','ngSanitize'])
    .config([
	     '$stateProvider',
	     '$urlRouterProvider',
	     function($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state(home)
            .state(register)
            .state(login)
	    .state(profile);
            
            $urlRouterProvider.otherwise('/home');
	     }]);
