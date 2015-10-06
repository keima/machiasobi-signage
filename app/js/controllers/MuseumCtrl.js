"use strict";

angular.module('myApp.controller')
  .controller("MuseumCtrl", function ($scope, MuseumTraffic) {
    $scope.delay = null;
    $scope.message = "";

    $scope.$on(MuseumTraffic.BROADCAST_ID, function () {
      var resp = MuseumTraffic.getData();
      $scope.delay = resp.Waiting;
      $scope.message = resp.Message;
    });
  })
;