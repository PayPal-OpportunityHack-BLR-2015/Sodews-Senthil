'use strict';

var pawsApp = angular.module('pawsApp.reports', ['ngRoute']);

pawsApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/reports', {
		templateUrl: '/assets/ng/reports.html',
    controller: 'reportsCtrl'
	});
}]);

pawsApp.controller('reportsCtrl', [function($scope) {

}]);