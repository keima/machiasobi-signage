"use strict";

angular.module('myApp.service')
  .value("TrafficImpl", function($rootScope, MachiRest, $timeout, trafficName, direction) {
    var BROADCAST_ID = "manager.broadcast.traffic." + trafficName + "." + direction;
    var updatedAt = null;
    var storage = {};

    function fetch () {
      return MachiRest.all('traffic').all(trafficName).get(direction)
        .then(function (result) {
          storage = result;
          updatedAt = moment();
          $rootScope.$broadcast(BROADCAST_ID);
        }, function (reason) {
          if (_.isEmpty(storage)) {
            $timeout(fetch, 5000); // 5秒後にフェッチ
          }
        });
    }

    return {
      BROADCAST_ID: BROADCAST_ID,
      fetch: fetch,
      getUpdatedAt: function () {
        return updatedAt
      },
      getData: function () {
        return storage
      }
    };
  })
  .factory("RopewayInboundTraffic", function(TrafficImpl, $rootScope, MachiRest, $timeout) {
    return TrafficImpl($rootScope, MachiRest, $timeout, "ropeway", "inbound");
  })
  .factory("RopewayOutboundTraffic", function(TrafficImpl, $rootScope, MachiRest, $timeout) {
    return TrafficImpl($rootScope, MachiRest, $timeout, "ropeway", "outbound");
  })

  .factory("BusInboundTraffic", function(TrafficImpl, $rootScope, MachiRest, $timeout) {
    return TrafficImpl($rootScope, MachiRest, $timeout, "bus", "inbound");
  })
  .factory("BusOutboundTraffic", function(TrafficImpl, $rootScope, MachiRest, $timeout) {
    return TrafficImpl($rootScope, MachiRest, $timeout, "bus", "outbound");
  })

  .factory("MuseumTraffic", function (TrafficImpl, $rootScope, MachiRest, $timeout) {
    return TrafficImpl($rootScope, MachiRest, $timeout, "museum", "inbound");
  })
;