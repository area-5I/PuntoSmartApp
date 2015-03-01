'use strict';

/**
 * @ngdoc function
 * @name smartPointViewsApp.controller:EmergenciaCtrl
 * @description
 * # EmergenciaCtrl
 * Controller of the smartPointViewsApp
 */
angular.module('smartPointViewsApp')
  .controller('EmergenciaCtrl',['$scope','changeColorHeader',function ($scope,changeColorHeader) {
    changeColorHeader.setColor('emergenciaHeader');
  }]);
