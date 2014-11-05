/**
 * Created by satish on 18/10/14.
 */
angular.module('TeamControllers').controller('TeamMemberCreateCtrl',
    function($scope, $stateParams,Members, $state){

        var team = $stateParams.team;

        $scope.editMember = null;
        $scope.banner = 'Creating';

        $scope.updateMember = function(){
            $scope.editMember.team = team;
            Members.save($scope.editMember, function(data){
                $state.go('^', {}, {reload : true});
            });
        }

        $scope.cancelEditing = function(){
           $state.go('^');
        }

    });