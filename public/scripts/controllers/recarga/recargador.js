'use strict';

/**
 * @ngdoc function
 * @name smartPointViewsApp.controller:RecargaRecargadorCtrl
 * @description
 * # RecargaRecargadorCtrl
 * Controller of the smartPointViewsApp
 */
angular.module('smartPointViewsApp')
  .controller('RecargaRecargadorCtrl',['$scope','$stateParams','$timeout',function ($scope,$stateParams,$timeout) {

      $scope.empresaId = $stateParams.empresaId;
      $scope.successShow = false;
      $scope.loadShow = false;
      $scope.nocreditShow = false;
      $scope.moneda=0;
      $scope.numero="";
      
      $scope.marcar=function(teclaPulsada) {
        $scope.numero=$scope.numero.concat(teclaPulsada);
      }
      
      $scope.borrar=function() {
        $scope.numero=$scope.numero.slice(0,$scope.numero.length-1);
      }
      
      $scope.ingresoMoneda = function ingresoMoneda(cantidad) {
          $scope.moneda += cantidad;
          $scope.ingresandomoneda="active";
          $timeout(function(){
            $scope.ingresandomoneda="";
          },500);
      }
      $scope.recargar=function() {
        $scope.successShow=true;
        $timeout(function(){
            $scope.successShow=false;
            $scope.loadShow=true;
        },2000);
        $timeout(function(){
            $scope.loadShow=false;
            $scope.nocreditShow=true;
        },4000);
        $timeout(function(){
            $scope.nocreditShow=false;
        },6000);
      };
      //Testing functionality
      $timeout(function(){
          $scope.ingresoMoneda(1);
      },4000);
      $timeout(function(){
          $scope.ingresoMoneda(2);
      },8000);
  }]);
