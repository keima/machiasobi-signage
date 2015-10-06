"use strict";

angular.module('myApp.service')
  .factory("Weather", function($rootScope, $http, $timeout, MachiRest){
    var BROADCAST_ID = "manager.broadcast.weather";
    var storage = {};
    var updatedAt = moment(1);

    function fetch() {
      return MachiRest.all("weather").get('360010')
        .then(function(result){
          if (updatedAt.isBefore(result.publicTime)) {
            storage = result;
            updatedAt = moment(result.publicTime);

            $timeout(function(){
              $rootScope.$broadcast(BROADCAST_ID);
            }, 5000);

          }
        }, function(reason){
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
        return _.cloneDeep(storage)
      }
    }
  })
;
