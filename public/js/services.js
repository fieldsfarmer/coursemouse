// js/services/todos.js
angular.module('demoServices', [])
    .factory('Courses', function($http, $window){
        return {
            searchFromCoursera: function(query, callback){
                var baseUrl = "http://52.5.185.151:9200/coursera_courses/_search?q=name:"
                $http.get(baseUrl+query).success(function(data){
                    callback(data);
                });
            },
            getCourseById: function(id, callback){
                var baseUrl = "http://52.5.185.151:9200/coursera_courses/_search?q=_id:"
                $http.get(baseUrl+id).success(function(data){
                    callback(data);
                });
            }
        }
    })
    ;
