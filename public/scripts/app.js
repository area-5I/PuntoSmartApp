'use strict';

/**
 * @ngdoc overview
 * @name smartPointViewsApp
 * @description
 * # smartPointViewsApp
 *
 * Main module of the application.
 */
angular
  .module('smartPointViewsApp', [
    'ngAnimate',
    'ui.router',
    'btford.socket-io'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('llamadas', {
        url:'/llamadas',
        templateUrl: 'views/llamadas.html',
        controller: 'LlamadasCtrl'
      })
      .state('recarga', {
        url:'/recarga',
        templateUrl: 'views/recarga.html',
        controller: 'RecargaCtrl'
      })
      .state('emergencia', {
        url:'/emergencia',
        templateUrl: 'views/emergencia.html',
        controller: 'EmergenciaCtrl'
      })
      .state('emergencia.llamando', {
        url:'/llamando/:tipoEmergencia',
        templateUrl: 'views/emergencia/llamando.html',
        controller: 'EmergenciaLlamandoCtrl'
      })
      .state('ayuda', {
        url:'/ayuda',
        templateUrl: 'views/ayuda.html',
        controller: 'AyudaCtrl'
      })
      .state('ayuda.buscar', {
          url:'/bucar/:servicio',
          templateUrl: 'views/ayuda/buscar.html',
          controller: 'AyudaBuscarCtrl'
      })
      .state('recarga.recargador', {
        url:'/:empresaId',
        templateUrl: 'views/recarga/recargador.html',
        controller: 'RecargaRecargadorCtrl'
      })
      .state('llamando', {
        url:'/llamada/llamando/:numero',
        templateUrl: 'views/llamada/llamando.html',
        controller: 'LlamadaLlamandoCtrl'
      })
      .state('llamando.notas', {
        url:'/notas',
        templateUrl: 'views/llamada/notas.html',
        controller: 'LlamadaNotasCtrl'
      })
      .state('llamando.juegos', {
        url:'/juegos',
        templateUrl: 'views/llamada/juegos.html'
      })
      .state('llamando.ubicacion', {
        url:'/ubicacion',
        templateUrl: 'views/llamada/ubicacion.html',
        controller: 'LlamadaUbicacionCtrl'
      })
      .state('llamando.hextris', {
        url:'/hextris',
        templateUrl: 'views/llamada/hextris.html'
      });
  })
    .service('changeColorHeader', function () {
        var property = 'inicioHeader';
        var blurry='';
        return {
            getColor:function () {
                return property;
            },
            setColor:function (value) {
                property = value;
                if(value==='inicioHeader') {
                    blurry='';
                } else {
                    blurry='withBlurry';
                }
            },
            getBlurry:function () {
                return blurry;
            }
        };
    })
    .directive('myCurrentTime', function($timeout, dateFilter) {
        return function(scope, element) {
            var timeoutId;
            function updateTime() {
                element.text(dateFilter(new Date(),'HH:mm:ss'));
            }
            function updateLater() {
                timeoutId = $timeout(function() {
                    updateTime();
                    updateLater();
                }, 1000);
            }
            element.bind('$destroy', function() {
                $timeout.cancel(timeoutId);
            });
            updateLater();
        };

    })
    .directive('modalView', function() {
        return {
            restrict: 'E',
            scope: {
                show: '='
            },
            replace: true,
            transclude: true,
            link: function(scope, element, attrs) {
                scope.tipemodal = attrs.tipemodal;
                scope.dialogStyle = {};
                if (attrs.width) {
                    scope.dialogStyle.width = attrs.width;
                }
                if (attrs.height) {
                    scope.dialogStyle.height = attrs.height;
                }
                scope.hideModal = function() {
                        scope.show = false;
                    };
                },
                templateUrl: 'views/templates/modalview.html'
            };
    })
    .directive('keyboard', function() {
        return {
            restrict: 'E',
            scope: {
                inputText: '=inputText',
                showkeyboardPanel : '=showKeyboardPanel'
            },
            link: function(scope, element, attrs) {
                scope.showkeyboard = true;
                scope.changeKeyboard = function() {
                    scope.showkeyboard = !scope.showkeyboard;
                };
                scope.uppercase = false;
                scope.shiftActivado = false;
                scope.teclar = function(t1) {
                    if(scope.shiftActivado) {
                        scope.inputText += t1.toUpperCase();
                        scope.shift();
                    } else {
                        scope.inputText=scope.inputText+t1;
                    }
                };

                scope.shift = function() {
                    scope.shiftActivado = !scope.shiftActivado;
                    if(scope.shiftActivado && scope.uppercase){
                        scope.casse = '';
                    } else if(scope.shiftActivado && !scope.uppercase) {
                        scope.casse = 'uppercase';
                    }
                    else if(!scope.shiftActivado && scope.uppercase){
                        scope.casse = 'uppercase';
                    } else {
                        scope.casse = '';
                    }
                };

                scope.capslock = function() {
                    scope.uppercase = !scope.uppercase;
                    scope.casse = scope.uppercase ? 'uppercase' : '';
                };

                scope.borrar = function(){
                    scope.inputText = scope.inputText.substr(0, scope.inputText.length - 1);
                };
                scope.executeExec=function() {
                    scope.execute.exec();
                };
                if(attrs.typeExecute === 'find') {
                    scope.execute={
                        name: 'buscar',
                        exec:function() {
                            scope.showkeyboardPanel = false;
                        }
                    };
                } else {
                    scope.execute = {
                        name: 'Intro',
                        exec:function(){
                            scope.teclar('\n');
                        }
                    };
                }
            },
            templateUrl: 'views/templates/keyboard.html'
        };
    })
    .factory('socket', function (socketFactory) {
        return socketFactory({
          prefix: 'foo~',
          ioSocket: io.connect('http://192.168.1.2:1337')
        });
    });
