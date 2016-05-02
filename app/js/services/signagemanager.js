"use strict";

angular.module('myApp.service')
  .factory("SignageManager", function ($q,
                                       Steps,
                                       ShinmachiDelay, RyogokuDelay, BizanDelay,
                                       CinemaDelay, AwaginDelay, Awagin2Delay, CorneDelay,

                                       MuseumTraffic,
                                       RopewayInboundTraffic, RopewayOutboundTraffic,
                                       BusInboundTraffic, BusOutboundTraffic,

                                       Weather) {
    function fetch () {
      return Steps.fetch().then(function () {
        return $q.all([
          ShinmachiDelay.fetch(),
          RyogokuDelay.fetch(),
          BizanDelay.fetch(),

          CinemaDelay.fetch(),
          AwaginDelay.fetch(),
          Awagin2Delay.fetch(),
          CorneDelay.fetch(),

          MuseumTraffic.fetch(),
          RopewayInboundTraffic.fetch(),
          RopewayOutboundTraffic.fetch(),
          BusInboundTraffic.fetch(),
          BusOutboundTraffic.fetch(),

          Weather.fetch()
        ]);
      })
    }

    return {
      fetch: fetch
    };
  })
;