'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;

  router.get('admin', '/admin', controller.admin.index);
  // router.redirect(/^\/admin\/([\w-._]+\/{0,1})+/, '/admin', 302);
  router.get(/^\/admin\/([\w-._]+\/{0,1})+/, controller.admin.index);
  require('./router/api')(app);
  router.get('install', '/install', controller.install.index);
  router.post('loginin', '/login/in', app.oAuth2Server.token())
  router.get('loginout', '/login/out', controller.login.out)

  // 门户展示
  router.get('/app/index', controller.home.index);
  router.get('/app/column/:id', controller.home.column);
  router.get('/app/article/:id', controller.home.article);
  router.redirect('/', '/app/index', 302);
  router.redirect('/column/:id', '/app/columns/:id', 302);
  router.redirect('/article/:id', '/app/article/:id', 302);
};