/**
 * Created by satish on 04/11/14.
 */
angular.module('TeamControllers').controller('TeamController', function($scope,Teams){
    $scope.teams = Teams.query();
});