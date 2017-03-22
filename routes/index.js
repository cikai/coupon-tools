var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'image-map-tools'
  };

  await ctx.render('index', {
  });
})
module.exports = router;
