'use strict';

var app = angular.module('teamApp',['ui.router','TeamControllers','Services']);

app.config(['$urlRouterProvider', '$stateProvider',
    function($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('/team/amsteam');

        $stateProvider.state('team', {
            url : '/team',
            templateUrl : 'partials/ams-teams.html',
            controller : 'TeamController',
            abstract : true

        }).state('team.members', {
            url : '/:team',
            templateUrl : 'partials/ams-team-members.html',
            controller : 'MembersController'
        }).state('team.members.create',{
            url : '/create',
            templateUrl : 'partials/ams-team-member-edit.html',
            controller : 'TeamMemberCreateCtrl'
        }).state('member', {
            url : '/team/members/:id',
            templateUrl : 'partials/ams-team-member.html',
            controller : 'MemberController'
        }).state('member.edit', {
            url : '/edit',
            controller : 'TeamMemberEditCtrl',
            templateUrl : 'partials/ams-team-member-edit.html'
        });


    }]).config(['$httpProvider', function($httpProvider){
                $httpProvider.interceptors.push(function(){
                    return {
                      request : function(config){
                          //console.log('HTTP request being made: ',config);
                          return config;
                        },
                      response : function(config){
                        //console.log('HTTP response received: ', config.status, config.data);
                        return config;
                      }

                    };
                });
    }]).config(function($logProvider){
        $logProvider.debugEnabled(true);
    }).config(function($locationProvider){
        $locationProvider.html5Mode(true);
    }).run(function($rootScope, $log){
        $rootScope.$log = $log;
    });

