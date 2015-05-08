var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('MainController', ['$scope', 'Courses', function($scope, Courses) {
	$scope.courses = "";
	$scope.query = "";
	rawData = "";
	$scope.submit = function(){
		Courses.searchFromCoursera($scope.query, function(data){
			rawData = data.hits.hits;
			for(var i = 0; i < rawData.length; i++){
				if(rawData[i]._source.language != "en"){
					rawData[i]._source.name = utf8(rawData[i]._source.name);
					rawData[i]._source.shortDescription = utf8(rawData[i]._source.shortDescription);
				}
			}
			$scope.courses = rawData;
		});
	}
	utf8 = function(s){
		return s.replace(/\\u([0-9a-f]{4})/g, function (whole, group1) {return String.fromCharCode(parseInt(group1, 16));});
	};

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('CourseController', ['$scope', '$routeParams','Courses', function($scope, $routeParams, Courses) {
	$scope.courseID = $routeParams.id;
	$scope.course = "";
	
	rawData = ""
	suggest = ""
	
	$scope.photo = "";
	$scope.name = "";
	$scope.aboutTheCourse = "";
	$scope.courseFormat = "";
	$scope.recommendedBackground = "";
	$scope.website = "";

	rawData2 = ""
	$scope.suggest_courses = "";



	Courses.getCourseById($routeParams.id, function(data){
		rawData = data.hits.hits;
		suggest = rawData[0]._source.recommendbackground_p;
		// console.log(suggest);
		$scope.photo = rawData[0]._source.photo;
		if(rawData[0]._source.language != "en"){
			$scope.name = utf8(rawData[0]._source.name);
			$scope.aboutTheCourse = utf8(rawData[0]._source.aboutTheCourse);
			$scope.courseFormat = utf8(rawData[0]._source.courseFormat);
			$scope.recommendedBackground = utf8(rawData[0]._source.recommendedBackground);
		}
		else{
			$scope.name = rawData[0]._source.name;
			$scope.aboutTheCourse = rawData[0]._source.aboutTheCourse;
			$scope.courseFormat = rawData[0]._source.courseFormat;
			$scope.recommendedBackground = rawData[0]._source.recommendedBackground;			
		}
		$scope.website = rawData[0]._source.website;

		if(suggest !=  ""){
			Courses.searchFromCoursera(suggest, function(data){
				rawData2 = data.hits.hits
				getRidOfDuplicate($routeParams.id, rawData2);
				for(var i = 0; i < rawData2.length; i++){
					if(rawData2[i]._source.language != "en"){
						rawData2[i]._source.name = utf8(rawData2[i]._source.name);
					}
				}
				$scope.suggest_courses = rawData2;
			})
		};
	});

	getRidOfDuplicate = function(id, data){
		for(var i = 0; i < data.length; i++){
			if(data[i]._id == id){
				data.splice(i, 1);
			}
		}
	}

	utf8 = function(s){
		return s.replace(/\\u([0-9a-f]{4})/g, function (whole, group1) {return String.fromCharCode(parseInt(group1, 16));});
	};

	$(document).ready(function (){
		initNavbar();
	});
}]);





function initNavbar() {
	$('footer').css('display', 'inline');
	$(".dropdown-button").dropdown();
	$("#search-form").css('display', 'none');
	$("#search-trigger").on('click', function () {
		$("#navbar").css('display', 'none');
		$("#search-form").css('display', 'inline');
		$("#search").focus();
	});
	$("#search-form").on('focusout', function () {
		$("#navbar").css('display', 'inline');
		$("#search-form").css('display', 'none');
	});
}
