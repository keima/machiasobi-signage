'use strict';

angular.module("myApp.filter", [])
  .filter("htmlTrusted", function ($sce) {
    return function (content) {
      return $sce.trustAsHtml(content);
    }
  })
  .filter("abs", function(){
    return function(content){
      return Math.abs(content);
    }
  })
;