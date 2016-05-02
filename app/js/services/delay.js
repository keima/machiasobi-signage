"use strict";

angular.module('myApp.service')
  .value("DelayImpl", function($rootScope, MachiRest, $timeout, placeName) {
    var BROADCAST_ID = "manager.broadcast.delay." + placeName;
    var updatedAt = null;
    var storage = {};

    function fetch() {
      return MachiRest.all('delay').get(placeName)
        .then(function(result) {
          storage = result;
          updatedAt = moment();
          $rootScope.$broadcast(BROADCAST_ID);
        }, function(reason) {
          if (_.isEmpty(storage)) {
            $timeout(fetch, 5000); // 5秒後にフェッチ
          }
        });
    }

    return {
      BROADCAST_ID: BROADCAST_ID,
      fetch: fetch,
      getUpdatedAt: function() {
        return updatedAt
      },
      getData: function() {
        return storage
      }
    };
  })
  /*
   * MEMO: ここに追加されたfactoryは signagemanager.js で fetch() されるようにすること
   */

  .factory("ShinmachiDelay", function($rootScope, MachiRest, $timeout, DelayImpl) {
    return DelayImpl($rootScope, MachiRest, $timeout, "shinmachi");
  })
  .factory("RyogokuDelay", function($rootScope, MachiRest, $timeout, DelayImpl) {
    return DelayImpl($rootScope, MachiRest, $timeout, "ryougoku");
  })
  .factory("BizanDelay", function($rootScope, MachiRest, $timeout, DelayImpl) {
    return DelayImpl($rootScope, MachiRest, $timeout, "bizan");
  })

  .factory("CinemaDelay", function($rootScope, MachiRest, $timeout, DelayImpl) {
    return DelayImpl($rootScope, MachiRest, $timeout, "cinema-entry");
  })

  .factory("AwaginDelay", function($rootScope, MachiRest, $timeout, DelayImpl) {
    return DelayImpl($rootScope, MachiRest, $timeout, "awagin");
  })
  .factory("Awagin2Delay", function($rootScope, MachiRest, $timeout, DelayImpl) {
    return DelayImpl($rootScope, MachiRest, $timeout, "awagin2");
  })

  .factory("CorneDelay", function($rootScope, MachiRest, $timeout, DelayImpl) {
    return DelayImpl($rootScope, MachiRest, $timeout, "corne");
  })
;