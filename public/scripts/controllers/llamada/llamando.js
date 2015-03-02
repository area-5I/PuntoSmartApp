'use strict';

/**
 * @ngdoc function
 * @name smartPointViewsApp.controller:LlamadaLlamandoCtrl
 * @description
 * # LlamadaLlamandoCtrl
 * Controller of the smartPointViewsApp
 */
angular.module('smartPointViewsApp')
  .controller('LlamadaLlamandoCtrl',['$scope','$location','$stateParams','$log','$interval','$timeout','socket',function ($scope,$location,$stateParams,$log,$interval,$timeout,socket) {
    $scope.tiempo=0;
    socket.emit("CalcularSegundos");
    socket.on('LlamadaContestada',function(){
      $scope.contadorFlag = true;
      $scope.msgLlamando = false;
      socket.emit("holaMundo");
    });

    socket.on('LlamadaTerminada',function(){
      $location.path('/llamadas');
    });

    socket.on("FijarSegundos",function(segundos){
          $scope.tiempo=segundos;
    });

    var alto;
    $scope.numero = $stateParams.numero;
    $log.debug($stateParams);
    $scope.contar = function(){
        if ( angular.isDefined(alto) ) return;

        alto = $interval(function(){
            if($scope.tiempo>0) {
                $scope.tiempo=$scope.tiempo -1;
                if($scope.tiempo<6) {
                    $scope.tiempoAgotado="alerta";
                    $timeout(function(){
                        $scope.tiempoAgotado="";
                    },500);
                }
            } else {
                $scope.altoContar();
            }
        },1000);
    };

    $scope.altoContar = function(){
        if (angular.isDefined(alto)) {
            $interval.cancel(alto);
            alto = undefined;
        }
    };

    $scope.contadorFlag = false;
    $scope.msgLlamando = true;

    $scope.llamadaContestada = function(){
        $scope.contadorFlag = true;
        $scope.msgLlamando = false;
    }

    $scope.colgar = function() {
      socket.emit('colgar');
    };

    $scope.$on('$destroy', function() {
        $scope.altoContar();
    });

    $log.debug($scope.numero);
    $log.debug($scope.contador);
    $scope.contar();
}]);
