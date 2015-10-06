'use strict';
/**
 * @name simpleMarquee
 *
 * @description
 * simepleMarquee module provides jquery-marquee functionality for angular.js apps.
 * Attributes for custom marquee:
 * duration: time that marquee will run
 * scroll: toggle scroll
 *
 */
angular.module('simpleMarquee', []).directive('simpleMarquee', function ($timeout, simpleMarqueeHelper) {
  return {
    restrict: 'A',
    scope: true,
    compile: function (tElement, tAttrs) {
      var content = tElement.children();
      var $element = $(tElement);

      var outerHtml = tElement.html();
      $(tElement).empty();
      tElement.append('<div class="js-marquee" style="float:left;">' + outerHtml + "　　" + '</div>');
      var $item = $element.find('.js-marquee');

      $item.clone().css('display', 'none').appendTo($element);

      //wrap both inner elements into one div
      $element.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');
      return {
        post: function (scope, element, attrs) {
          //direction, duration,
          var $element = $(element);
          var $item = $element.find('.js-marquee:first');
          var $marquee = $element.find('.js-marquee-wrapper');
          var $cloneItem = $element.find('.js-marquee:last');
          var duplicated = false;

          var containerWidth = parseInt($element.width());
          var itemWidth = parseInt($item.width());
          var defaultOffset = 20;
          var duration = 3000;
          var scroll = false;
          var animationCssName = '';
          var marqueeName = null;
          var animationName = "simpleMarquee";

          function calculateWidthAndHeight () {
            containerWidth = parseInt($element.width());
            itemWidth = parseInt($item.width());
            if (itemWidth > containerWidth) {
              duplicated = true;
            } else {
              duplicated = false;
            }

            if (duplicated) {
              $cloneItem.show();
            } else {
              $cloneItem.hide();
            }

            //$element.height($item.height());
          }

          function _objToString (obj) {
            var tabjson = [];
            for (var p in obj) {
              if (obj.hasOwnProperty(p)) {
                tabjson.push(p + ':' + obj[p]);
              }
            }
            tabjson.push();
            return '{' + tabjson.join(',') + '}';
          }
          function calculateAnimationDuration (newDuration) {

            var result = (itemWidth + containerWidth) / containerWidth * newDuration / 1000;
            if (duplicated) {
              result = result / 2;
            }
            return result;
          }

          function getAnimationPrefix () {
            var elm = document.body || document.createElement('div');
            var domPrefixes = ['webkit', 'moz', 'O', 'ms', 'Khtml'];
            var vendor;

            for (var i = 0; i < domPrefixes.length; i++) {
              if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                vendor = domPrefixes[i].toLowerCase();
                break;
              }
            }

            if (angular.isUndefined(vendor)) {
              return "";
            } else {
              return "-" + vendor + "-";
            }
          }

          function createKeyframe (number) {
            var vendor = getAnimationPrefix();

            var margin = itemWidth;
            // if (duplicated) {
            // 	margin = itemWidth
            // } else {
            // 	margin = itemWidth + containerWidth;
            // }
            var keyframeString = '@' + vendor + 'keyframes ' + animationName + number;
            var css = {
              'margin-left': -(margin) + 'px'
            };
            var keyframeCss = keyframeString + '{ 100%' + _objToString(css) + '}';
            var $styles = $('style');

            //Now add the keyframe animation to the head
            if ($styles.length !== 0) {
              //Bug fixed for jQuery 1.3.x - Instead of using .last(), use following
              $styles.filter(":last").append(keyframeCss);
            } else {
              $('head').append('<style>' + keyframeCss + '</style>');
            }
          }

          function destroyKeyframe(number) {
            var $styles = $('style');
            if ($styles.length == 0) {
              return;
            }

            //var vendor = getAnimationPrefix();
            //var pattern = new RegExp("@" + vendor + "keyframes " + animationName + number + ".*?}}");
            //var replaced = $styles.text().replace(pattern, ""); // remove animation
            //$styles.text(replaced);
          }

          function stopAnimation () {
            $marquee.css('margin-left', 0);
            if (animationCssName != '') {
              var cssValue = $marquee.css(animationCssName);
              var number = cssValue.replace(/simpleMarquee(\d+).*/, '$1');
              $marquee.css(animationCssName, '');
              destroyKeyframe(number);
            }
          }


          function createAnimationCss (number) {
            var vendor = getAnimationPrefix();
            var time = calculateAnimationDuration(duration);
            animationCssName = vendor + 'animation';
            var cssValue = animationName + number + ' ' + time + 's 0s linear infinite';
            $marquee.css(animationCssName, cssValue);
            if (duplicated) {
              $marquee.css('margin-left', 0);
            } else {
              var margin = containerWidth + defaultOffset;
              $marquee.css('margin-left', margin);
            }

          }

          function animate () {
            //create css style
            //create keyframe
            calculateWidthAndHeight();
            var number = Math.floor(Math.random() * 1000000);
            createKeyframe(number);
            createAnimationCss(number);
          }

          scope.$watch(attrs.scroll, function (scrollAttrValue) {
            scroll = scrollAttrValue;
            recalculateMarquee();
          });

          function recalculateMarquee () {
            if (scroll) {
              animate();
            } else {
              stopAnimation();
            }
          }

          var timer;
          scope.$on('recalculateMarquee', function (event, data) {
            console.log('receive recalculateMarquee event');
            if (timer) {
              $timeout.cancel(timer);
            }
            timer = $timeout(function () {
              recalculateMarquee();
            }, 500);

          });

          scope.$watch(attrs.duration, function (durationText) {
            switch (durationText) {
              case 'Slow':
                duration = 16000;
                break;
              case 'Normal':
                duration = 8000;
                break;
              case 'Fast':
                duration = 1500;
                break;
              default:
                if (angular.isNumber(+durationText)) {
                  duration = parseInt(durationText, 10);
                } else {
                  duration = 16000;
                }
                break;
            }
            if (scroll) {
              animate();
            }
          });


        }
      }
    }
  };
}).factory('simpleMarqueeHelper', function ($rootScope) {
  return {
    recalculateMarquee: function () {
      $rootScope.$broadcast('recalculateMarquee');
    }
  }
});