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
            url: '/dashboard',
            templateUrl: 'app/page/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'vm'
          })
          .state('page', {
            abstract: true,
            url: '/page',
            template: '<div ui-view class="fade-in-up"></div>'
          })
          .state('page.article', {
            url: '/article/:craft_id',
            templateUrl: 'app/page/article.html',
            controller: 'ArticleCtrl',
            controllerAs: 'vm'
          })
          .state('page.jadeLife', {
            url: '/jadeLife/:craft_id',
            templateUrl: 'app/page/jadeLife.html',
            controller: 'JadeLifeCtrl',
            controllerAs: 'vm'
          })

      }]
    );

})();
