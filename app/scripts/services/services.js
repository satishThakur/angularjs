/**
 * Created by satish on 05/10/14.
 */
var servicesApp = angular.module('Services', ['ngResource']);

servicesApp.factory('teamNameFactory', function($http){

    var teamNameService = {};

    teamNameService.getTeams = function(){
        return $http.get('teams');
    }

    return teamNameService;

});


servicesApp.factory('teamMemberFactory', function($http){

    var teamMembersService = {};

    teamMembersService.getMembers = function(){
        return $http.get('members');
    }

    teamMembersService.getMember = function(id){
        return $http.get('members/' + id);
    }

    teamMembersService.editMember = function(member){
        return $http.post('members/' + member.id, member);
    }

    teamMembersService.createMember = function(member){
        return $http.post('members', member);
    }

    teamMembersService.deleteMember = function(id){
        return $http.delete('members/' + id);
    }

    return teamMembersService;

});
