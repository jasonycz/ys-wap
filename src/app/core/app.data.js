
var app = app || {};

app.data={
  studio:null
};

app.loadjs = function (url, cb) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement("script");
  script.type = 'text/javascript';
  script.src = url;
  if (typeof cb === 'function') {

    if (script.readyState) {  //IE
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" ||
          script.readyState == "complete") {
          script.onreadystatechange = null;
          cb();
        }
      };
    } else {  //Others
      script.onload = function () {
        cb();
      };
    }

    script.onerror = function (err) {
      console.error('出错了,脚本-' + err.target.src + '-加载失败。');
      cb(false);
    }
  }
  head.appendChild(script);
};




/**
 * 分享
 */
window.shareData = {
  "imgUrl": "分享图片url",
  "timeLineLink": "当前页面的url",
  "sendFriendLink": "当前页面的url",
  "weiboLink": "当前页面的url",
  "tTitle": "分享标题",
  "tContent": "分享内容"
};
//


