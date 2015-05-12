var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices']);

demoApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	$httpProvider.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' };
	$httpProvider.defaults.headers.put  = {'Content-Type': 'application/x-www-form-urlencoded'};
	$routeProvider.
	when('/home', {
		templateUrl: 'partials/main.html',
		controller: 'MainController'
	}).
	when('/search_course/q=:query', {
		templateUrl: 'partials/search_course.html',
		controller: 'SearchCourseController'
	}).
	when('/search_university/q=:query', {
		templateUrl: 'partials/search_university.html',
		controller: 'SearchUniversityController'
	}).
	when('/search_instructor/q=:query', {
		templateUrl: 'partials/search_instructor.html',
		controller: 'SearchInstructorController'
	}).
	when('/search_category/q=:query', {
		templateUrl: 'partials/search_category.html',
		controller: 'SearchCategoryController'
	}).
	when('/courses/:id', {
	 	templateUrl: 'partials/course.html',
	 	controller: 'CourseController'
	}).
	when('/instructors/:id', {
	 	templateUrl: 'partials/instructor.html',
	 	controller: 'InstructorController'
	}).
	otherwise({
		redirectTo: '/home'
	});
}]);