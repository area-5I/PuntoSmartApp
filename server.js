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
    models.llamar(numero);
  });

  socket.on("colgar",function(){
      console.log("llamada colgada");
      models.colgar();
  });

  socket.on("PedirSaldo",function(){
      socketio.sockets.emit("FijarSaldo",models.saldo);
  });


});

module.exports.socketio = socketio;
