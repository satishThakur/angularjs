/**
 * Created by satish on 18/10/14.
 */
angular.module('TeamControllers').controller('TeamMemberCreateCtrl',
    function($scope, $routeParams,teamMemberFactory, $location){

        var team = $routeParams.team;

        $scope.editMember = null;
        $scope.banner = 'Creating';

        $scope.updateMember = function(){
            $scope.editMember.team = team;
            teamMemberFactory.createMember($scope.editMember).success(function(data){
                console.log('got data', data);
                $location.path('/member/' + data.id);
            });
        }

        $scope.cancelEditing = function(){
            $location.path('/amsteam');
        }



    });