/**
 * Created by satish on 03/11/14.
 */
app.controller('MemberController', ['$scope', '$stateParams','Members',
    '$state',function($scope, $stateParams,Members,$state){

        var id = $stateParams.id;
        $scope.$log.debug("id is: ", id);
        $scope.member = Members.get({id : id});

        $scope.deleteMember = function(){
            Members.delete({id : $scope.member.id}, function(){
                $state.go('team.members', {team : 'amsteam'}, {reload : true});
            });
        }

        $scope.back = function(){
            $state.go('team.members', {team : 'amsteam'});
        }

    }]);
