angular
  .module('app.page')
  .controller('DashboardCtrl', ['$stateParams', 'api', DashboardCtrl])
  .controller('ArticleCtrl', ['$stateParams', 'api', ArticleCtrl])
  .controller('JadeLifeCtrl', ['$stateParams', 'api', JadeLifeCtrl])
  ;

/**
 * 面板
 */
function DashboardCtrl($stateParams, api) {

  var vm = this;

  app.data.studio = {
    studioid: $stateParams.studioid,
    craftid: $stateParams.craftid,
    type: $stateParams.type
  };

  vm.items = [];

  api.wap.showall({
    params: {
      studioid: app.data.studio.studioid
    }
  }).then(function (res) {
    if (res.data.errNo === 0 && res.data.result.length > 0) {
      vm.items = res.data.result;
      //滑块
      vm.swiperOptions = {
        data: [
          {
            imgUrl: 'images/assets/600_400-2.jpg',
            detailsUrl: ''
          },
          {
            imgUrl: 'images/assets/600_400-1.jpg',
            detailsUrl: ''
          }
        ],
        onSlideChangeStart: function (swiper) {
          //console.log(swiper);
        },
        onSlideChangeEnd: function (swiper) {
          //console.log(swiper);
        }
      }

    }
    else {
      alert('暂时没有结果');
    }
  });

  console.log('DashboardCtrl');
}

/**
 * 文章
 */
function ArticleCtrl($stateParams, api) {

  var vm = this;

  vm.article = {};
  api.wap.show({
    params: {
      type: $stateParams.type,
      studioid: $stateParams.studioid,
      craftid: $stateParams.craftid
    }
  }).then(function (res) {
    if (res.data.errNo != 0) {
      return;
    }
    vm.article = res.data.result;

  });

  console.log('ArticleCtrl');
}

/**
 * 时间轴
 */
function JadeLifeCtrl($stateParams, api) {
  var vm = this;

  app.data.studio = {
    type: $stateParams.type,
    studioid: $stateParams.studioid,
    craftid: $stateParams.craftid
  };

  vm.timeLine = {};
  api.wap.show({
    params: {
      type: $stateParams.type,
      studioid: $stateParams.studioid,
      craftid: $stateParams.craftid
    }
  }).then(function (res) {
    if (res.data.errNo != 0) {
      return;
    }
    vm.timeLine = res.data.result;

  });

  console.log('JadeLifeCtrl');
}


