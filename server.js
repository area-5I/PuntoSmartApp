var express = require('express');
var socketio = require('socket.io').listen(1337);
var models = require('./models/serialManager');
var app = express();


app.use(express.static(__dirname + '/public'));

app.listen(8085);
console.log("express running at port 8085");

socketio.sockets.on("connection",function(socket){

  socket.on("llamar",function(numero){
    console.log("llamando al numero %s",numero);
    setTimeout(function(){
        socketio.sockets.emit("LlamadaContestada");
    },5000);

  });

  socket.on("holaMundo",function(){
      console.log("hola mundo");
  });

});
