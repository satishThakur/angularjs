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
            }

        ).otherwise({
                redirectTo: '/amsteam'
            });
    }]);

