'use strict';

/**
 * @ngdoc function
 * @name smartPointViewsApp.controller:LlamadaNotasCtrl
 * @description
 * # LlamadaNotasCtrl
 * Controller of the smartPointViewsApp
 */
angular.module('smartPointViewsApp')
  .controller('LlamadaNotasCtrl',['$scope',function ($scope) {
      $scope.modalShown=false;
      $scope.imprimirTexto=function() {
          $scope.modalShown=!$scope.modalShown;
      };
      $scope.miTexto = "";
      $scope.showkeyboardPanel=true;
      $scope.hideKeyboard=function() {
          $scope.showkeyboardPanel = !$scope.showkeyboardPanel;
      };
}]);
