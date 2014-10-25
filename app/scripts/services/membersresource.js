/**
 * Created by satish on 25/10/14.
 */

// This just mimics how we can wrap http for resource kind of functionality.
angular.module('Services').factory('MembersResource', function($http){

    return function(url, params){

        var Resource = function(data){
          angular.extend(this, data);
        };

        Resource.query = function(){
               return $http.get(url).then(function(response){
                   console.log('got data: ', response.data);
                    var resources = [];
                   angular.forEach(response.data, function(elem, index){
                      resources[index] = new Resource(elem);
                   });
                   return resources;
               }, function(data){
                    return [];
               });
        }

        Resource.findById = function(id){
            return $http.get(url + '/' + id).then(function(data){
                return new Resource(data);
            });
        }

        Resource.deleteById = function(id){
            return $http.delete(url + '/' + id).then(function(data){
                return new Resource(data);
            });
        }



        return Resource;

    };

});