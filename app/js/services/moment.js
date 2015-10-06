"use strict";

angular.module('myApp.service')
  .service('myMoment', function ($window) {
    if (!$window.hasOwnProperty('moment')) {
      throw new ReferenceError(
        'moment: window.moment is undefined, please make sure you\'ve loaded moment.js script tag'
      );

      return;
    }

    var time = "2015-05-03 10:00:00+09:00";
    //return $window.moment(time);
    return $window.moment();
  });