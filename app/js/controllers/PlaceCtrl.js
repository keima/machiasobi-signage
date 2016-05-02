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
      var time = myMoment().subtract(resp.delay, "minutes");

      Calendar.getTodayData(calendarId, time)
        .then(function (_result) {
          $scope.events = _result;
          $scope.isMarquee = true;
        });
    });

  })
  .controller("ShinmachiPlaceCtrl", function (PlaceCtrlImpl, $scope, myMoment, Calendar, PlacesValue, ShinmachiDelay) {
    PlaceCtrlImpl($scope, myMoment, Calendar, PlacesValue.SHINMACHI.calendarId, ShinmachiDelay, PlacesValue.SHINMACHI.name);
  })
  .controller("RyogokuPlaceCtrl", function (PlaceCtrlImpl, $scope, myMoment, Calendar, PlacesValue, RyogokuDelay) {
    PlaceCtrlImpl($scope, myMoment, Calendar, PlacesValue.RYOGOKU.calendarId, RyogokuDelay, PlacesValue.RYOGOKU.name);
  })
  .controller("BizanPlaceCtrl", function (PlaceCtrlImpl, $scope, myMoment, Calendar, PlacesValue, BizanDelay) {
    PlaceCtrlImpl($scope, myMoment, Calendar, PlacesValue.BIZAN.calendarId, BizanDelay, PlacesValue.BIZAN.name);
  })

  .controller("Awagin1PlaceCtrl", function (PlaceCtrlImpl, $scope, myMoment, Calendar, PlacesValue, AwaginDelay) {
    PlaceCtrlImpl($scope, myMoment, Calendar, PlacesValue.AWAGIN1.calendarId, AwaginDelay, PlacesValue.AWAGIN1.name);
  })
  .controller("Awagin2PlaceCtrl", function (PlaceCtrlImpl, $scope, myMoment, Calendar, PlacesValue, Awagin2Delay) {
    PlaceCtrlImpl($scope, myMoment, Calendar, PlacesValue.AWAGIN2.calendarId, Awagin2Delay, PlacesValue.AWAGIN2.name);
  })

;