

'use strict';

var pawsApp = angular.module('pawsApp.adminDB', ['ngRoute']);

pawsApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/adminDB', {
		templateUrl: '/assets/ng/adminDB.html',
    controller: 'adminDBCtrl'
	});
}]);

pawsApp.controller('adminDBCtrl', ["$scope","$rootScope", "$firebaseObject","$firebaseArray", function($scope,$rootScope,
			$firebaseObject, $firebaseArray) {

		$scope.admin = {};
		var mail = localStorage.getItem("useremail");
		var uname = mail ? mail.substring(0,mail.indexOf('@')): null;
		
    $scope.storeToDb = function() {
			console.log('asdf', $scope.admin.userName);
			$scope.itemsRef = new Firebase("https://sodews.firebaseio.com/updates/"+uname);
			var reminderText = {"child-id":$scope.admin.childId, "text": $scope.admin.reminder, "pic": '', "timestamp": '2015-11-29'};
			$scope.itemsRef.push(reminderText);
    }; 
	
}]);