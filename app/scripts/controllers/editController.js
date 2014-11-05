/**
 * Created by satish on 18/10/14.
 */
angular.module('TeamControllers').controller('TeamMemberEditCtrl',
    function($scope, $stateParams,Members, $state){

    var id = $stateParams.id;

    $scope.editMember = Members.get({id : id});
    $scope.banner = 'Editing';


    $scope.updateMember = function(){
        $scope.editMember.$save(function(data){
            $state.go('^',{}, {reload : true});
        });
    }

    $scope.cancelEditing = function(){
        $state.go('^');
    }



});