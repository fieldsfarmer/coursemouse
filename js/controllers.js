var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('MainController', ['$scope', '$location', function($scope, $location) {
	$scope.index = 1;
	$scope.query = "";
	rawData = "";
	$scope.submit = function(){
		$location.path('/search_course/q='+$scope.query);
	}
	$scope.submitU = function(){
		$location.path('/search_university/q='+$scope.query);
	}
	$scope.submitI = function(){
		$location.path('/search_instructor/q='+$scope.query);
	}
	$scope.submitC = function(){
		$location.path('/search_category/q='+$scope.query);
	}

	$(document).ready(function (){
		initNavbar();
	});
}]);


demoControllers.controller('SearchCourseController', ['$scope', 'Courses', 'Universities', 'Instructors', 'Categories', '$location', '$routeParams', function($scope, Courses, Universities, Instructors, Categories, $location, $routeParams) {
	$scope.courses = "";
	$scope.query = $routeParams.query;
	rawData = "";

	Courses.searchFromCoursera($scope.query, function(data){
		rawData = data.hits.hits;
		for(var i = 0; i < rawData.length; i++){
			rawData[i]._source.name = utf8(rawData[i]._source.name);
			rawData[i]._source.shortDescription = utf8(rawData[i]._source.shortDescription);
		}
		$scope.courses = rawData;
	});

	$scope.submit = function(){
		if($scope.query != $routeParams.query){
			$location.path('/search_course/q='+$scope.query);	
		}
	}

	utf8 = function(s){
		return s.replace(/\\u([0-9a-f]{4})/g, function (whole, group1) {return String.fromCharCode(parseInt(group1, 16));});
	};

	$(document).ready(function (){
		initNavbar();
	});
}]);


