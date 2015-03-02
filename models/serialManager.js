var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var server = require('../server')
var sleep = require('sleep');
var datos = "";

var gsmEntel = new SerialPort('/dev/ttyS3',{
  baudrate: 9600,
  parser: serialport.parsers.readline('\n')
},false);

var coin = new SerialPort('/dev/ttyS2',{
  baudrate: 9600
},false);

var printer = new SerialPort('/dev/ttyS1',{
  baudrate: 19200
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

//apertura del puerto serial del tragamonedas
coin.open(function(error){
  if(error){
    console.log("no se pudo abrir el puerto del tragamonedas");
  }else{
    console.log("tragamonedas ok");
    coin.on("data",function(data){
      coinProcess(data);
    });
  }
});

printer.open(function(error){
  if(error){
    console.log("no se pudo abrir el puerto de la impresora");
  }else{
    console.log("impresora ok");

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
    console.log("no carrier");
    server.socketio.sockets.emit("LlamadaTerminada");
  }
}

function coinProcess(data){
  var char = "" + data;
  switch(char.charCodeAt()){
    case 97:
          console.log("monto ingresado: " + 0.20);
          var value = 0.20;
          server.socketio.emit('IngresoMoneda',value);
          break;
    case 98:
          console.log("monto ingresado: " + 0.50);
          var value = 0.50;
          server.socketio.emit('IngresoMoneda',value);
          break;
    case 99:
          console.log("monto ingresado: " + 5);
          var value = 5;
          server.socketio.emit('IngresoMoneda',value);
          break;
    case 65:
          console.log("monto ingresado: " + 1);
          var value = 1;
          server.setMonto(value);
          server.socketio.emit('IngresoMoneda',value);
          break;
    case 66:
          console.log("monto ingresado: " + 2);
          var value = 2;
          server.setMonto(value);
          server.socketio.emit('IngresoMoneda',value);
          break;
    case 67:
          console.log("monto ingresado: " + 0.10);
          var value = 0.10;
          server.socketio.emit('IngresoMoneda',value);
          break;
    default :
          console.log("dato no procesado");
          break;
  }
}

var imprimirNota = function(nota){
  printer.write(nota+"/r/n");
  printer.write(10);
  printer.write(10);
  printer.write(10);
  printer.write(10);
}


module.exports.llamar = llamar;
module.exports.colgar = colgar;
module.exports.imprimirNota = imprimirNota;
