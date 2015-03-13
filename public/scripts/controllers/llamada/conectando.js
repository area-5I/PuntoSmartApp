'use strict';

/**
 * @ngdoc function
 * @name smartPointViewsApp.controller:LlamadaConectandoCtrl
 * @description
 * # LlamadaConectandoCtrl
 * Controller of the smartPointViewsApp
 */
angular.module('smartPointViewsApp')
  .controller('LlamadaConectandoCtrl',['$scope','$stateParams','$timeout','$location','socket',function ($scope,$stateParams, $timeout, $location, socket) {
      $scope.numero = $stateParams.numero;
      $scope.colgar = function() {
          socket.emit('colgar');
      };

      socket.on('LlamadaContestada',function(){
          $location.path('/llamada/llamando/'+$scope.numero);
          socket.emit("holaMundo");
      });
      socket.on('LlamadaTerminada',function(){
        $location.path('/llamadas');
      });
  }]);
