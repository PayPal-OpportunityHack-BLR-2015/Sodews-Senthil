'use strict';

var pawsApp = angular.module('pawsApp.profile', ['ngRoute']);

pawsApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
		templateUrl: '/assets/ng/profile.html',
    controller: 'profileCtrl'
	});
}]);

pawsApp.controller('profileCtrl', ["$scope","$rootScope", function($scope,$rootScope) {
	console.log($rootScope);
	if($rootScope.child && $rootScope.child.gallary)
		$scope.chunkedGallary = chunk($rootScope.child.gallary, 3);

	$rootScope.child.isBirthdayToday = $rootScope.child.birthday == "29/11/2012";
	
	function chunk(arr, size) {
	  var newArr = [];
	  for (var i=0; i<arr.length; i+=size) {
	    newArr.push(arr.slice(i, i+size));
	  }
	  return newArr;
	}



	
}]);