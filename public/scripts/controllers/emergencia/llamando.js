'use strict';

/**
 * @ngdoc function
 * @name smartPointViewsApp.controller:EmergenciaLlamandoCtrl
 * @description
 * # EmergenciaLlamandoCtrl
 * Controller of the smartPointViewsApp
 */
angular.module('smartPointViewsApp')
  .controller('EmergenciaLlamandoCtrl',['$scope','$stateParams','$location','$interval','changeColorHeader',function ($scope,$stateParams,$location,$interval,changeColorHeader) {
      $scope.seleccionar=function(index){
          $scope.seleccion=index;
      }
      $scope.seleccionado=function(index){
          return $scope.seleccion==index;

        };
      $scope.tipoEmergencia=$stateParams.tipoEmergencia;
      $scope.emergencias={
        "hospital":[
            {nombre:"LOS OLIVOS",
                telefono:"4790932",
                direccion:"Av.America #456"},
            {nombre:"UNIVALLE",
                telefono:"4898893",
                direccion:"Av. Panamericana #654"},
            {nombre:"SAN PEDRO",
                telefono:"4565454",
                direccion:"Av. Tumusla #434"}],
        "bomberos":[
            {nombre:"SAR FAB",
                telefono:"4654343",
                direccion:"Av. Recoleta #344"},
            {nombre:"PRETORIANOS",
                telefono:"489892",
                direccion:"Av. Circunvalacion #233"},
            {nombre:"PEST CONTROL",
                telefono:"4356765",
                direccion:"Av. America #188"}],
        "policia":[
            {nombre:"FELCC",
                telefono:"4655655",
                direccion:"Av. Esteban Arce"},
            {nombre:"FELCV",
                telefono:"4777777",
                direccion:"Av. Independencia"},
            {nombre:"HOMICIDIOS",
                telefono:"4565555",
                direccion:"Av. Dominical"}]
      }
      $scope.llamar=function(index) {
            $location.path('/llamada/llamando/'+$scope.emergencias[$scope.tipoEmergencia][index].telefono);
      }
      $scope.llamandoClick=false;
      $scope.emergencia=function() {
            $scope.llamandoClick=true;
            changeColorHeader.setColor('llamadasHeader');
      }
      $scope.colgar=function() {
            $scope.llamandoClick=false;
            changeColorHeader.setColor("emergenciaHeader");
      }
  }]);
