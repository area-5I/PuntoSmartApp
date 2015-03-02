var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var server = require('../server')
var sleep = require('sleep');
var datos = "";

var gsmEntel = new SerialPort('/dev/ttyS3',{
  baudrate: 9600,
  parser: serialport.parsers.readline('\n')
},false);

gsmEntel.open(function(error){
  if(error){
    console.log("no se pudo abrir el puerto del dispositivo gsm Entel");
  }else{
    console.log("gsmEntel OK");
    gsmEntel.on("data",function(data){
      console.log(data + "");
      analizer(data);
    });
  }


});

var llamar = function(numero){
  gsmEntel.write("atd"+numero+";\r\n");
  gsmEntel.write("at+clcc");
};

var colgar = function(){
  gsmEntel.write("ath \r\n");
};

function analizer(data){
	var index = data.indexOf("+CLCC");
  var nocarrier = data.indexOf("NO CARRIER");
	if(index >= 0){
	var estado = data.charAt(index+11);
	if(estado != -1){
		console.log(index);
		console.log(estado);
		if(estado == 0){
			server.socketio.sockets.emit("LlamadaContestada");
			console.log("llamada contestada");
		}
		if(estado == 6){
			console.log("llamada terminada");
			server.socketio.sockets.emit("LlamadaTerminada");
		}
	}
	}
  if(nocarrier >= 0){
    server.socketio.sockets.emit("LlamadaTerminada");
  }
}

module.exports.llamar = llamar
module.exports.colgar = colgar
