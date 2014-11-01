'use strict';

var app = angular.module('teamApp',['ngRoute','TeamControllers','Services']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/amsteam', {
                templateUrl: 'partials/ams-team.html',
                controller : 'TeamCtrl'

            }).when('/member/:id', {
                templateUrl: 'partials/ams-team-member.html',
                controller : 'MemberController'
            }).when('/member/edit/:id',{
                templateUrl: 'partials/ams-team-member-edit.html',
                controller: 'TeamMemberEditCtrl'
        }).when('/teams/:team/create',{
                templateUrl: 'partials/ams-team-member-edit.html',
                controller: 'TeamMemberCreateCtrl'
            }).otherwise({
                redirectTo: '/amsteam'
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

