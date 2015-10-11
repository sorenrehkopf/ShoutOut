shoutOut.controller('PostCtrl',function($scope,$http,$routeParams, $httpParamSerializerJQLike,$rootScope,socket){
  $scope.post = {}
  $scope.getPost = function(){
   return $http({
      url:'http://shoutshout.herokuapp.com/api/posts/'+$routeParams.postId
    }).then(function(data){
        $scope.post = data.data;
        // console.log($scope.post);
    });
  };
  $scope.getPost();

  $scope.comment ={
    comment:'',
    poster:$rootScope.first +' '+ $rootScope.last
  };

  $scope.newComment = function(){
    console.log($scope.comment.comment);
    return $http({
      method: 'POST',
      url:'http://shoutshout.herokuapp.com/api/posts/'+$routeParams.postId,
      data: $httpParamSerializerJQLike({comment:$scope.comment.comment,poster:$scope.comment.poster}),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(data){
      $scope.comment.comment = ""
      socket.emit('new comment')
    });
  };
  socket.on('new comment', function(){
    return $http({
        url:'http://shoutshout.herokuapp.com/api/posts/'+$routeParams.postId
      }).then(function(data){
          $scope.post.comments = data.data.comments;
      });
  })
})