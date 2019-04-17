const Service = require('egg').Service;
const utils = require('../utils/utils.js')

class ModelService extends Service {
  async create(model) {
    const {
      ctx,
      app
    } = this
    const modelModel = ctx.model.Model
    let oldModelDoc = await modelModel.find({
      name: model.name
    }).exec()
    if (oldModelDoc.length > 0) {
      return {
        result: false,
        message: "已经有一个相同名称的模型，请重新输入"
      }
    }
    let modelDoc = new modelModel(model)
    await modelDoc.save()
    return {
      result: true,
      modelDoc
    }
  }
  async update(model) {
    const {
      ctx,
      app
    } = this
    const modelModel = ctx.model.Model
    await modelModel.findByIdAndUpdate(model._id, model).exec()
    let modelDoc = await modelModel.findById(model._id).exec()
    return modelDoc
  }
  async delete(model) {
    const {
      ctx,
      app
    } = this
    const modelModel = ctx.model.Model
    let modelDoc = await modelModel.findById(model._id).exec()
    if (!modelDoc) {
      return {
        result: false,
        message: '不存在这个模型'
      }
    }
    const columnModel = ctx.model.Column
    let docs = await columnModel.find({
      $or: [{
        columnModel: model._id
      }, {
        articleModel: model._id
      }]
    }).exec()
    if (docs.length > 0) {
      return {
        result: false,
        message: '模型存在数据，不能删除。如果想要删除请先将该模型下的文章或栏目删除~'
      }
    }
    await modelDoc.remove()
    return {
      result: true,
      modelDoc
    }
  }
}

module.exports = ModelService;