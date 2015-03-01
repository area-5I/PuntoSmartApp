var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

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
    });
    gsmEntel.write("at\n");
    llamar("44377592");
    initEstadoDeLlamada()
  }


});

var llamar = function(numero){
  gsmEntel.write("atd"+numero+";\n");
  initEstadoDeLlamada();
};

var colgar = function(){
  gsmEntel.write("ath\n");
};

function initEstadoDeLlamada(){
  setTimeout(function(){
    gsmEntel.write("at+glcc\n");
  },1000);
  setTimeout(function(){
    gsmEntel.write("at+glcc\n");
  },2000);
  setTimeout(function(){
    gsmEntel.write("at+glcc\n");
  },3000);
  setTimeout(function(){
    gsmEntel.write("at+glcc\n");
  },4000);
  setTimeout(function(){
    gsmEntel.write("at+glcc\n");
  },5000);
}

module.exports.llamar = llamar
module.exports.colgar = colgar
