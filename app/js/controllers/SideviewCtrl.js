"use strict";

angular.module('myApp.controller')
  .value("SideviewImpl", function (thisObj, $scope, myMoment, Calendar, places, delayService) {
    thisObj.item = {
      title: places.name,
      delay: null
    };

    thisObj.isMarquee = true;
    thisObj.event = [];

    function fetchCalendar (delay) {
      thisObj.isMarquee = false;

      //var time = moment.subtract(resp.delay, "minutes");
      var time = myMoment().subtract(delay, "minutes");
      console.log(time);

      Calendar.getTodayData(places.calendarId, time)
        .then(function (_result) {
          thisObj.event = _result[0];
          thisObj.isMarquee = true;
        });
    }

    if (!delayService) {
      // when undefined
      fetchCalendar(0);
    } else {
      $scope.$on(delayService.BROADCAST_ID, function () {
        var resp = delayService.getData();
        thisObj.item.delay = resp.delay;
        fetchCalendar(resp.delay);
      });
    }

    thisObj.click = function () {
      var delay = 0;
      switch (thisObj.item.delay) {
        case 0:
          delay = 30;
          break;
        case 30:
          delay = 60;
          break;
        case 60:
          delay = -30;
          break;
      }
      thisObj.item.delay = delay;
    }
  })
  .controller("ShinmachiSideviewCtrl", function (SideviewImpl, $scope, myMoment, Calendar, PlacesValue, ShinmachiDelay) {
    SideviewImpl(this, $scope, myMoment, Calendar, PlacesValue.SHINMACHI, ShinmachiDelay)
  })
  .controller("RyogokuSideviewCtrl", function (SideviewImpl, $scope, myMoment, Calendar, PlacesValue, RyogokuDelay) {
    SideviewImpl(this, $scope, myMoment, Calendar, PlacesValue.RYOGOKU, RyogokuDelay)
  })
  .controller("BizanSideviewCtrl", function (SideviewImpl, $scope, myMoment, Calendar, PlacesValue, BizanDelay) {
    SideviewImpl(this, $scope, myMoment, Calendar, PlacesValue.BIZAN, BizanDelay)
  })

  .controller("CinemaSideviewCtrl", function (SideviewImpl, $scope, myMoment, Calendar, PlacesValue, CinemaDelay) {
    SideviewImpl(this, $scope, myMoment, Calendar, PlacesValue.CINEMA, CinemaDelay)
  })
  .controller("AwaginSideviewCtrl", function (SideviewImpl, $scope, myMoment, Calendar, PlacesValue, AwaginDelay) {
    SideviewImpl(this, $scope, myMoment, Calendar, PlacesValue.AWAGIN, AwaginDelay)
  })
  .controller("CorneSideviewCtrl", function (SideviewImpl, $scope, myMoment, Calendar, PlacesValue, CorneDelay) {
    SideviewImpl(this, $scope, myMoment, Calendar, PlacesValue.CORNE, CorneDelay)
  })

  .controller("PoppoSideviewCtrl", function (SideviewImpl, $scope, myMoment, Calendar, PlacesValue) {
    SideviewImpl(this, $scope, myMoment, Calendar, PlacesValue.POPPO)
  })

;