const Service = require('egg').Service;

class InstallService extends Service {
  async index() {
    const {
      ctx,
      app
    } = this
    // 确定是否已经安装过,如果已经安装过则直接返回,否则执行安装程序.
    let installModel = ctx.model.Install
    let installDoc = await installModel.findOne({
      installed: true
    }).exec()
    if (installDoc) {
      return {
        installed: true,
        message: '已经安装过应用程序,无须二次安装'
      }
    }

    // 初始化安装数据
    // operationPermissions 权限设置
    // userModel 默认用户模型
    // defaultUser 默认用户
    // defaultModelColumn 默认栏目模型
    // defaultModelArticleNormal 默认普通文章模型
    // defaultModelArticleList 默认资源集合模型

    const operationPermissions = [{
      name: 'article',
      cname: '文章管理',
      modular: 'article'
    }, {
      name: 'column',
      cname: '栏目管理',
      modular: 'column'
    }, {
      name: 'system',
      cname: '系统管理',
      modular: 'system'
    }, {
      name: 'discuss',
      cname: '评论管理',
      modular: 'discuss'
    }, {
      name: 'modular',
      cname: '模块管理',
      modular: 'modular'
    }, {
      name: 'user',
      cname: '用户管理',
      modular: 'user'
    }, {
      name: 'model',
      cname: '模型管理',
      modular: 'model'
    }]

    const userModels = [{
      name: 'article',
      cname: '文档管理员',
      operationPermissions: ['article', 'discuss']
    }, {
      name: 'column',
      cname: '栏目管理员',
      operationPermissions: ['column', 'modular', 'model', 'article', 'discuss']
    }, {
      name: 'admin',
      cname: '系统管理员',
      operationPermissions: ['system', 'user', 'column', 'modular', 'model', 'article', 'discuss']
    }]

    const defaultUser = [{
      name: 'admin',
      password: 'admin',
      cname: '超级管理员',
      model: {
        name: 'admin'
      }
    }]

    let operationPermissionModel = ctx.model.OperationPermission
    let userModelModel = ctx.model.UserModel
    let userModel = ctx.model.User

    // 操作权限
    async function operationPermissionSave(operationPermission) {
      let operationPermissionDoc = new operationPermissionModel(operationPermission)
      await operationPermissionDoc.save()
    }
    async function operationPermissionSaves(operationPermissions) {
      for (let i = 0; i < operationPermissions.length; i++) {
        await operationPermissionSave(operationPermissions[i])
      }
    }
    // 默认用户模型
    async function userModelSaves(userModels) {
      for (let i = 0; i < userModels.length; i++) {
        await userModelSave(userModels[i])
      }
    }
    async function userModelSave(userModel) {
      let operationPermissionIds = []
      for (let i = 0; i < userModel.operationPermissions.length; i++) {
        let doc = await operationPermissionModel.findOne({
          name: userModel.operationPermissions[i]
        }, '_id').exec()
        operationPermissionIds.push(doc._id)
      }
      userModel.operationPermissions = operationPermissionIds;
      let userModelDoc = new userModelModel(userModel)
      await userModelDoc.save()
    }

    // 默认用户
    async function userSave(users) {
      for (let i = 0; i < users.length; i++) {
        let model = await userModelModel.findOne({
          name: users[i].model.name
        }).exec()
        users[i].model = model._id
        let userDoc = new userModel(users[i])
        await userDoc.save()
      }
    }

    await operationPermissionSaves(operationPermissions)
    await userModelSaves(userModels)
    await userSave(defaultUser)

    // 栏目和文章
    // 常用字段
    const normalFields = [{
      name: 'keywords',
      cname: '关键词',
      inputType: 'text',
      description: '主要用于文章 SEO 关键词'
    }, {
      name: 'description',
      cname: '简介',
      inputType: 'textarea',
      description: '主要用于文章 SEO 描述和文章摘要'
    }, {
      name: 'thumbnail',
      cname: '缩略图',
      inputType: 'imgfile',
      description: '主要用于给文章添加缩略图'
    }, {
      name: 'content',
      cname: '内容',
      inputType: 'richtext',
      description: '正文内容'
    }]

    const extrFields = [{
      name: 'imgList',
      cname: ' 图片列表',
      inputType: 'imgfiles',
      description: '主要用于图片列表'
    }, {
      name: 'video',
      cname: '视频',
      inputType: 'videofile',
      description: '主要用于视频播放'
    }, {
      name: 'videoList',
      cname: '视频列表',
      inputType: 'videofiles',
      description: '主要用于视频播放列表'
    }]

    const defaultModelArticleNormal = {
      name: 'defaultArticleNormal',
      cname: '默认文章模型',
      type: 'article',
      classify: 'default',
      builder: '@morelearn',
      description: '默认文章模型,适合于常规图文写作'
    }
    const defaultModelColumn = {
      name: 'defaultColumn',
      cname: '默认栏目模型',
      type: 'column',
      classify: 'default',
      builder: '@morelearn',
      description: '常规栏目模型，用于常见一般栏目'
    }
    let modelFieldModel = ctx.model.ModelField
    let modelModel = ctx.model.Model

    async function modelFieldSaves(modelFields) {
      let modelFieldIds = []
      for (let i = 0; i < modelFields.length; i++) {
        let modelFieldDoc = new modelFieldModel(modelFields[i])
        await modelFieldDoc.save()
        modelFieldIds.push(modelFieldDoc._id)
      }
      return modelFieldIds
    }

    async function modelSaves(model) {
      let modelDoc = new modelModel(model)
      await modelDoc.save()
    }

    let modelFieldIds = await modelFieldSaves(normalFields)
    defaultModelArticleNormal.fields = modelFieldIds
    defaultModelColumn.fields = modelFieldIds
    await modelSaves(defaultModelArticleNormal)
    await modelSaves(defaultModelColumn)
    await modelFieldSaves(extrFields)

    let installedDoc = new installModel({
      installed: true
    })
    await installedDoc.save()

    return {
      installed: true,
      message: '已经安装成功,请尽情享用'
    }
  }
}

module.exports = InstallService;