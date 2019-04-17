module.exports = app => {
  // system base
  app.router.resources('settings', '/api/v1/settings', app.oAuth2Server.authenticate(), app.controller.api.settings)

  // upload files
  app.router.post('upload', '/api/v1/upload', app.oAuth2Server.authenticate(), app.controller.api.upload.upload)

  // user api
  app.router.resources('users', '/api/v1/users', app.oAuth2Server.authenticate(), app.controller.api.users)

  // usermodel api
  app.router.resources('usermodels', '/api/v1/usermodels', app.oAuth2Server.authenticate(), app.controller.api.userModels)

  // articlemodel api
  app.router.resources('modelfields', '/api/v1/modelfields', app.oAuth2Server.authenticate(), app.controller.api.modelFields)

  // articlemodel api
  app.router.resources('models', '/api/v1/models', app.oAuth2Server.authenticate(), app.controller.api.models)

  // column api
  app.router.resources('columns', '/api/v1/columns', app.oAuth2Server.authenticate(), app.controller.api.columns)

  // article api
  app.router.resources('articles', '/api/v1/articles', app.oAuth2Server.authenticate(), app.controller.api.articles)
  app.router.put('articlespublic', '/api/v1/articlepublic', app.oAuth2Server.authenticate(), app.controller.api.articles.public)
};