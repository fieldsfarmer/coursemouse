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
                var baseUrl = "http://52.5.185.151:9200/coursera_courses/_search?q=_id:";
                $http.get(baseUrl+id).success(function(data){
                    callback(data);
                });
            },
            getfromId: function(id, callback){
                var baseUrl = "http://52.5.185.151:9200/coursera_courses/_search?q=id:";
                $http.get(baseUrl+id).success(function(data){
                    callback(data);
                });
            }
        }
    })
    .factory('Universities', function($http, $window){
        return {
            searchU: function(query, callback){
                var baseUrl = "http://52.5.185.151:9200/coursera_universities/_search?q=name:"
                $http.get(baseUrl+query).success(function(data){
                    callback(data);
                });
            },
            getfromId: function(id, callback){
                var baseUrl = "http://52.5.185.151:9200/coursera_universities/_search?q=id:"
                $http.get(baseUrl+id).success(function(data){
                    callback(data);
                });
            }
        }
    })
    .factory('Instructors', function($http, $window){
        return {
            getByID: function(id, callback){
                var baseUrl = "http://52.5.185.151:9200/coursera_instructors/_search?q=_id:";
                $http.get(baseUrl+id).success(function(data){
                    callback(data);
                });
            },
            searchInstructors: function(flag, query, callback){
                var baseUrl = "http://52.5.185.151:9200/coursera_instructors/_search?q="
                if(flag=='F'){
                    $http.get(baseUrl+'firstName:'+query).success(function(data){
                        callback(data);
                    });
                }
                else if(flag=='L'){
                    $http.get(baseUrl+'lastName:'+query).success(function(data){
                        callback(data);
                    });
                }
            },
            getfromId: function(id, callback){
                var baseUrl = "http://52.5.185.151:9200/coursera_instructors/_search?q=id:"
                $http.get(baseUrl+id).success(function(data){
                    callback(data);
                });
            }
        }
    })
    .factory('Categories', function($http, $window){
        return {
            searchC: function(query, callback){
                var baseUrl = "http://52.5.185.151:9200/coursera_categories/_search?q=name:"
                $http.get(baseUrl+query).success(function(data){
                    callback(data);
                });
            }
        }
    })
    ;
