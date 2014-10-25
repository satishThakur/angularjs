/**
 * Created by satish on 25/10/14.
 */
angular.module('Services').factory('Teams', function($resource){
    return $resource('teams');
});