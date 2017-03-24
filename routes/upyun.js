var router = require('koa-router')();
var UpYun = require('upyun');

router.get('/upload', function (ctx, next) {
  var upyun = new UpYun('repo', 'operator', 'password', 'v0.api.upyun.com', {
    apiVersion: 'v2'
  });
  upyun.usage(function(err, result) {
    console.log(result);
  });
  ctx.body = "";
});

module.exports = router;
