/**
 * Created by satish on 18/10/14.
 */
angular.module('TeamControllers').controller('TeamMemberEditCtrl',
    function($scope, $routeParams,teamMemberFactory, $location){

    var id = $routeParams.id;

    $scope.editMember = null;
        $scope.banner = 'Editing';

    teamMemberFactory.getMember(id).success(function(data){
        $scope.editMember = data;
    });

    $scope.updateMember = function(){
        teamMemberFactory.editMember($scope.editMember).success(function(){
            $location.path('/member/' + $scope.editMember.id);
        });
    }

    $scope.cancelEditing = function(){
        $location.path('/member/' + $scope.editMember.id);
    }



});