(function () {
  'use strict';

  angular.module('app')
    .controller('AppCtrl', ['$scope', '$rootScope', '$document', 'appConfig', 'api', AppCtrl]) 

  function AppCtrl($scope, $rootScope, $document, appConfig, api) {
    var vm = this;

    $scope.pageTransitionOpts = appConfig.pageTransitionOpts;
    $scope.main = appConfig.main;
    $scope.color = appConfig.color;
    $rootScope.app.loading = false;

    //分享

    var shareJs = 'http://101.201.198.27/wap/shares';

    api.wap
      .sharesdk()
      .then(function (res) {
        $(document.body).append(res.data);
      })

  }

})();
