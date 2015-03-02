var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
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
      console.log(data + '\n');
      datos = datos + data;
    });
  }


});

var llamar = function(numero){
  gsmEntel.write("atd"+numero+";\r\n");
  initEstadoDeLlamada();
};

var colgar = function(){
  gsmEntel.write("ath \r\n");
};

function initEstadoDeLlamada(){
    var llamadaContestada = false;
    var interval = setInterval(function () {
    	gsmEntel.write("at+clcc \r\n");
    	console.log(datos);
    	var index = datos.indexOf("+CLCC:");
    	var estado = datos.charAt(index+11);
	if(estado == 0){
	  console.log("llamada contestada");
	  llamadaContestada = true;
	  clearInterval(interval);
	}
    	datos = datos.substring(index+6,datos.length);
    },500);
    
}

module.exports.llamar = llamar
module.exports.colgar = colgar
