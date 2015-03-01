'use strict';

/**
 * @ngdoc function
 * @name smartPointViewsApp.controller:AyudaBuscarCtrl
 * @description
 * # AyudaBuscarCtrl
 * Controller of the smartPointViewsApp
 */
angular.module('smartPointViewsApp')
  .controller('AyudaBuscarCtrl',['$scope','$stateParams',function ($scope,$stateParams) {
    $scope.servicio=$stateParams.servicio;
    $scope.showKeyboardpanel=false;
    $scope.statesShow=false;
    $scope.serviceShow=false;
    $scope.search={name:""};
    $scope.colorBackground="";
    if($scope.servicio=="codigos") {
        $scope.servicios=[
        {name:"Andorra",code:"ad",number:77},
        {name:"United Arab Emirates",code:"ae",number:3333},
        {name:"Afghanistan",code:"af",number:333},
        {name:"Antigua And Barbuda",code:"ag",number:777},
        {name:"Anguilla",code:"ai",number:333},
        {name:"Albania",code:"al",number:444},
        {name:"Armenia",code:"am",number:222},
        {name:"Netherlands Antilles",code:"an",number:444},
        {name:"Angola",code:"ao",number:333},
        {name:"Argentina",code:"ar",number:333},
        {name:"American Samoa",code:"as",number:222},
        {name:"Austria",code:"at",number:555},
        {name:"Australia",code:"au",number:222},
        {name:"Aruba",code:"aw",number:333},
        {name:"Aaland",code:"ax",number:777},
        {name:"Azerbaijan",code:"az",number:333},
        {name:"Bosnia And Herzegovina",code:"ba",number:333},
        {name:"Basque",code:"basque",number:222},
        {name:"Barbados",code:"bb",number:222},
        {name:"Bangladesh",code:"bd",number:333},
        {name:"Belgium",code:"be",number:222},
        {name:"Burkina Faso",code:"bf",number:222},
        {name:"Bulgaria",code:"bg",number:777},
        {name:"Bahrain",code:"bh",number:111},
        {name:"Burundi",code:"bi",number:666},
        {name:"Benin",code:"bj",number:222},
        {name:"Bermuda",code:"bm",number:111},
        {name:"Brunei",code:"bn",number:555},
        {name:"Bolivia",code:"bo",number:888},
        {name:"Brazil",code:"br",number:222},
        {name:"Bahamas",code:"bs",number:111},
        {name:"Chile",code:"cl",number:222},
        {name:"Cameroon",code:"cm",number:888},
        {name:"China",code:"cn",number:222},
        {name:"Colombia",code:"co",number:222}
        ];
    } else if($stateParams.servicio=='restaurantes') {
        $scope.icon="restaurant";
        $scope.colorBackground="darkorangeService";
        $scope.servicios=[
        {name:"Dumbo",number:4702020,direccion:"Av. Ayacucho #440"},
        {name:"Globos",number:4702020,direccion:"Av. Ayacucho #440"},
        {name:"Elis",number:4702020,direccion:"Av. Ayacucho #440"},
        {name:"Doña jacinta",number:4702020,direccion:"Av. Ayacucho #440"},
        {name:"Don Pepe",number:4702020,direccion:"Av. Ayacucho #440"},
        {name:"Chaqueno",number:4702020,direccion:"Av. Ayacucho #440"},
        {name:"El manantial",number:4702020,direccion:"Av. Ayacucho #440"},
        {name:"Aroma",number:4702020,direccion:"Av. Ayacucho #440"},
        {name:"El Gordo",number:4702020,direccion:"Av. Ayacucho #440"},
        {name:"King Don",number:4702020,direccion:"Av. Ayacucho #440"},
        {name:"CasaBlanca",number:4702020,direccion:"Av. Ayacucho #440"},
        {name:"Pollos kikiriki",number:4702020,direccion:"Av. Ayacucho #440"},
        {name:"Pollos Kokoroko",number:4702020,direccion:"Av. Ayacucho #440"},
        {name:"El Rey",number:4702020,direccion:"Av. Ayacucho #440"},
        {name:"Wistupiku",number:4702020,direccion:"Av. Ayacucho #440"}
        ];
    } else if($stateParams.servicio=='mecanicos') {
        $scope.icon="mecanico";
        $scope.colorBackground="tealService";
        $scope.servicios=[
        {name:"Don Luis",number:79732456,direccion:"Av. Circuvalacion #567"},
        {name:"El Choco",number:79732456,direccion:"Av. Circuvalacion #567"},
        {name:"Hnos Vargas",number:79732456,direccion:"Av. Circuvalacion #567"},
        {name:"Don German",number:79732456,direccion:"Av. Circuvalacion #567"},
        {name:"El Chascas",number:79732456,direccion:"Av. Circuvalacion #567"},
        {name:"Don Fernando",number:79732456,direccion:"Av. Circuvalacion #567"},
        {name:"Lupe",number:79732456,direccion:"Av. Circuvalacion #567"},
        {name:"El Gringo",number:79732456,direccion:"Av. Circuvalacion #567"}
        ];

    } else if($stateParams.servicio=='taxis') {
        $scope.icon="taxi";
        $scope.colorBackground="yellowService";
        $scope.servicios=[
        {name:"Ciudad Jardin",number:4787989,direccion:"Av. Panamericana #122"},
        {name:"San Pedro",number:4787989,direccion:"Av. Panamericana #122"},
        {name:"Bolivar",number:4787989,direccion:"Av. Panamericana #122"},
        {name:"Amancayas",number:4787989,direccion:"Av. Panamericana #122"},
        {name:"Kantuta",number:4787989,direccion:"Av. Panamericana #122"},
        {name:"Express",number:4787989,direccion:"Av. Panamericana #122"},
        {name:"Teleferico",number:4787989,direccion:"Av. Panamericana #122"},
        {name:"kochalita",number:4787989,direccion:"Av. Panamericana #122"}
        ];
    };
    $scope.hideKeyboard=function() {
        $scope.showKeyboardpanel=false;
    };
    $scope.togglekeyboard=function() {
        $scope.showKeyboardpanel=!$scope.showKeyboardpanel;
    };
    $scope.deleteX=function() {
        $scope.search.name="";
        $scope.deleteShow="false";
    };
    $scope.selectItem=function(index) {
        $scope.selectedItem=$scope.servicios[index];
        if($scope.servicio=="codigos") {
            $scope.statesShow=true;
        } else {
            $scope.serviceShow=true;
        }
    };
    $scope.itemSelected=-1;
    $scope.selectService=function(index) {
        if($scope.itemSelected==index){
            $scope.itemSelected=-1;
        } else {
            $scope.itemSelected=index;
        }
    };
    $scope.animateService=function(index) {
        if(index==$scope.itemSelected)
            return "information";
        else
            return "";
    }
  }]);
