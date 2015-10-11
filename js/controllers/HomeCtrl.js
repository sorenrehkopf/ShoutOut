shoutOut.controller('HomeCtrl',['$scope','$rootScope','socket','$http',function($scope,$rootScope,socket,$http){
	// console.log('heeeyyy!!')
	$scope.yeah = "HEEEEY!!!"
	$scope.posts = [];
  $scope.newPosts = 0;
  $scope.offset = 0;
  $scope.button = 'button-light';
    navigator.geolocation
      .getCurrentPosition(
      	function (position) {
        $rootScope.location.lat = position.coords.latitude;
        $rootScope.location.lon = position.coords.longitude;
        $rootScope.locSetTime = new Date();
      }, function(err) {
        console.log(err);
      });
  $scope.getPosts = function(){
    if(!$rootScope.location.lon || !$rootScope.location.lat) return;
     return $http({
        url:'http://shoutshout.herokuapp.com/api/posts/'+
        $rootScope.location.lon+
        '/'+$rootScope.location.lat+
        '/'+$rootScope.range+
        '/'+$scope.offset
      }).then(function(data){
          console.log(data,$rootScope.range);
          if($scope.offset > 0){
          for(i=0;i<data.data.length;i++){
          $scope.posts.push(data.data[i])
          }
          }else{
            $scope.posts = data.data
          }
          $scope.button = 'button-light'
          $scope.newPosts = 0;
          if(data.data.length === 10){
            $scope.moar = true;
          }else{
            $scope.moar = false;
          };
      });
  };  
  $scope.setOff = function(off){
    $scope.offset = off;
  };
  socket.on('new post',function(post){
    if((post.location.lat>=$rootScope.location.lat - $rootScope.range) &&
     (post.location.lat<=$rootScope.location.lat + $rootScope.range)&&
     (post.location.lon>=$rootScope.location.lon - $rootScope.range)&&
     (post.location.lon<=$rootScope.location.lon + $rootScope.range)){
    $scope.newPosts = $scope.newPosts +1
    $scope.button = 'button-calm'
    }
  })
     $rootScope.$watchCollection('location',$scope.getPosts)
}]);