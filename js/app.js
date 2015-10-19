var shoutOut = angular.module('ShoutOut',['ngRoute','socket.service','ngSanitize','btford.socket-io','ngMaterial']);

shoutOut.config(function($mdThemingProvider){
	$mdThemingProvider.definePalette('notASuckyPalette', {
    '50': 'FFFFFF',
    '100': '0066FF',
    '200': '0066FF',
    '300': '0066FF',
    '400': '0066FF',
    '500': '0066FF',
    '600': '0066FF',
    '700': '0066FF',
    '800': '0066FF',
    '900': '0066FF',
    'A100': '0066FF',
    'A200': '0066FF',
    'A400': '0066FF',
    'A700': '0066FF',
	})
	$mdThemingProvider.theme('default')
    .primaryPalette('green')
    .backgroundPalette('notASuckyPalette',{
    	'hue-1':'50'
    })
    .warnPalette('blue')

});
shoutOut.run(['$rootScope','$http','$mdSidenav','$mdMedia',function($rootScope,$http,$mdSidenav,$mdMedia){

	$rootScope.$watch(function(){return $mdMedia('gt-md');}, function(lrg){
			$rootScope.lrg = lrg;
	});

	$rootScope.location = {
      lat:null,
      lon:null
    };
    $rootScope.rangeObj = {
    	range:360
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