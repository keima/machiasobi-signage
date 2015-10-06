"use strict";

angular.module('myApp.controller')
  .controller("TelopCtrl", function ($rootScope, $scope, $timeout, Weather) {
    $scope.marquee = false;
    $scope.message = "マチ★アソビ デジタルサイネージ 起動中・・・";

    $scope.click = function () {
      $rootScope.$broadcast(Weather.BROADCAST_ID);
    };

    $scope.$on(Weather.BROADCAST_ID, function () {
      var resp = Weather.getData();
      $scope.marquee = false;

      var T = {
        city: resp.location.city,
        desc: resp.description.text.replace(/[\n\r]/g, ""),
        genForecast: function (forecast) {
          var ret = forecast.dateLabel + "：" + forecast.telop;
          if (forecast.temperature.min !== null && forecast.temperature.max !== null) {
            ret += "（" + forecast.temperature.max.celsius + "℃/" + forecast.temperature.min.celsius + " ℃）";
          }

          return ret;
        }
      };

      var forecasts = "";
      resp.forecasts.forEach(function (forecast) {
        forecasts += T.genForecast(forecast) + "　";
      });

      $scope.message =
        "◇天気予報◇　" + T.city + "の天気" + "　" +
          // 予報
        forecasts + "　　" +
          // 概況
        "天気概況：" + T.desc + "　　　" +
          // コピーライト
        "データ提供：日本気象協会／API提供：Weather Hacks ©LINE Corporation"
      ;

      $timeout(function(){
        $scope.marquee = true;
      }, 5000);

    });
  })
;
