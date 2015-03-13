'use strict';

/**
 * @ngdoc function
 * @name smartPointViewsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smartPointViewsApp
 */
angular.module('smartPointViewsApp')
  .controller('MainCtrl',['$scope','changeColorHeader','$log','$timeout',function ($scope,changeColorHeader,$log,$timeout) {
    $scope.reposo='init';
    $scope.potency=[1,2,3,4];
    changeColorHeader.setColor('inicioHeader');
    $scope.headerColor = function() {
        return changeColorHeader.getColor();
    };
    $scope.blurry=function() {
        return changeColorHeader.getBlurry();
    };
    $timeout(function(){
        //$scope.reposo="initReposo";
        $scope.changePosition='change';
    },10000);
    $timeout(function(){
        $scope.reposo='initReposo';
        $scope.changePosition='';
    },4950);
    $timeout(function(){
        $scope.potency.pop();
    },2000);
    $timeout(function(){
        $scope.potency.pop();
    },4000);
    $timeout(function(){
        $scope.potency.push(3);
    },6000);
    $timeout(function(){
        $scope.potency.push(4);
    },8000);
}]);
