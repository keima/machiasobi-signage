"use strict";

angular.module('myApp.controller')
  .controller("BusCtrl", function ($scope, BusInboundTraffic, BusOutboundTraffic) {
    $scope.inbound = $scope.outbound = {
      delay: null,
      message: ""
    };

    $scope.$on(BusInboundTraffic.BROADCAST_ID, function () {
      var resp = BusInboundTraffic.getData();
      $scope.inbound.delay = resp.Waiting;
      $scope.inbound.message = resp.Message;
    });

    $scope.$on(BusOutboundTraffic.BROADCAST_ID, function () {
      var resp = BusOutboundTraffic.getData();
      $scope.outbound.delay = resp.Waiting;
      $scope.outbound.message = resp.Message;
    });
  })
;