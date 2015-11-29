'use strict';

var pawsApp = angular.module('pawsApp.shareToDonors', ['ngRoute','firebase']);

pawsApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shareToDonors', {
		templateUrl: '/assets/ng/shareToDonors.html',
    controller: 'shareToDonorsCtrl'
	});
}]);

pawsApp.controller('shareToDonorsCtrl', ["$scope", "$http",  function($scope, $http) {

    $scope.formatImage = function(imageLoc) {
        var img = new Image();
        img.src =  imageLoc.split('\\')[2];
        img.load = function () {
            var canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);
            var data = context.getImageData(x, y, img.width, img.height).data;
            localStorage.setItem('shareImage', data);
        }
    };

    $scope.shareBtnSubmit = function() {
        console.log('share buttn clicked', $('#filer_input').val());
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("wishMessage", $('#text-wish-msg').val());
            localStorage.setItem("requestMessage", $('#text-request-msg').val());
            $scope.formatImage($('#filer_input').val());
            $scope.uploadOnline();
        }
    };



    $scope.uploadOnline = function() {
        if (navigator.onLine) {
					
					$scope.admin = {};
					var mail = localStorage.getItem("useremail");
					var uname = mail ? mail.substring(0,mail.indexOf('@')): null;
					$scope.itemsRef = new Firebase("https://sodews.firebaseio.com/updates/"+uname);
					
					var reminderText = {"child-id": '', "text": localStorage.getItem('wishMessage'), "pic": '', "timestamp": '2015-11-29'};
					$scope.itemsRef.push(reminderText);
					$http.post("/uploadImage", 
                {
                    wishMessage: localStorage.getItem('wishMessage'),
                    requestMessage: localStorage.getItem('requestMessage'),
                    shareImage: localStorage.getItem('shareImage')
                },
                function (data, status) {
                    console.log('data', data);
                    console.log('status', status);
                    if (status === 'success') {
                        /**  localStorage.removeItem('wishMessage');
                         localStorage.removeItem('requestMessage');
                         localStorage.removeItem('shareImage'); **/
                    }
                }).success(function () {
									localStorage.removeItem('wishMessage');
                         localStorage.removeItem('requestMessage');
                         localStorage.removeItem('shareImage');
            }).error(function (error) {
                console.log(error);
            });
        }
    };

}]);
