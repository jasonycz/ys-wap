(function () {
  'use strict';

  angular.module('app')
    .controller('AppCtrl', ['$scope', '$rootScope','$document', 'appConfig', AppCtrl]) // overall control

  function AppCtrl($scope, $rootScope, $document, appConfig) {
    var vm=this;

    $scope.pageTransitionOpts = appConfig.pageTransitionOpts;
    $scope.main = appConfig.main;
    $scope.color = appConfig.color;

    $rootScope.app.loading = false;


  }

})();
