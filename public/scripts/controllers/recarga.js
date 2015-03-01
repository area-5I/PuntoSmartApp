'use strict';

/**
 * @ngdoc function
 * @name smartPointViewsApp.controller:RecargaCtrl
 * @description
 * # RecargaCtrl
 * Controller of the smartPointViewsApp
 */
angular.module('smartPointViewsApp')
  .controller('RecargaCtrl', ['$scope','changeColorHeader',function ($scope,changeColorHeader) {
    changeColorHeader.setColor('recargasHeader');
  }]);
