'use strict';

/**
 * @ngdoc function
 * @name smartPointViewsApp.controller:LlamadaNotasCtrl
 * @description
 * # LlamadaNotasCtrl
 * Controller of the smartPointViewsApp
 */
angular.module('smartPointViewsApp')
  .controller('LlamadaNotasCtrl',['$scope','socket',function ($scope,socket) {
      $scope.modalShown=false;
      $scope.miTexto = "";
      $scope.imprimirTexto=function() {
          $scope.modalShown=!$scope.modalShown;
          socket.emit("ImprimirNota",$scope.miTexto);
      };

      $scope.showkeyboardPanel=true;
      $scope.hideKeyboard=function() {
          $scope.showkeyboardPanel = !$scope.showkeyboardPanel;
      };
}]);
