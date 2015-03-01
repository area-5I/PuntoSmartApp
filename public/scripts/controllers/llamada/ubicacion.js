'use strict';

/**
 * @ngdoc function
 * @name smartPointViewsApp.controller:LlamadaUbicacionCtrl
 * @description
 * # LlamadaUbicacionCtrl
 * Controller of the smartPointViewsApp
 */
angular.module('smartPointViewsApp')
  .controller('LlamadaUbicacionCtrl',['$scope','$timeout',function ($scope,$timeout) {
      $scope.animacion="animate";
      $timeout(function() {
          $scope.animacion="";
      },3000);
  }]);
