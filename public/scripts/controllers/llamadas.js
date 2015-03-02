'use strict';

/**
 * @ngdoc function
 * @name smartPointViewsApp.controller:LlamadasCtrl
 * @description
 * # LlamadasCtrl
 * Controller of the smartPointViewsApp
 */
angular.module('smartPointViewsApp')
  .controller('LlamadasCtrl',['$scope','$location','changeColorHeader','$timeout','socket',function ($scope, $location,changeColorHeader,$timeout,socket) {
      changeColorHeader.setColor('llamadasHeader');
      $scope.numero='';
      $scope.moneda=0;

      socket.emit("PedirSaldo");
      socket.on("IngresoMoneda", function(monto){
          $scope.ingresoMoneda(monto);
      });

      socket.on("FijarSaldo", function(saldo){
          $scope.ingresoMoneda(saldo);
      });

      $scope.marcar=function(teclaPulsada) {
          $scope.numero=$scope.numero.concat(teclaPulsada);
      };
      $scope.borrar=function() {
          $scope.numero=$scope.numero.slice(0,$scope.numero.length-1);
      };
      $scope.llamarNumero=function() {
        $location.path('/llamada/llamando/'+$scope.numero);
        socket.emit('llamar',$scope.numero);
      };
      $scope.ingresoMoneda = function ingresoMoneda(cantidad) {
          $scope.moneda += cantidad;
          $scope.ingresandomoneda='active';
          $timeout(function(){
            $scope.ingresandomoneda='';
          },500);
      };
      //Testing functionality
      /*
      $timeout(function(){
          $scope.ingresoMoneda(1);
      },4000);
      $timeout(function(){
          $scope.ingresoMoneda(2);
      },8000);*/
  }]);
