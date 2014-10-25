/**
 * Created by satish on 05/10/14.
 */

var app = angular.module('TeamControllers',[]);



app.controller("TeamCtrl",["$scope","Teams","Members",
    'SelectionData','$location',
    function($scope, Teams,Members,SelectionData, $location){

    $scope.teams = Teams.query();

    $scope.members = Members.query();

    $scope.selectionData = SelectionData;

    $scope.$watch(function(){
        return SelectionData.selection;
    }, function(){
        $scope.$log.debug('data changed!!');
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
        Members.delete({id : member.id},function(data){
            $scope.$log.debug('Delete data:', data);
            $scope.members.splice(index,1);
        });
    }
    //this should be a directive!!! fixme

    $scope.go = function(path){
        $scope.$log.debug('go to location', path);
        $location.path(path);
    }

    $scope.goEditMember = function(member){
        $scope.$log.debug('GoEditMember called!!', member);
        $scope.go('/member/edit/' + member.id);
    }
}]);


app.controller('MemberController', ['$scope', '$routeParams','Members',
    '$location',function($scope, $routeParams,Members,$location){

    var id = $routeParams.id;
    $scope.$log.debug("id is: ", id);

    $scope.member = Members.get({id : id});

    $scope.go = function ( path ) {
        $location.path( path );
    };

    $scope.deleteMember = function(location){
        Members.delete({id : $scope.member.id}, function(){
            $scope.go(location);
        });
    }

    $scope.goEditMember = function(member){
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
        SelectionData.selection = !SelectionData.selection;
    }
}]);


app.directive('appHeader', function(){

    return {

        restrict : 'A',
        templateUrl : 'partials/header.html',
        controller : 'HeaderCtrl'
    };

});



