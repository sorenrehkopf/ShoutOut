shoutOut.controller('ShoutCtrl', function($scope, $http, $httpParamSerializerJQLike,$window,$rootScope,socket) {

  $scope.shout ={
    post:'',
    poster:$rootScope.first +' '+ $rootScope.last,
    location:{
      lon:$rootScope.location.lon,
      lat:$rootScope.location.lat
    }
  };

  $scope.newShout = function(){
    if (!$rootScope.location.lon ||!$rootScope.location.lat){
      alert("Looks like your location isn't set. Try updating it in settings!")
    }else{
    return $http({
      method: 'POST',
      url:'http://shoutshout.herokuapp.com/api/posts',
      data: $httpParamSerializerJQLike({post:$scope.shout.post,location:$scope.shout.location,poster:$scope.shout.poster}),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(data){
      socket.emit('new post',{location:$scope.shout.location})
      $scope.shout.post = '';
      $window.location.href = '#!/post/'+data.data._id
    });
    };
  };

})