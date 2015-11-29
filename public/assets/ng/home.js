'use strict';

var pawsApp = angular.module('pawsApp.home', ['ngRoute','firebase']);

pawsApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
		templateUrl: '/assets/ng/home.html',
    	controller: 'homeCtrl'
	});
}]);

pawsApp.controller('homeCtrl', ["$scope", "$rootScope", "$firebaseObject","$firebaseArray","$location", function($scope,$rootScope, 
$firebaseObject, $firebaseArray, $location) {
	var mail = localStorage.getItem("useremail");
	var uname = mail ? mail.substring(0,mail.indexOf('@')): null;
	$scope.childs  = uname ? $firebaseArray(new Firebase("https://sodews.firebaseio.com/donors/"+uname+"/childs")): [];

	$scope.openProfile = function(child) {
		$rootScope.child = child;
		$location.path('/profile');
	};

}]);

pawsApp.controller('NotificationsCtrl', ["$scope", "$rootScope", "$firebaseObject","$firebaseArray","$location", function($scope,$rootScope, 
$firebaseObject, $firebaseArray, $location) {
	var mail = localStorage.getItem("useremail");
	var uname = mail ? mail.substring(0,mail.indexOf('@')): null;
	$scope.updates  = uname ? $firebaseArray(new Firebase("https://sodews.firebaseio.com/updates/"+uname)):[];

	$scope.isLoggedIn = function(){
		return !!uname;
	};
}]);




/*
$.getJSON( getListOfChildIdsForDonor, function( data ) {
		$.each( data, function( key, value ) {
			
		  	console.log( key + ": " + value );
		  	var childId = value;
			var getChild = "https://sodews.firebaseio.com/childs/"+childId+".json";
			$.getJSON( getChild, function( data ) {
				$scope.childs.push(data);
			});

		});

		
	});
*/