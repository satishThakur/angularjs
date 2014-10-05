/**
 * Created by satish on 05/10/14.
 */

var app = angular.module('TeamControllers',[]);

app.factory('Data', function(){
   var data = {members : []};

    return data;
});

app.controller("TeamCtrl",["$scope","teamNameFactory","teamMemberFactory","Data",
    function($scope, teamNameFactory,teamMemberFactory,Data){

    $scope.teams = [];
    teamNameFactory.getTeams().success(function(data){
        $scope.teams = data;
    });

    $scope.members = Data.members;
    if(Data.members.length === 0) {
        teamMemberFactory.getMembers().success(function (data) {
            _.each(data, function (elem) {
                Data.members.push(elem);
            });
        });
    }

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

    $scope.isEditing = false;

    $scope.editMember = null;

    $scope.startEditing = function(m){
        $scope.isEditing = true;
        $scope.editMember = angular.copy(m);
        $scope.isCreating = false;
    }

    $scope.cancelEditing = function(){
        $scope.isEditing = false;
    }

    $scope.updateMember = function(member){
        console.log(member);

        var origMember = _.find($scope.members, function(m){
            return m.id === member.id;
        });

        console.log(origMember);
        var index = _.indexOf($scope.members,origMember);
        console.log("Index", index);
        $scope.members[index] = member;
        $scope.editMember = null;
        $scope.isEditing = false;
    }


    $scope.isMemberSelected = function(id){
        return ($scope.editMember !== null) && (id === $scope.editMember.id);
    }

    $scope.deleteMember = function(member){

    }

    $scope.shouldShowCreating = function(selectedTeam){
        return selectedTeam !== null && selectedTeam !== "";
    }

    $scope.startCreating = function(){
        $scope.isCreating = true;
        $scope.isEditing = false;
    }

    $scope.createNewMember = function(newMember, team){
        newMember.team = team;
        newMember.id = $scope.members.length -1;
        $scope.members.push(newMember);
        $scope.isCreating = false;
    }

    $scope.cancelCreating = function(){
        $scope.isCreating = false;
    }

    $scope.removeMember = function(member){
        var index  = _.indexOf(Data.members, member);
        Data.members.splice(index,1);
    }
}]);


app.controller('MemberController', ['$scope', '$routeParams','teamMemberFactory',
    'Data','$location',function($scope, $routeParams,teamMemberFactory,Data,$location){
    var id = $routeParams.id;
    console.log("id is: ", id);

    $scope.member = null;

    var setEditMember = function(){
            _.each(Data.members, function (m) {
                if(m.id == id){
                    $scope.member = m;
                    return;
                }
            });
     }
    if(Data.members.length === 0) {
        teamMemberFactory.getMembers().success(function (data) {
            _.each(data, function(elem){
                Data.members.push(elem);
            });
            setEditMember();
        });
    }else{
        setEditMember();
    }



    $scope.isEditing = false;
    $scope.setEditing = function(){
        $scope.isEditing = true;
        $scope.editMember = angular.copy($scope.member);

    }

    $scope.cancelEditing = function(){
        $scope.isEditing = false;
    }

    $scope.updateMember = function(){
        $scope.member.name = $scope.editMember.name;
        $scope.member.role = $scope.editMember.role;
        $scope.isEditing = false;
    }

    $scope.go = function ( path ) {
        $location.path( path );
    };

    $scope.deleteMember = function(){
        var index  = _.indexOf(Data.members, $scope.member);
        Data.members.splice(index,1);
    }


}]);



