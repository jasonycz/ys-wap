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
  vm.data={
    studioid: $stateParams.studioid,
    craftid: $stateParams.craftid,
    type: $stateParams.type
  }

  vm.items = [];

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

  api.wap.showall({
    params: {
      studioid: vm.data.studioid
    }
  }).then(function (res) {
    if (res.data.errNo === 0 && res.data.result.length > 0) {
      vm.items = res.data.result;
      //滑块

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
  vm.data={
    studioid: $stateParams.studioid,
    craftid: $stateParams.craftid,
    type: $stateParams.type||1
  }

  vm.article = {};
  api.wap.show({
    params: {
      type: $stateParams.type||1,
      studioid: vm.data.studioid,
      craftid: vm.data.craftid
    }
  }).then(function (res) {
    if (res.data.errNo != 0) {
      return;
    }
    vm.article = res.data.result[0];

  });

  //console.log('ArticleCtrl');
}

/**
 * 时间轴
 */
function JadeLifeCtrl($stateParams, api) {
  var vm = this;
  vm.data={
    studioid: $stateParams.studioid,
    craftid: $stateParams.craftid,
    type: $stateParams.type||2
  }
  vm.timeLine = {};
  api.wap.show({
    params: {
      type: vm.data.type,
      studioid: vm.data.studioid,
      craftid: vm.data.craftid
    }
  }).then(function (res) {
    if (res.data.errNo != 0) {
      return;
    }
    vm.timeLine = res.data.result.timeline;

  });

  //console.log('JadeLifeCtrl');
}


