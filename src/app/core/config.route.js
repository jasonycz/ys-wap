(function () {
  'use strict';

  angular
    .module('app')
    .config([
      '$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
          .when('/', '/dashboard')
          .otherwise('/dashboard');

        $stateProvider
          .state('dashboard', {
            url: '/dashboard/:studioid',
            templateUrl: 'app/page/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'vm'
          })
          .state('wap', {
            abstract: true,
            url: '/wap',
            template: '<div ui-view class="fade-in-up"></div>'
          })
          .state('wap.show', {
            url: '/show/:studioid/:craftid/2',
            templateUrl: 'app/page/article.html',
            controller: 'ArticleCtrl',
            controllerAs: 'vm'
          })
          .state('wap.jadeLife', {
            url: '/show/:studioid/:craftid/1',
            templateUrl: 'app/page/jadeLife.html',
            controller: 'JadeLifeCtrl',
            controllerAs: 'vm'
          })

      }]
    );

})();
