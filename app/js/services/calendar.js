'use strict';

angular.module('myApp.calendar',[])
  .factory('CalendarRest', function (Restangular) {
    return Restangular.withConfig(function (config) {
      config.setBaseUrl('https://www.googleapis.com/calendar/v3/calendars');
      config.setDefaultRequestParams({
        key: "AIzaSyCgK3kr9bdc_Qv_SnSJTxAcS1npBGqyRgw"
      });
    });
  }).service('Calendar', function(CalendarRest) {
    /**
     * calendarIdの指定時刻から今日の終わりまでのイベント(終日イベントは除く)を取得する
     * @param calId calendar id
     * @param time moment-ed time
     */
    function getTodayData(calId, time) {
      var timeMin = time.clone(),
          timeMax = time.clone().endOf('day');

      return CalendarRest.all(calId).get('events', {
        orderBy: 'startTime',
        singleEvents: true,
        timeZone: 'Asia/Tokyo',
        timeMin: timeMin.format(),
        timeMax: timeMax.format(),
        maxResults: 10
      }).then(function (result) {
        var list = [];
        for (var i = 0; i < result.items.length; i++) {
          var item = result.items[i];

          // 終日イベントは除外する
          if (!_.isUndefined(item.start.date)) {
            continue;
          }

          // 1個目がtimeの範囲内にないときは未実施オブジェクトを挿入する
          if (i == 0 && time.isBefore(item.start.dateTime)) {
            list.push({
              summary: "【イベント準備中】"
            });
          }

          list.push(item);

          if (list.length == 3) {
            break;
          }
        }
        return list;
      })
    }

    return {
      getTodayData: getTodayData
    }
  })
;
