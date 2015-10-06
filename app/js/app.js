"use strict";

angular.module('myApp',[
  'ngAnimate',
  'ngCookies',
  'ngMessages',
  'ngSanitize',
  'ngTouch',
  'ui.router',
  'restangular',
  'jmpress',
  'simpleMarquee',

  'myApp.constant',
  'myApp.service',
  'myApp.controller',
  'myApp.filter',
  'myApp.calendar'
])
  .run(function(SignageManager){
    SignageManager.fetch();
  })
;