// api 汇总，将 API 抽取出来方便后期改造
let APIALIAS = {
  'login.in': {
    url: '/login/in',
    method: 'POST'
  },
  'login.out': {
    url: '/login/out',
    method: 'GET'
  },
  'settings.list': {
    url: '/api/v1/settings',
    method: 'GET'
  },
  'settings.create': {
    url: '/api/v1/settings',
    method: 'POST'
  },
  'settings.update': {
    url: '/api/v1/settings/:id',
    method: 'PUT'
  },
  'settings. ': {
    url: '/api/v1/settings/:id',
    method: 'DELETE'
  },
  'users.list': {
    url: '/api/v1/users',
    method: 'GET'
  },
  'users.create': {
    url: '/api/v1/users',
    method: 'POST'
  },
  'users.update': {
    url: '/api/v1/users/:id',
    method: 'PUT'
  },
  'users.distory': {
    url: '/api/v1/users/:id',
    method: 'DELETE'
  },
  'usermodels.list': {
    url: '/api/v1/usermodels',
    method: 'GET'
  },
  'usermodels.create': {
    url: '/api/v1/usermodels',
    method: 'POST'
  },
  'usermodels.update': {
    url: '/api/v1/usermodels/:id',
    method: 'PUT'
  },
  'usermodels.distory': {
    url: '/api/v1/usermodels/:id',
    method: 'DELETE'
  },
  'modelfields.list': {
    url: '/api/v1/modelfields',
    method: 'GET'
  },
  'modelfields.create': {
    url: '/api/v1/modelfields',
    method: 'POST'
  },
  'modelfields.update': {
    url: '/api/v1/modelfields/:id',
    method: 'PUT'
  },
  'modelfields.distory': {
    url: '/api/v1/modelfields/:id',
    method: 'DELETE'
  },
  'models.list': {
    url: '/api/v1/models',
    method: 'GET'
  },
  'models.create': {
    url: '/api/v1/models',
    method: 'POST'
  },
  'models.show': {
    url: '/api/v1/models/:id',
    method: 'GET'
  },
  'models.update': {
    url: '/api/v1/models/:id',
    method: 'PUT'
  },
  'models.distory': {
    url: '/api/v1/models/:id',
    method: 'DELETE'
  },
  'columns.list': {
    url: '/api/v1/columns',
    method: 'GET'
  },
  'columns.create': {
    url: '/api/v1/columns',
    method: 'POST'
  },
  'columns.update': {
    url: '/api/v1/columns/:id',
    method: 'PUT'
  },
  'columns.edit': {
    url: '/api/v1/columns/:id/edit',
    method: 'GET'
  },
  'columns.show': {
    url: '/api/v1/columns/:id',
    method: 'GET'
  },
  'columns.distory': {
    url: '/api/v1/columns/:id',
    method: 'DELETE'
  },
  'articles.list': {
    url: '/api/v1/articles',
    method: 'GET'
  },
  'articles.new': {
    url: '/api/v1/articles/new',
    method: 'GET'
  },
  'articles.show': {
    url: '/api/v1/articles/:id',
    method: 'GET'
  },
  'articles.create': {
    url: '/api/v1/articles',
    method: 'POST'
  },
  'articles.update': {
    url: '/api/v1/articles/:id',
    method: 'PUT'
  },
  'articles.public': {
    url: '/api/v1/articlepublic',
    method: 'PUT'
  },
  'articles.distory': {
    url: '/api/v1/articles/:id',
    method: 'DELETE'
  }
}
export default APIALIAS
