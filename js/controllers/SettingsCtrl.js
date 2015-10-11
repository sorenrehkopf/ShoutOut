shoutOut.controller('SettingsCtrl', function($scope,$rootScope) {
  $scope.setTime = $rootScope.locSetTime;
  $scope.setRange = function(range){
    $rootScope.range = range
  }
  $scope.resetLocation = function(){
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
  }
});