var shoutOut = angular.module('ShoutOut',['ngRoute','socket.service','ngSanitize','btford.socket-io','ngMaterial']);

shoutOut.config(function($mdThemingProvider){

	$mdThemingProvider.theme('default')
	.backgroundPalette('blue',{
		'default':'300',
		'hue-1':'100'
	})
    .primaryPalette('teal')
    .accentPalette('red')

});
shoutOut.run(['$rootScope','$http','$mdSidenav',function($rootScope,$http,$mdSidenav){

	$rootScope.location = {
      lat:null,
      lon:null
    };
    $rootScope.rangeObj = {
    	range:0.0006
    };
    $rootScope.locSetTime = new Date();
    $rootScope.first;
    $rootScope.last;
    $rootScope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };
    $http({
      url:'http://randomword.setgetgo.com/get.php'
    }).then(function(data){
      $rootScope.first = data.data;
    });
    $http({
      url:'http://randomword.setgetgo.com/get.php'
    }).then(function(data){
      $rootScope.last = data.data;
    });
    navigator.geolocation
      .getCurrentPosition(
      	function (position) {
        $rootScope.location.lat = position.coords.latitude;
        $rootScope.location.lon = position.coords.longitude;
        $rootScope.locSetTime = new Date();
        console.log(position);
      }, function(err) {
        // error
        console.log(err);
      });
      

}]);

shoutOut.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){

	$locationProvider.hashPrefix('!');

	$routeProvider
	.when('/',{
		templateUrl:'views/home.html',
		controller:'HomeCtrl'
	})
	.when('/shout',{
		templateUrl:'views/shout.html',
		controller:'ShoutCtrl'
	})
	.when('/post/:postId',{
		templateUrl:'views/post.html',
		controller:'PostCtrl'
	})
	.when('/settings',{
		templateUrl:'views/settings.html',
		controller:'SettingsCtrl'
	})

}]);