/**
 * Created by satish on 05/10/14.
 */
var servicesApp = angular.module('Services', []);

servicesApp.factory('teamNameFactory', function($http){

    var teamNameService = {};

    teamNameService.getTeams = function(){
        return $http.get('data/teams.json');
    }

    return teamNameService;

});


servicesApp.factory('teamMemberFactory', function($http){

    var teamMembersService = {};

    teamMembersService.getMembers = function(){
        return $http.get('data/team-members.json');
    }

    return teamMembersService;

});
