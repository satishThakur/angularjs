/**
 * Created by satish on 25/10/14.
 */
angular.module('Services').factory('Members', function($resource){
    return $resource('members/:id',
        {
            id : '@id'
        }
    );
});
