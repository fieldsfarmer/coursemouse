var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices']);

demoApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	$httpProvider.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' };
	$httpProvider.defaults.headers.put  = {'Content-Type': 'application/x-www-form-urlencoded'};
	$routeProvider.
	when('/home', {
		templateUrl: 'partials/main.html',
		controller: 'MainController'
	}).
	when('/search/q=:query', {
		templateUrl: 'partials/search.html',
		controller: 'SearchController'
	}).
	when('/courses/:id', {
	 	templateUrl: 'partials/course.html',
	 	controller: 'CourseController'
	}).
	otherwise({
		redirectTo: '/home'
	});
}]);