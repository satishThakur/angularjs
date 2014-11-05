/**
 * Created by satish on 04/11/14.
 */
angular.module('TeamControllers').controller('MembersController', function($scope,$stateParams, Members, $state){
    var selectedTeam = $stateParams.team;
    $scope.members = Members.query();

    if(selectedTeam === 'amsteam'){
        $scope.selectedTeam = '';
    }else{
        $scope.selectedTeam = selectedTeam;
    }

    $scope.removeMember = function(member){
        var index  = _.indexOf($scope.members, member);
        Members.delete({id : member.id},function(data){
            $scope.$log.debug('Delete data:', data);
            $scope.members.splice(index,1);
        });
    }

    $scope.goEditMember = function(member){
        $state.go('member.edit', {id : member.id});
    }

    $scope.shouldShowCreating = function(){
        return $scope.selectedTeam !== null && $scope.selectedTeam !== "";
    }
});