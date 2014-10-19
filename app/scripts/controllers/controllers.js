/**
 * Created by satish on 05/10/14.
 */

var app = angular.module('TeamControllers',[]);



app.controller("TeamCtrl",["$scope","teamNameFactory","teamMemberFactory",
    'SelectionData','$location',
    function($scope, teamNameFactory,teamMemberFactory,SelectionData, $location){

    $scope.teams = [];
    teamNameFactory.getTeams().success(function(data){
        $scope.teams = data;
    });

    $scope.members = [];

    teamMemberFactory.getMembers().success(function (data) {
        $scope.members = data;
    });

    $scope.selectionData = SelectionData;

    $scope.$watch(function(){
        return SelectionData.selection;
    }, function(){
        console.log('data changed!!');
        $scope.setSelectedTeam('');
    });

    $scope.selectedTeam = "";

    $scope.setSelectedTeam = function(team){
        $scope.selectedTeam = team;
        if(team == ""){
            $scope.teamScope = "AMS";
        }else{
            $scope.teamScope = team;
        }
    }

    $scope.isTeamSelected = function(team){
        return team === $scope.selectedTeam;
    }

    $scope.teamScope = "AMS";
    $scope.shouldShowCreating = function(selectedTeam){
        return selectedTeam !== null && selectedTeam !== "";
    }

    $scope.startCreating = function(selectedTeam){
        $scope.go('/teams/' + selectedTeam + "/create");
    }

    $scope.removeMember = function(member){
        var index  = _.indexOf($scope.members, member);
        teamMemberFactory.deleteMember(member.id).success(function(){
            $scope.members.splice(index,1);
        });

    }
    //this should be a directive!!! fixme

    $scope.go = function(path){
        console.log('go to location', path);
        $location.path(path);
    }

    $scope.goEditMember = function(member){
        console.log('GoEditMember called!!', member);
        $scope.go('/member/edit/' + member.id);
    }
}]);


app.controller('MemberController', ['$scope', '$routeParams','teamMemberFactory',
    '$location',function($scope, $routeParams,teamMemberFactory,$location){

    var id = $routeParams.id;
    console.log("id is: ", id);

    $scope.member = null;

    teamMemberFactory.getMember(id).success(function(data){
        $scope.member = data;
    });

    $scope.go = function ( path ) {
        $location.path( path );
    };

    $scope.deleteMember = function(location){

        teamMemberFactory.deleteMember($scope.member.id).success(function(){
                $scope.go(location);
        });
    }

    $scope.goEditMember = function(member){
        console.log('GoEditMember called!!', member);
        $scope.go('/member/edit/' + member.id);
    }

}]);


app.factory('SelectionData', function(){
   var data  = {};
    data.selection = true;

    return data;
});


app.controller('HeaderCtrl', ['$scope','SelectionData', function($scope,SelectionData){
    $scope.selected = function(){
        console.log('selection made!!');
        SelectionData.selection = !SelectionData.selection;
        console.log('selection made!!', SelectionData);
    }
}]);


app.directive('appHeader', function(){

    return {

        restrict : 'A',
        templateUrl : 'partials/header.html',
        controller : 'HeaderCtrl'
    };

});



