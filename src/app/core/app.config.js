
angular
  .module('app.core')
  .factory('appConfig', [appConfig])
  .config(['$mdThemingProvider', mdConfig])
  .config(['$httpProvider', preAjax])//http拦截器
  .factory('api', ['$http', api])//api 接口定义
  .run(['$rootScope', init]);//


function init($rootScope) {
  //
  $rootScope.app = {
    loading: true,
    title: '工作室'
  };

}

function appConfig() {
  var pageTransitionOpts = [
    {
      name: 'Fade up',
      "class": 'animate-fade-up'
    }, {
      name: 'Scale up',
      "class": 'ainmate-scale-up'
    }, {
      name: 'Slide in from right',
      "class": 'ainmate-slide-in-right'
    }, {
      name: 'Flip Y',
      "class": 'animate-flip-y'
    }
  ];

  var main = {
    brand: '工作室',
    name: '',
    year: new Date().getFullYear(),
    layout: 'wide',                                 // 'boxed', 'wide'
    menu: 'vertical',                               // 'horizontal', 'vertical'
    isMenuCollapsed: false,                          // true, false
    fixedHeader: true,                              // true, false
    fixedSidebar: true,                             // true, false
    pageTransition: pageTransitionOpts[0],          // 0, 1, 2, 3... and build your own
    skin: 'bg-primary'
  };
  /*
   bg-white
   bg-dark
   bg-primary
   bg-success
   bg-info
   bg-warning
   bg-danger
   */

  var color = {
    primary: '#009688',
    success: '#8BC34A',
    info: '#00BCD4',
    infoAlt: '#7E57C2',
    warning: '#FFCA28',
    danger: '#F44336',
    text: '#3D4051',
    gray: '#EDF0F1'
  };

  return {
    pageTransitionOpts: pageTransitionOpts,
    main: main,
    color: color
  }
}

function mdConfig($mdThemingProvider) {
  var cyanAlt = $mdThemingProvider.extendPalette('cyan', {
    'contrastLightColors': '500 600 700 800 900',
    'contrastStrongLightColors': '500 600 700 800 900'
  });
  var lightGreenAlt = $mdThemingProvider.extendPalette('light-green', {
    'contrastLightColors': '500 600 700 800 900',
    'contrastStrongLightColors': '500 600 700 800 900'
  });

  $mdThemingProvider
    .definePalette('cyanAlt', cyanAlt)
    .definePalette('lightGreenAlt', lightGreenAlt);


  $mdThemingProvider.theme('default')
    .primaryPalette('teal', {
      'default': '500'
    })
    .accentPalette('cyanAlt', {
      'default': '500'
    })
    .warnPalette('red', {
      'default': '500'
    })
    .backgroundPalette('grey');
}

function api($http) {

  var baseUrl = location.protocol + '//' + location.hostname + '/api',
    api = {
      studio: {},
      wap: {}
    };

  /**
   * 手机端预览雕件
   * @param {int} craft_id 雕件id
   * @returns {*}
   */
  api.wap.show = function (data) {
    return $http.get(baseUrl + '/wap/show', data);
  };

  /**
   * 手机端预览所有发布作品
   * @returns {*}
   */
  api.wap.showall = function (data) {
    return $http.get(baseUrl + '/wap/showall', data);
  };

  /**
   * 手机端微信分享代码
   * @returns {*}
   */
  api.wap.sharesdk = function () {
    return $http.get(baseUrl + '/wap/sharesdk');
  };

  return api;

};


function preAjax($httpProvider) {

  var processAjax = function ($rootScope, toaster) {
    return {
      request: function (config) {

        //如果是请求api,就改成post

        //form 表单提交方式
        if (config.method === 'post') {
          //config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
          //config.headers['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
          //config.headers['Cache-Control']='no-cache';
          //config.headers['Pragma']='no-cache';

          $rootScope.$broadcast('preloader:active');
        }


        return config;
      },
      response: function (response) {

        //console.log(response);
        $rootScope.$broadcast('preloader:hide');

        return response;
      },
      responseError: function (response) {
        console.log(response);
        return response;
      }
    }
  };

  $httpProvider.defaults.withCredentials = true;//跨域带cookie
  $httpProvider.interceptors.push(['$rootScope', processAjax]);

}

