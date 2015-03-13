var express = require('express');
var socketio = require('socket.io').listen(1337);
var models = require('./models/serialManager');
var app = express();
var monto = 0;

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
      socketio.sockets.emit("FijarSaldo",monto);
  });

  socket.on("CalcularSegundos",function(){
      var segundos = monto * 60;
      socketio.sockets.emit("FijarSegundos",segundos);
  });


  socket.on("ImprimirNota",function(texto){
    console.log(texto);
    models.imprimirNota(texto);
  });

  socket.on("RecargaEntel",function(numero,monto){
    models.recargaEntel(numero,monto);
  });

  socket.on("RecargaViva",function(numero,monto){
    models.recargaViva(numero,monto);
  });

  socket.on("RecargaTigo",function(numero,monto){
    models.recargaTigo(numero,monto);
  });

});

var sumarMonto = function(mnt){
  monto = monto + mnt;
};

var restarMonto = function(mnt){
  monto = monto - mnt;
  socketio.sockets.emit("FijarSaldo",-mnt);
};


module.exports.socketio = socketio;
module.exports.sumarMonto = sumarMonto;
module.exports.restarMonto = restarMonto;
