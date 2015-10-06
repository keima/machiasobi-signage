"use strict";

angular.module('myApp.service', [])
  .factory('MachiRest', function (Restangular, API_ENDPOINT) {
    return Restangular.withConfig(function (config) {
      config.setBaseUrl(API_ENDPOINT + '/api/v1');
    });
  })
;