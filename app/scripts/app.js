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
    }]);

