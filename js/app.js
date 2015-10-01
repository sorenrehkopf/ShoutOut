var shoutOut = angular.module('ShoutOut',['ngRoute','socket.service','ngSanitize','btford.socket-io']);

shoutOut.run(['$rootScope','$http',function($rootScope,$http){

	$rootScope.location = {
      lat:null,
      lon:null
    };
    $rootScope.range = 0.0006;
    $rootScope.locSetTime = new Date();
    $rootScope.first;
    $rootScope.last;
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
      }, function(err) {
        // error
      });
      

}]);

shoutOut.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){

	$locationProvider.hashPrefix('!');

	$routeProvider
	.when('/',{
		templateUrl:'views/home.html',
		controller:'HomeCtrl'
	})

}]);