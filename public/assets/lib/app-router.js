'use strict';

// Declare app level module which depends on views, and components

var pawsApp = angular.module('pawsApp', [
  'ngRoute',
  'pawsApp.home',
  'pawsApp.profile',
	'pawsApp.reports',
	'pawsApp.shareToDonors',
	'pawsApp.adminDB'
]).directive('googleSignInButton', function() {
        return {
          scope: {
            buttonId: '@'
          },
          template: '<div></div>',
          link: function(scope, element, attrs) {
            var div = element.find('div')[0];
            div.id = attrs.buttonId;
            gapi.signin2.render(div.id, {
              'scope': 'https://www.googleapis.com/auth/plus.login',
              'width': 230,
              'height': 50,
              'longtitle': true,
              'theme': 'dark',
              'onsuccess': onSuccess,
          		'onfailure': onFailure
            }); //render a google button, first argument is an id, second options
          }
        };
      });

pawsApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: function(params) {
			return 'login.html';
		},
		controller: 'homeCtrl'
	}).
  otherwise({redirectTo: '/login.html'});
}]);
