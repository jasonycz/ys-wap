angular
  .module('app.page')
  .controller('DashboardCtrl', [DashboardCtrl])
  .controller('ArticleCtrl', ['api', ArticleCtrl])
  .controller('JadeLifeCtrl', ['api', JadeLifeCtrl])
  ;

/**
 * 面板
 */
function DashboardCtrl() {

  var vm = this;

  vm.items = [
    {
      "craft_id": 2,
      "craft_name": "\u6d4b\u8bd5two",
      "describe": "sdffds",
      "img": {
        "url": "http:\/\/bbs.byr.cn\/att\/Travel\/0\/127173\/221526",
        "imgdesc": "test imgae"
      }
    }
  ];

  console.log('DashboardCtrl');
}

/**
 * 文章
 */
function ArticleCtrl(api) {
  var vm = this;
  vm.article = {
    "craft_id": 2,
    "craft_name": "\u6d4b\u8bd5two",
    "describe": "sdffds",
    "img": {
      "url": "http:\/\/bbs.byr.cn\/att\/Travel\/0\/127173\/221526",
      "imgdesc": "test imgae"
    }
  };

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


