
$(function(){

	onLoad();
	//uploadOnline();
});

pawsApp.controller('indexCtrl', ["$scope", "$rootScope", "$firebaseObject","$firebaseArray","$location", function($scope,$rootScope, 
$firebaseObject, $firebaseArray, $location) {
  $scope.username = localStorage.getItem("username");
  $scope.userimage = localStorage.getItem("userimage");

		
	$scope.isLoggedIn = function(){
    if(!!$scope.username) {
      $(".header").removeClass("hide");
      $(".notif").removeClass("hide");
      $(".backstretch").addClass("hide");
    }
		return !!$scope.username;
	};
}]);

function onSuccess(googleUser) {
	var profile = googleUser.getBasicProfile();
  console.log('Logged in as: ' + profile.getName());
	console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

    // Put the object into storage
  localStorage.setItem('username', profile.getName());
  localStorage.setItem('useremail',profile.getEmail());
  localStorage.setItem('userimage', profile.getImageUrl());
	
	window.location.href = 'http://localhost:8080/#home';
	window.location.reload();
}
    
function onFailure(error) {
  console.log(error);
}

function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'https://www.googleapis.com/auth/plus.login',
    'width': 230,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
		'onfailure': onFailure
  });
}

$('.logout').on('click',function(){
	signOut();
});

function onLoad() {
	gapi.load('auth2', function() {
    gapi.auth2.init();
  });


}

function signOut() {
	console.log('Inside signout');
	var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
		localStorage.removeItem('username');
		localStorage.removeItem('useremail');
		localStorage.removeItem('userimage');
		window.location.href = 'http://localhost:8080';
  });
}




