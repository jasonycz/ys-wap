angular
  .module('app.page')
  .controller('DashboardCtrl', ['api', DashboardCtrl])
  .controller('ArticleCtrl', ['api', ArticleCtrl])
  .controller('JadeLifeCtrl', ['api', JadeLifeCtrl])
  ;

/**
 * 面板
 */
function DashboardCtrl(api) {

  var vm = this;
  vm.items = [];

  api.wap.showall({
    params: {
      studioid: 1
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
function ArticleCtrl(api) {
  var vm = this;
  vm.article = {};
  api.wap.show({
    params: {
      type: 1,
      studioid: '',
      craftid: ''
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
function JadeLifeCtrl(api) {
  var vm = this;
  vm.timeLine = {};

  console.log('JadeLifeCtrl');
}


