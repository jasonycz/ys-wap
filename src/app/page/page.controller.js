angular
  .module('app.page')
  .controller('DashboardCtrl', [DashboardCtrl])
  .controller('ArticleCtrl', ['$scope', ArticleCtrl])
  .controller('JadeLifeCtrl', [JadeLifeCtrl])
  ;

/**
 * 
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

function ArticleCtrl($scope) {

  console.log('ArticleCtrl');
}

function JadeLifeCtrl() {

  console.log('JadeLifeCtrl');
}


