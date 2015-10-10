"use strict";

angular.module('myApp.controller')
  .controller("RopewayCtrl", function ($scope, RopewayInboundTraffic, RopewayOutboundTraffic) {
    $scope.inbound = {
      delay: null,
      message: ""
    };
    $scope.outbound = {
      delay: null,
      message: ""
    };

    $scope.$on(RopewayInboundTraffic.BROADCAST_ID, function () {
      var resp = RopewayInboundTraffic.getData();
      $scope.inbound.delay = resp.Waiting;
      $scope.inbound.message = resp.Message;
    });

    $scope.$on(RopewayOutboundTraffic.BROADCAST_ID, function () {
      var resp = RopewayOutboundTraffic.getData();
      $scope.outbound.delay = resp.Waiting;
      $scope.outbound.message = resp.Message;
    });
  })
;