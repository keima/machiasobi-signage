"use strict";

angular.module('myApp.controller')
  .value("PlaceCtrlImpl", function ($scope, myMoment, Calendar, calendarId, delay, placeName) {
    $scope.isMarquee = false;
    $scope.item = {
      title: placeName,
      delay: null,
      message: null
    };
    $scope.events = [];

    $scope.$on(delay.BROADCAST_ID, function () {
      var resp = delay.getData(); // broadcastでデータ渡した方がいい気もする
      $scope.item.delay =   resp.delay;
      $scope.item.message = resp.message;

      $scope.isMarquee = false;
      var time = myMoment.subtract(resp.delay, "minutes");

      Calendar.getTodayData(calendarId, time)
        .then(function (_result) {
          $scope.events = _result;
          $scope.isMarquee = true;
        });
    });

  })
  .controller("ShinmachiPlaceCtrl", function (PlaceCtrlImpl, $scope, myMoment, Calendar, CalendarId, ShinmachiDelay) {
    PlaceCtrlImpl($scope, myMoment, Calendar, CalendarId.SHINMACHI, ShinmachiDelay, "新町橋東公園");
  })
  .controller("RyogokuPlaceCtrl", function (PlaceCtrlImpl, $scope, myMoment, Calendar, CalendarId, RyogokuDelay) {
    PlaceCtrlImpl($scope, myMoment, Calendar, CalendarId.RYOGOKU, RyogokuDelay, "両国橋西公園");
  })
  .controller("BizanPlaceCtrl", function (PlaceCtrlImpl, $scope, myMoment, Calendar, CalendarId, BizanDelay) {
    PlaceCtrlImpl($scope, myMoment, Calendar, CalendarId.BIZAN, BizanDelay, "眉山林間ステージ");
  })
;