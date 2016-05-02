/**
 * 图片切换
 */
angular
  .module('app.page')
  .directive('uiSwiper', [
    '$rootScope', '$timeout', '$http',
    function ($rootScope, $timeout, $http) {
      return {
        restrict: 'A',
        scope: {
          uiSwiper: '&',
          uiSwiperCallback: '='
        },
        template: '<div class="swiper-wrapper">' +
        '<div class="swiper-slide" ng-repeat="item in data track by $index">' +
        '<a ng-href="{{ ::item.detailsUrl }}"><img ng-src="{{ ::item.imgUrl }}" alt=""></a>' +
        '</div>' +
        '</div>' +
        '<div class="swiper-pagination"></div>',
        link: function (scope, el, attrs) {
          var default_options,
            opts = {};
          scope.data = [];
          default_options = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            loop: true
          };
          opts = angular.extend(default_options, scope.uiSwiper);
          //if (scope.onSlideChangeStart) {
          //
          //}
          //if (scope.onSlideChangeEnd) {
          //
          //}
          if (scope.uiSwiper && scope.uiSwiper.url) {
            $http.get(scope.uiSwiper.url)
              .then(function (response) {
                scope.data = response.data;
              });
          }
          else {
            var watcher = scope.$watch(scope.uiSwiper, function (newVal) {
              if (newVal && angular.isArray(newVal.data)) {
                scope.data = newVal.data;
                $timeout(function () {
                  if (newVal.data.length > 1) {//大于一张图使用插件
                    new Swiper(el, opts);
                  }
                  angular.isFunction(scope.uiSwiperCallback) && scope.uiSwiperCallback();
                  watcher();//取消定时器
                }, 0);
              }
            });
          }
        }
      };
    }]);



