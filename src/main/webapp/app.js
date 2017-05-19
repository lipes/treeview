(function() {
    'use strict';

    angular.module('tree', ["ngRoute", "ui.bootstrap"])
    .config(config);
    
    function config($routeProvider, $locationProvider, $httpProvider) {
        $locationProvider.hashPrefix('');
		$routeProvider.when('/', {
			templateUrl : './app/home/index.html'
		}).otherwise({
			redirectTo : '/'
		});
		$httpProvider.interceptors.push('httpInterceptor'); 
	}
})();