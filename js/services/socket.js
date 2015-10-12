angular.module('socket.service', [])

.factory('socket', function(socketFactory) {

  var myIoSocket = io.connect('https://shoutshout.herokuapp.com');

    mySocket = socketFactory({
      ioSocket: myIoSocket
    });  

    return mySocket;

});