demoControllers.controller('SearchUniversityController', ['$scope', 'Courses', 'Universities', 'Instructors', 'Categories', '$location', '$routeParams', function($scope, Courses, Universities, Instructors, Categories, $location, $routeParams) {
	$scope.courses = Array();
	$scope.instructors = Array();
	$scope.courses_id = "";
	$scope.instructors_id = "";

	$scope.query = $routeParams.query;
	rawData = "";
	$scope.logo = "";
	$scope.description = "";
	$scope.website = "";
	$scope.name = "";

	Universities.searchU($scope.query, function(data){
		rawData = data.hits.hits[0];
		// $scope.logo = rawData._source.logo;
		$scope.description = utf8(rawData._source.description);
		$scope.name = utf8(rawData._source.name);
		$scope.website = rawData._source.website;
		$scope.courses_id = rawData._source.links.courses;
		$scope.instructors_id = rawData._source.links.instructors;
		// console.log($scope.instructors_id);
		for(var i=0; i<$scope.courses_id.length; i++){
			Courses.getfromId($scope.courses_id[i], function(data_i){
				if(data_i.hits.hits.length != 0){
					data_i.hits.hits[0]._source.name = utf8(data_i.hits.hits[0]._source.name);
					$scope.courses.push(data_i.hits.hits[0]);
				}
			});
		}

		for(var j=0; j<$scope.instructors_id.length; j++){
			Instructors.getfromId($scope.instructors_id[j], function(data_j){
				if(data_j.hits.hits[0]._source.firstName != ""){
					data_j.hits.hits[0]._source.firstName = utf8(data_j.hits.hits[0]._source.firstName);
					data_j.hits.hits[0]._source.lastName = utf8(data_j.hits.hits[0]._source.lastName);
					$scope.instructors.push(data_j.hits.hits[0]);
				}
			});
		}
	});

	$scope.submit = function(){
		if($scope.query != $routeParams.query){
			$location.path('/search_university/q='+$scope.query);	
		}
	}

	utf8 = function(s){
		return s.replace(/\\u([0-9a-f]{4})/g, function (whole, group1) {return String.fromCharCode(parseInt(group1, 16));});
	};

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('SearchInstructorController', ['$scope', 'Courses', 'Universities', 'Instructors', 'Categories', '$location', '$routeParams', function($scope, Courses, Universities, Instructors, Categories, $location, $routeParams) {
	$scope.instructors = "";
	$scope.query = $routeParams.query;
	rawData = Array();

	Instructors.searchInstructors('F', $scope.query, function(data){
		rawData = data.hits.hits;
		Instructors.searchInstructors('L', $scope.query, function(data){
			rawData = rawData.concat(data.hits.hits);
			for(var i =0; i<rawData.length; i++){
				rawData[i]._source.firstName = utf8(rawData[i]._source.firstName);
				rawData[i]._source.lastName = utf8(rawData[i]._source.lastName);
			}
			$scope.instructors = rawData;
		});
	});

	$scope.submit = function(){
		if($scope.query != $routeParams.query){
			$location.path('/search_instructor/q='+$scope.query);	
		}
	}

	utf8 = function(s){
		return s.replace(/\\u([0-9a-f]{4})/g, function (whole, group1) {return String.fromCharCode(parseInt(group1, 16));});
	};

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('SearchCategoryController', ['$scope', 'Courses', 'Universities', 'Instructors', 'Categories', '$location', '$routeParams', function($scope, Courses, Universities, Instructors, Categories, $location, $routeParams) {
	$scope.courses = Array();
	$scope.courses_id = Array();

	$scope.query = $routeParams.query;
	rawData = Array();

	Categories.searchC($scope.query, function(data){
		rawData = data.hits.hits;
		if(rawData.length > 0){
			$scope.courses_id = rawData[0]._source.links.courses;
			for(var i = 1; i < rawData.length; i++){
				for(var j = 0; j < rawData[i]._source.links.courses.length; j++){
					if($scope.courses_id.indexOf(rawData[i]._source.links.courses[j])!=1)
						$scope.courses_id.push(rawData[i]._source.links.courses[j]);
				}
			}
			for(var k = 0; k < $scope.courses_id.length; k++){
				Courses.getfromId($scope.courses_id[k], function(data_k){
					if(data_k.hits.hits.length > 0){
						data_k.hits.hits[0]._source.name = utf8(data_k.hits.hits[0]._source.name);
						data_k.hits.hits[0]._source.shortDescription = utf8(data_k.hits.hits[0]._source.shortDescription);
						$scope.courses.push(data_k.hits.hits[0]);
					}
				});
			}
		}
	});

	$scope.submit = function(){
		if($scope.query != $routeParams.query){
			$location.path('/search_university/q='+$scope.query);	
		}
	}

	utf8 = function(s){
		return s.replace(/\\u([0-9a-f]{4})/g, function (whole, group1) {return String.fromCharCode(parseInt(group1, 16));});
	};

	$(document).ready(function (){
		initNavbar();
	});
}]);


demoControllers.controller('InstructorController', ['$scope', '$routeParams','Courses', 'Instructors', 'Universities', function($scope, $routeParams, Courses, Instructors, Universities) {
	$scope.ID = $routeParams.id;
	$scope.uni = "";
	$scope.course = "";
	$scope.photo = "";
	$scope.name = "";
	$scope.bio = "";
	$scope.website = "";
	$scope.department = "";

	rawData = ""

	Instructors.getByID($routeParams.id, function(data){
		rawData = data.hits.hits[0];
		$scope.photo = rawData._source.photo;
		$scope.name = utf8(rawData._source.firstName) + ' ' + utf8(rawData._source.lastName);
		$scope.website = rawData._source.website;
		$scope.bio = utf8(rawData._source.bio);
		$scope.title = utf8(rawData._source.title);
		$scope.department = utf8(rawData._source.department);
		Universities.getfromId(rawData._source.links.universities[0], function(data0){
			$scope.uni = data0.hits.hits[0]._source.name;
			// console.log($scope.uni);
		});
	});


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
		// suggest = rawData[0]._source.recommendedBackground;

		$scope.photo = rawData[0]._source.photo;
		$scope.name = utf8(rawData[0]._source.name);
		$scope.aboutTheCourse = utf8(rawData[0]._source.aboutTheCourse);
		$scope.courseFormat = utf8(rawData[0]._source.courseFormat);
		$scope.recommendedBackground = utf8(rawData[0]._source.recommendedBackground);
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
