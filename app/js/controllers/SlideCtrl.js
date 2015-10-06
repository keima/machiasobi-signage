'use strict';

angular.module('myApp.controller')
  .controller("SlideCtrl", function($rootScope, $scope, $timeout, $interval, Steps, SignageManager, PartialsValue) {
    $scope.steps = [];
    $scope.currentId = 0;

    var overview = {
      id: "overview",
      data: {
        "duration": 5000,
        "x": 0,
        "y": 0,
        "z": -50,
        "scale": 5
      },
      type: 'html',
      description: "<img src='./image/logo.png' style='width: 60%;'>"
    };

    //var otherSideview = {
    //  id: "hogefuga",
    //  data: {
    //    //"duration": 5000,
    //    "x": 0,
    //    "y": -10000
    //    //"scale": 5
    //  },
    //  type: 'partial',
    //  partialPath: PartialsValue['ropeway']
    //};


    function rotateSlide() {
      var curId = $scope.currentId;
      curId++;
      if (curId == $scope.steps.length) {
        curId = 0;
      }
      $scope.currentId = curId;
      $rootScope.$broadcast("jmpress.selected." + curId);
    }

    function reverseSlide() {
      var curId = $scope.currentId;
      curId--;
      if (curId < 0) {
        curId = $scope.steps.length - 1;
      }
      $scope.currentId = curId;
      $rootScope.$broadcast("jmpress.selected." + curId);
    }

    $interval(rotateSlide, 10000);


    $scope.$on(Steps.BROADCAST_ID, function() {
      var resp = Steps.getData();
      resp.forEach(function(obj, i) {
        if (obj.type === "partial") {
          obj.partialPath = PartialsValue[obj.partialId];
        }

        obj.data = {
          "duration": 10000,
          r: 2000,
          phi: 360 / resp.length * i,
          rotate: 360 / resp.length * i
        }
      });
      resp.unshift(overview);
      //resp.push(otherSideview);
      $scope.steps = resp;
    });

    $scope.$on("jmpress.selected.0", function() {
      $timeout(function() {
        SignageManager.fetch();
      }, 1500);
    });

    $scope.keydownEvent = function($event) {

      switch ($event.keyCode) {
        case 37: // ←
        case 38: // ↑
          reverseSlide();
          break;
        case 39: // →
        case 40: // ↓
          rotateSlide();
      }
    }

  })
;