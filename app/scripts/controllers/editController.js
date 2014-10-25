/**
 * Created by satish on 18/10/14.
 */
angular.module('TeamControllers').controller('TeamMemberEditCtrl',
    function($scope, $routeParams,Members, $location){

    var id = $routeParams.id;

    $scope.editMember = Members.get({id : id});
    $scope.banner = 'Editing';


    $scope.updateMember = function(){
        $scope.editMember.$save(function(data){
            $location.path('/member/' + $scope.editMember.id);
        });
    }

    $scope.cancelEditing = function(){
        $location.path('/member/' + $scope.editMember.id);
    }



});