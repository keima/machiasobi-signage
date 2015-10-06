"use strict";

angular.module('myApp.service')
  .factory("Steps", function($rootScope, $http, $timeout, MachiRest, API_ENDPOINT) {
    var BROADCAST_ID = "manager.broadcast.steps";
    var STEPS_URL = API_ENDPOINT + "/api/v1/steps";
    var updatedAt = moment(0);
    var storage = [];

    /**
     * 取得したデータと保有データを比較して、差があるかどうかを検査します
     * @param steps
     * @returns {boolean}
     */
    function slideIsModified(steps) {
      // storageの中身チェック
      if (_.isEmpty(storage)) {
        return true;
      }

      // 枚数チェック（変動があれば更新あり）
      if (storage.length != steps.length) {
        return true;
      }

      // タイムスタンプチェック
      if (updatedAt.isBefore(getLatestTime(steps))) {
        return true;
      }

      return false;
    }

    function getLatestTime(steps) {
      var time = moment(0);
      steps.forEach(function(step) {
        if (time.isBefore(step.updatedAt)) {
          time = moment(step.updatedAt);
        }
      });
      return time;
    }

    function fetch() {
      return MachiRest.all("steps").getList()
        .then(function(result) {
          if (slideIsModified(result.plain())) {
            storage = result.plain();
            updatedAt = getLatestTime(result);
            $rootScope.$broadcast(BROADCAST_ID);
          }
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
        return _.cloneDeep(storage)
      }
    };
  })
;